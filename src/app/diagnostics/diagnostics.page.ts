import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DiagnosticsService} from "../diagnostics/diagnostics.service";
import {PopoverPage} from "../popover/popover.page";
import {Global} from "../globalpath";
import {MyRefferalsService} from "../my-refferals/my-refferals.service";
import {MyLabreportsService} from "../my-labreports/my-labreports.service";
import {MyRadiologyService} from "../my-radiology/my-radiology.service";
import {NavController, NavParams, PopoverController} from "@ionic/angular";
import {PaginationInstance} from "ngx-pagination";
import {Router} from "@angular/router";

@Component({
  selector: 'app-diagnostics',
  templateUrl: './diagnostics.page.html',
  styleUrls: ['./diagnostics.page.scss'],
})
export class DiagnosticsPage implements OnInit {
  diagnostics!: FormGroup;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  };
  loginUser;
  patientId;
  pagination: boolean = false;
  myPartnerList=[];
  partnerListByCondition: Array<any> = [];
  patientimagepath = this.global.paientImgPath;
  myRadiologyList = [];
  myForm: FormGroup;
  constructor(public navCtrl: NavController,
              public fb: FormBuilder,
              public global: Global,
              public popoverCtrl: PopoverController,
              public navParams: NavParams,
              private router: Router,
              public  diagnosticsService:DiagnosticsService,
              public myRefferalsService:MyRefferalsService,
              public myLabReportsService: MyLabreportsService,
              public myRadiologyService: MyRadiologyService) {
    this.myForm = fb.group({
      'enquiry': [null, Validators.required],
    });
  }



  ngOnInit() {
    this.myRefferalsService.getPartnersByRadiology().then(data => {
      this.partnerListByCondition = data;
      console.log(" conditionally partnerListByRadiology => ", this.partnerListByCondition);
    });

    this.loginUser = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.getPage(1);
  }


  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiagnosticsPage');
  }

  gotoRefferals() {
    this.router.navigateByUrl('/my-refferals');
  }

  async popoverMenu(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: event,
    });
    return await popover.present();
  }

  onAddRecord(model: any) {
    console.log('insideModel',model);
    model.duPath = 'no-file.png';
    model.patientId = {'patientId': parseInt(this.patientId)};
    this.diagnosticsService.createEnqiury(model).then(resp => {
      console.log('response =>', resp);
      if (resp.success === '1') {
        this.global.showToast('Record Added Successfully', 3000, 'top');
        this.myForm.reset();
        this.ngOnInit();
      }
      else {
        this.global.showToasterror('Unable to save Record', 3000, 'top');
      }
    });
  }

  getPage(page) {
    this.config.currentPage = page;
    this.myLabReportsService.patientIdByUserId(this.loginUser.userId).then(resp => {
      this.patientId = resp.patientId;
      console.log(' patient Id => ',  this.patientId);
      this.myRadiologyService.getRadiologyListByPatient(this.patientId).then(data => {
        if (data) {
          this.pagination = true;
          this.myRadiologyList = data;
          console.log("Radiology list => " , data);
          this.config.currentPage = page;
          this.config.totalItems = data.totalElements;
        } else {
          this.pagination = true;
        }
      })
    });

    this.myRefferalsService.getPartnerListIsPrefferedTrue().then(data => {
      this.myPartnerList = data;
      console.log('getPartnerListIsPrefferedTrue => ' ,data );
      this.config.currentPage = page;
      this.config.totalItems = data.totalElements;
    })


  }


  goBack() {
    console.log("Going back");
    this.router.navigateByUrl('/explore-services');
  }


}

