import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MyPrescriptionService} from "../my-prescription/my-prescription.service";
import {MyPrescriptionviewPage} from "../my-prescriptionview/my-prescriptionview.page";
import {MyLabreportsService} from "../my-labreports/my-labreports.service";
import {Global} from "../globalpath";
import {ModalController, NavController, NavParams} from "@ionic/angular";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";
import {PaginationInstance} from "ngx-pagination";

@Component({
  selector: 'app-my-prescription',
  templateUrl: './my-prescription.page.html',
  styleUrls: ['./my-prescription.page.scss'],
})
export class MyPrescriptionPage implements OnInit {
  appId;
  image_path;
  docOriginalName;
  currentFile;
  uploadedURL: any = {};
  Category: Array<any> = [];
  userDetails;
  imageFileName;
  myLabReportsId;
  loginUser;
  myLabReportsList = [];
  DocumentList = [];
  patientId;
  pagination: boolean = false;
  Prescriptionlist = [];
  patientimagepath = this.global.paientImgPath;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  };

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
    Categary: new FormControl('', null),
  });
  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public navParams: NavParams,
              public myPrescriptionService: MyPrescriptionService,
              public myLabReportsService:MyLabreportsService,
              public global: Global,
              public viewCtrl: ModalController,
              public appointmentService: AppointmentlistService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPrescriptionPage');
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }

  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.getPage(1);
    this.myLabReportsService.getDocumentList().then(resp => {
      console.log("doc", resp);

      this.DocumentList = resp;
      console.log("doc", resp);
    });
  }

  onFileChange(event) {
    this.currentFile = event.target.files[0];
    this.docOriginalName = this.currentFile.name;
  }

  /*submit(model: any) {
    this.appointmentService.addRecordForPrescription(model).then(data =>{
         this.ngOnInit();
         if (data.success == '1') {
           this.global.showToast(data.msg, 1000, 'top');
           this.myForm.reset();
           this.viewCtrl.dismiss();
          // this.myForm.get('Categary')?.setValue('0');
         } else {
           this.myForm.reset();
           //this.myForm.get('Categary')?.setValue('0');
           this.global.showToast(data.msg, 1000, 'top');
         }
       })
  }*/

  submit(form: any) {
    /*    console.log("form ", this.myForm.controls.enquiry.value);*/
    if (form.file != 0) {
      const formData: FormData = new FormData();
      const model: any = {};
      formData.append('file', this.currentFile, this.currentFile.name);
      this.appointmentService.addFileUplaodService(formData).then(resp => {
        this.uploadedURL = resp;
        // model.duPath = this.uploadedURL;
        model.patientId = {'patientId': parseInt(this.patientId)};
        model.duName = form.name;
        model.duFileName = this.uploadedURL;
        // model.enquiry = this.myForm.controls.enquiry.value;
        this.appointmentService.addRecordForPrescription(model).then(data =>{
          this.ngOnInit();
          if (data.success == '1') {
            this.global.showToast(data.msg, 1000, 'top');
            this.myForm.reset();
            this.viewCtrl.dismiss();
            // this.myForm.get('Categary')?.setValue('0');
          } else {
            this.myForm.reset();
            //this.myForm.get('Categary')?.setValue('0');
            this.global.showToast(data.msg, 1000, 'top');
          }
        })
      });
    } else {
      this.global.showToastwaring('Please Enter Details', 1000, 'top');
    }
  }


  /* prescription_view(id) {
     let medication_view = this.modalCtrl.create(MyPrescriptionviewPage, {vpId: id});
     medication_view.present();
   }*/

  prescription_view(id) {
    console.log(id);
    this.navCtrl.navigateForward('/my-prescriptionview', {state: id});
  }

  getPage(page) {
    this.config.currentPage = page;
    this.myPrescriptionService.patientIdByUserId(this.loginUser.userId).then(resp => {
      this.patientId = resp.patientId;
      this.myPrescriptionService.getPrescriptionlist(this.patientId, page, this.config.itemsPerPage, '', '').then(data => {
        if (data.content.length >= 1) {
          this.pagination = true;
          this.Prescriptionlist = data.content;
          console.log('prescription list 1=> ',this.Prescriptionlist);
          this.config.currentPage = page;
          this.config.totalItems = data.totalElements;
        } else {
          this.pagination = true;
        }
      })
    })
  }
}
