import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PopoverPage} from "../popover/popover.page";
import {Global} from "../globalpath";
import {PhysiotherapyService} from "../physiotherapy/physiotherapy.service";
import {NavController, NavParams, PopoverController} from "@ionic/angular";
import {MyRefferalsService} from "../my-refferals/my-refferals.service";
import {Router} from "@angular/router";
import {PaginationInstance} from "ngx-pagination";

@Component({
  selector: 'app-physiotherapy',
  templateUrl: './physiotherapy.page.html',
  styleUrls: ['./physiotherapy.page.scss'],
})
export class PhysiotherapyPage implements OnInit {

  loginUser;
  patientId;
  physiotherapy: FormGroup;
  myPartnerList = [];
  partnerListByCondition: Array<any> = [];
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  };
  patientimagepath = this.global.paientImgPath;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private router: Router,
              public fb: FormBuilder,
              public global: Global,
              public myRefferalsService: MyRefferalsService,
              public popoverCtrl: PopoverController,
              public physiotherapyService: PhysiotherapyService,) {
    this.physiotherapy = fb.group({
      'enquiry': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.physiotherapyService.getPartnersByPhysiotherapy().then(data => {
      this.partnerListByCondition = data;
      console.log(" conditionally partnerListByPHysiotherapy => ", this.partnerListByCondition);
    });
    this.loginUser = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.getPage(1);
  }

  getPage(page) {
    this.physiotherapyService.patientIdByUserId(this.loginUser.userId).then(resp => {
      this.patientId = resp.patientId;

      this.myRefferalsService.getPartnerListIsPrefferedTrue().then(data => {
        this.myPartnerList = data;
        console.log('getPartnerListIsPrefferedTrue => ', data);
        this.config.currentPage = page;
        this.config.totalItems = data.totalElements;
      })
    })
  }

  onAddRecord(model: any) {
    console.log(model);
    console.log('this.patientId => ',this.patientId);
    model.patientId = {'patientId': this.patientId};
    this.physiotherapyService.createEnqiury(model).then(resp => {
      console.log('response =>', resp);
      if (resp.success === '1') {
        this.global.showToast('Record Added Successfully', 3000, 'top');
        this.physiotherapy.reset();
        this.ngOnInit();
      }
      else {
        this.global.showToasterror('Unable to save Record', 3000, 'top');
      }
    });
  }


  async popoverMenu(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: event,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PhysiotherapyPage');
  }


  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }

  goBack() {
    console.log("Going back");
    this.router.navigateByUrl('/explore-services');

  }

}
