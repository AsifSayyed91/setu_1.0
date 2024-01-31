import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Global} from "../globalpath";
import {MyRefferalsService} from "../my-refferals/my-refferals.service";
import {ModalController, NavController, NavParams} from "@ionic/angular";
import {DiagnosticsService} from "../diagnostics/diagnostics.service";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";
import {PaginationInstance} from "ngx-pagination";
import {Router} from "@angular/router";
import {ModalpopupPage} from "../modalpopup/modalpopup.page";

@Component({
  selector: 'app-my-refferalsview',
  templateUrl: './my-refferalsview.page.html',
  styleUrls: ['./my-refferalsview.page.scss'],
})
export class MyRefferalsviewPage implements OnInit {
  myRefferalsId;
  data;
  isPreffered;
  partnerId;
  refferaltype;
  partnerServiceId;
  patientId;
  uploadedURL;
  currentFile;
  refferalsList = [];
  refferalsReceipt: Array<any> = [];
  refferalsReceipts: Array<any> = [];
  myRefferalListByLab: Array<any> = [];
  myRefferalListRadiology: Array<any> = [];
  myRefferalList: Array<any> = [];
  partnerListByCondition: Array<any> = [];
  refferalsReceiptForPartner: Array<any> = [];
  refferalsReceiptsForPartner: Array<any> = [];
  pagination: boolean = false;
  patientimagepath = this.global.paientImgPath;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  };
  vpId;
  loginUser;
  myPartnerList = [];
  labReportList = [];
  radiologyList = [];
  partnerListByRadiology = [];
  refferalListByPartner = [];
  diagnostics: FormGroup;

  constructor(public navCtrl: NavController,
              public global: Global,
              public fb: FormBuilder,
              public  myRefferalsService: MyRefferalsService,
              public  viewCtrl: ModalController,
              public navParams: NavParams,
              private router: Router,
              public modalController: ModalController,
              public  diagnosticsService: DiagnosticsService,
              public appointmentService: AppointmentlistService) {
    this.data = this.router.getCurrentNavigation()?.extras?.state;
    this.myRefferalsId = this.data.myRefferalsId;
    this.refferaltype = this.data.refferaltype;
    console.log("this.myRefferalsId", this.myRefferalsId);
    console.log(" sdfs refferaltype", this.refferaltype);

    this.patientId = this.navParams.get('patientId');
    console.log("this.patientId", this.patientId);

    this.vpId = this.navParams.get('vpId');

    this.diagnostics = fb.group({
      'enquiry': [null, Validators.required],
      'file': [null, Validators.required],
      'Categary': [null, Validators.required],
      'yes': [null, Validators.required],
      'no': [null, Validators.required],
      'preffered': [null, Validators.required],
      'partnerId': [null, Validators.required],


      // 'partnerId': fb.group({
      //   'partnerId': [null, Validators.required]
      // })
      /*   'partnerId': fb.group({
           'partnerId': [null, Validators.required]
         }),*/
    });
  }


  ngOnInit() {

    this.myRefferalsService.getRefferalsListById(this.myRefferalsId).then(data => {
      this.refferalsReceipt = data.content;
      this.refferalsReceipts = data[0];
      console.log('myRefferalsId => ', this.myRefferalsId);
      console.log('refferaltype => ', this.refferaltype);

      if (this.refferaltype == '435') {
        this.myRefferalsService.getRefferalsListByLab().then(data => {
          this.myRefferalList = data;
          console.log("myRefferalListByLab => ", this.myRefferalList);
        });

        this.myRefferalsService.getPartnersByLab().then(data => {
          this.partnerListByCondition = data;
          console.log(" conditionally partnerListByLab => ", this.partnerListByCondition);
          this.partnerId = this.partnerListByCondition[0].partnerId;
          console.log('partnerId => ', this.partnerId);
        })
      }
      else if (this.refferaltype == '2') {
        this.myRefferalsService.getRefferalsListRadio().then(data => {
          this.pagination = true;
          this.myRefferalList = data;
          console.log("myRefferalListRadiology => ", this.myRefferalList);
        });

        this.myRefferalsService.getPartnersByRadiology().then(data => {
          this.partnerListByCondition = data;
          this.partnerId = this.partnerListByCondition[0].partnerId;
          console.log("conditionally partnerListByRadiology => ", this.partnerListByCondition);
          console.log('partnerId => ', this.partnerId);
        })
      }
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

  getPage(page) {
    this.config.currentPage = page;
    this.myRefferalsService.patientIdByUserId(this.loginUser.userId)
      .then(resp => {
        this.patientId = resp.patientId;
      });

    /*   this.myRefferalsService.getRefferalsListByPartner(this.partnerId)
         .then(data => {
           this.refferalListByPartner = data;
           console.log('sakdfkaj');
           console.log('partnerId => ', this.partnerId);
           console.log('refferalListByPartner => ', this.refferalListByPartner);
         });*/

    this.myRefferalsService.getPartnerListIsPrefferedTrue().then(data => {
      this.myPartnerList = data;
      console.log('IsPreffered Partner List => ', data);
      this.config.currentPage = page;
      this.config.totalItems = data.totalElements;
    });

    this.myRefferalsService.getLabReports().then(data => {
      this.labReportList = data;
      console.log('labReportList=> ', data);
      this.config.currentPage = page;
      this.config.totalItems = data.totalElements;
    });

    this.myRefferalsService.getRadiology().then(data => {
      this.radiologyList = data;
      console.log('radiologyList=> ', data);
      this.config.currentPage = page;
      this.config.totalItems = data.totalElements;
    })

    /* this.myRefferalsService.getPartnersByRadiology().then(data => {
       this.partnerListByRadiology  = data;
       console.log(' partnerListByRadiology  => ', data);
       this.config.currentPage = page;
       this.config.totalItems = data.totalElements;
     })*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyRefferalsviewPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


  sendToLab(patientId, myRefferalsId, partnerId) {
    let user = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    console.log(JSON.stringify(user));
    console.log('patient Id => ', this.patientId);
    console.log('myRefferals Id  => ', this.myRefferalsId);
    console.log('partner => ', this.partnerId);
    console.log('partner => ' + partnerId);

    if (this.refferaltype == 435) {
      this.myRefferalsService.sendLab(this.patientId, this.myRefferalsId, this.partnerId)
        .then(data => {
          if (data.Status === "1") {
            this.global.showToast('Send To Lab successfully', 2000, 'top');
          } else {
            this.global.showToastwaring('Send To Lab Fail', 2000, 'top');
          }
        })
    }
    else {

      this.myRefferalsService.sendRadiology(this.patientId, this.myRefferalsId, this.partnerId)
        .then(data => {
          if (data.Status === "1") {
            this.global.showToast('Send To Radiology successfully', 2000, 'top');
          } else {
            this.global.showToastwaring('Send To Radiology Fail', 2000, 'top');
          }
        })
    }

  }

  submit(form: any) {

    console.log("Form : ", form);
    if (form.file != 0) {
      const formData: FormData = new FormData();
      const model: any = {};
      formData.append('file', form.duFileName);

      model.patientId = {'patientId': parseInt(this.patientId)};
      model.myRefferalsId = {'myRefferalsId': parseInt(this.myRefferalsId)};
      model.partnerId = {'partnerId': parseInt(this.partnerId)};
      model.duName = form.name;
      model.duFileName = 'no-file.png';
      model.duPath = 'no-file.png';

      console.log("Refferals Id 1 : " + this.myRefferalsId);
      console.log("Refferals Id 2 : " + model.myRefferalsId.myRefferalsId);

      if (this.refferaltype == 435) {
        this.myRefferalsService.setToAdminPortal(this.myRefferalsId).then(data => {
          console.log(data);
          // model.patientId = {'patientId': parseInt(this.patientId)};
          this.ngOnInit();
          if (data.success == '1') {
            this.global.showToast(data.msg, 1000, 'top');
            this.viewCtrl.dismiss();
          } else {
            this.diagnostics.reset();
            this.global.showToast(data.msg, 1000, 'top');
          }
        });
      } else if (this.refferaltype == 2) {
        this.myRefferalsService.setToAdminPortal(this.myRefferalsId).then(data => {
          console.log(data);
          model.patientId = {'patientId': parseInt(this.patientId)};
          this.ngOnInit();
          if (data.success == '1') {
            this.global.showToast(data.msg, 1000, 'top');
            this.viewCtrl.dismiss();
          } else {
            this.diagnostics.reset();
            this.global.showToast(data.msg, 1000, 'top');
          }
        });
      }


      // if (this.refferaltype == 435) {
      //   this.appointmentService.addRecordForLabReports(model).then(data => {
      //     console.log(data);
      //     model.patientId = {'patientId': parseInt(this.patientId)};
      //     this.ngOnInit();
      //     if (data.success == '1') {
      //       this.global.showToast(data.msg, 1000, 'top');
      //       this.viewCtrl.dismiss();
      //     } else {
      //       this.diagnostics.reset();
      //       this.global.showToast(data.msg, 1000, 'top');
      //     }
      //   });
      // } else if (this.refferaltype == 2) {
      //   this.appointmentService.addRecordForRadiology(model).then(data => {
      //     console.log(data);
      //     model.patientId = {'patientId': parseInt(this.patientId)};
      //     this.ngOnInit();
      //     if (data.success == '1') {
      //       this.global.showToast(data.msg, 1000, 'top');
      //       this.viewCtrl.dismiss();
      //     } else {
      //       this.diagnostics.reset();
      //       this.global.showToast(data.msg, 1000, 'top');
      //     }
      //   });
      // }

    } else {
      this.global.showToastwaring('Please Enter Details', 1000, 'top');
    }
  }

 async OpenModal(id) {
    let modal = await this.modalController.create({
      component: ModalpopupPage
    });
    modal.present();
  }
}
