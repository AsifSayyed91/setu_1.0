import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PopoverPage} from "../popover/popover.page";
import {Global} from "../globalpath";
import {MyRefferalsService} from "../my-refferals/my-refferals.service";
import {MyLabreportsService} from "../my-labreports/my-labreports.service";
import {LabService} from "../labs/lab-service";
import {NavController, NavParams, PopoverController} from "@ionic/angular";
import {DiagnosticsService} from "../diagnostics/diagnostics.service";
import {PaginationInstance} from "ngx-pagination";
import {Router} from "@angular/router";

@Component({
  selector: 'app-labs',
  templateUrl: './labs.page.html',
  styleUrls: ['./labs.page.scss'],
})
export class LabsPage implements OnInit {

  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  };
  refferaltype;
  loginUser;
  patientId;
  pagination: boolean = false;
  myPartnerList=[];
  myRefferalList=[];
  myLabList=[];
  myRefferalListByLab: Array<any> = [];
  partnerListByCondition: Array<any> = [];
  myRefferalListRadiology: Array<any> = [];
  patientimagepath = this.global.paientImgPath;

  myForm: FormGroup;
  constructor(public navCtrl: NavController,
              public fb: FormBuilder,
              private router: Router,
              public global: Global,
              public navParams: NavParams,
              public  diagnosticsService:DiagnosticsService,
              public myRefferalsService:MyRefferalsService,
              public labService: LabService,
              public popoverCtrl: PopoverController,
              public myLabReportsService : MyLabreportsService) {
    this.myForm = fb.group({
      'enquiry': [null, Validators.required],
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



  ngOnInit() {
    this.myRefferalsService.getPartnersByLab().then(data => {
      this.partnerListByCondition = data;
      console.log(" conditionally partnerListByLab => ", this.partnerListByCondition);
    });

    this.loginUser = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.getPage(1);
  }

  onAddRecord(model: any) {
    console.log(model);
    model.patientId = {'patientId': parseInt(this.patientId)};
    this.labService.createEnqiury(model).then(resp => {
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

  getPage(page) {
    this.myRefferalsService.getPartnerListIsPrefferedTrue().then(data => {
      this.myPartnerList = data;
      console.log('getPartnerListIsPrefferedTrue => ', data);
      this.config.currentPage = page;
      this.config.totalItems = data.totalElements;
    });

    this.myLabReportsService.patientIdByUserId(this.loginUser.userId).then(resp => {
      this.patientId = resp.patientId;
      console.log(' patient Id => ',  this.patientId);
      this.myLabReportsService.getLabByPatient(this.patientId).then(data => {
        if (data) {
          this.pagination = true;
          this.myLabList = data;
          console.log("Radiology list => " , data);
          this.config.currentPage = page;
          this.config.totalItems = data.totalElements;
        } else {
          this.pagination = true;
        }
      })
    })
  }


  goBack() {
    console.log("Going back");
    this.router.navigateByUrl('/explore-services');
  }

  /*  private handleError(error: Response | any) {
      return Promise.reject(error.message || error);
    }*/

}
