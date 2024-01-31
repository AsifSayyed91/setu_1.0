import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {InquiriesService} from "../inquiries/inquiries.service";
import {Global} from "../globalpath";
import {NavController, NavParams, PopoverController} from "@ionic/angular";
import {Router} from "@angular/router";
import {PaginationInstance} from "ngx-pagination";
import {DiagnosticsService} from "../diagnostics/diagnostics.service";
import {LabService} from "../labs/lab-service";
import {MyRefferalsService} from "../my-refferals/my-refferals.service";
import {MyLabreportsService} from "../my-labreports/my-labreports.service";
import {PopoverPage} from "../popover/popover.page";
import {MyRefferalsPage} from "../my-refferals/my-refferals.page";

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.page.html',
  styleUrls: ['./inquiries.page.scss'],
})
export class InquiriesPage implements OnInit {
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
              public global: Global,
              public navParams: NavParams,
              public  diagnosticsService:DiagnosticsService,
              public myRefferalsService:MyRefferalsService,
              public labService: LabService,
              // public popoverCtrl: PopoverController,
              private popoverController: PopoverController,
              public myLabReportsService : MyLabreportsService) {
    this.myForm = fb.group({
      'enquiry': [null, Validators.required],
    });
  }

  // popoverMenu(event: Event) {
  //   const popover = this.popoverCtrl.create(PopoverPage);
  //   popover.present({ev: event});
  // }

  async popoverMenu(event: Event) {
    const popover = await this.popoverController.create({
      component: PopoverPage, // Your PopoverPage component
      event: event,
      translucent: true // Set to true if you want a translucent background
    });

    await popover.present();
  }

  ngOnInit() {
    this.myRefferalsService.getPartnersByLab().then(data => {
      this.partnerListByCondition = data;
      console.log(" conditionally partnerListByLab => ", this.partnerListByCondition);
    })

    this.loginUser = JSON.parse(localStorage.getItem('userDetails'));
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
      this.ngOnInit()
      event.complete();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiagnosticsPage');
  }


  gotoRefferals() {
    this.navCtrl.navigateRoot('/MyRefferalsPage');
  }

  getPage(page) {
    this.myRefferalsService.getPartnerListIsPrefferedTrue().then(data => {
      this.myPartnerList = data;
      console.log('getPartnerListIsPrefferedTrue => ', data);
      this.config.currentPage = page;
      this.config.totalItems = data.totalElements;
    })

    this.myLabReportsService.patientIdByUserId(this.loginUser.userId).then(resp => {
      this.patientId = resp.patientId;
      console.log(' patient Id => ',  this.patientId)
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
    this.navCtrl.navigateForward('/ExploreServicesPage');
  }


}
