import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyLabreportsService} from "../my-labreports/my-labreports.service";
import {Global} from "../globalpath";
import {ModalController, NavController, NavParams} from "@ionic/angular";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";
import {PaginationInstance} from "ngx-pagination";
import {FileuploadformylabreportsPage} from "../fileuploadformylabreports/fileuploadformylabreports.page";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-labreports',
  templateUrl: './my-labreports.page.html',
  styleUrls: ['./my-labreports.page.scss'],
})
export class MyLabreportsPage implements OnInit {
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
  patientId: any;
  pagination: boolean = false;
  loading: boolean = false;
  patientimagepath = this.global.paientImgPath;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  };
  // myForm = new FormGroup({
  //   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   file: new FormControl('', [Validators.required]),
  //   fileSource: new FormControl('', [Validators.required]),
  //   Categary: new FormControl('', null),
  // });

  myForm: FormGroup;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public navParams: NavParams,
              public myLabReportsService: MyLabreportsService,
              public global: Global,
              public viewCtrl: ModalController,
              public fb: FormBuilder,
              private router: Router,
              public appointmentService: AppointmentlistService) {
    this.appId = this.navParams.get('appId');

    this.myForm = fb.group({
      'name': [null, Validators.required],
      'file': [null, Validators.required],
      'fileSource': [null, Validators.required]
    });
  }


  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.getPage(1);
    console.log('patientId  => ', this.patientId)
  }

  onFileChange(event) {
    this.currentFile = event.target.files[0];
    this.docOriginalName = this.currentFile.name;
  }


  getPage(page) {
    this.config.currentPage = page;
    this.myLabReportsService.patientIdByUserId(this.loginUser.userId).then(resp => {
      this.patientId = resp.patientId;
      console.log(' patient Id => ', this.patientId);
      this.myLabReportsService.getMyLabReportsList(this.patientId).then(data => {
        if (data) {
          this.pagination = true;
          this.myLabReportsList = data;
          console.log("Lab Reports list by Patient Id => ", data);
          this.config.currentPage = page;
          this.config.totalItems = data.totalElements;
        } else {
          this.pagination = true;
        }
      })
    })
  }

  submit(form: any) {
    /*    console.log("form ", this.myForm.controls.enquiry.value);*/
    if (form.file != 0) {
      const formData: FormData = new FormData();
      const model: any = {};
      formData.append('file', this.currentFile, this.currentFile.name);
      this.appointmentService.addFileUplaodService(formData).then(resp => {
        this.uploadedURL = resp;
        model.duPath = this.uploadedURL;
        model.patientId = {'patientId': parseInt(this.patientId)};
        model.duName = form.name;
        model.duFileName = this.uploadedURL;
        // model.enquiry = this.myForm.controls.enquiry.value;
        this.appointmentService.addRecordForLabReports(model).then(data => {
          console.log(data);
          model.patientId = {'patientId': parseInt(this.patientId)};
          this.ngOnInit();
          if (data.success == '1') {
            this.global.showToast(data.msg, 1000, 'top');
            this.viewCtrl.dismiss();
          } else {
            this.myForm.reset();
            this.global.showToast(data.msg, 1000, 'top');
          }
        });
      });
    } else {
      this.global.showToastwaring('Please Enter Details', 1000, 'top');
    }
  }


  /*submit(form: any) {
    console.log('this.patientId 3 => ',this.patientId);
    if (form.file != 0) {
      const formData: FormData = new FormData();
      const model: any = {};
      formData.append('file', this.currentFile, this.currentFile.name);
      this.appointmentService.addFileUplaodService(formData).then(resp => {
        this.uploadedURL = resp;
        model.duPath = this.uploadedURL;
        model.patientId = {'patientId': this.patientId};
        model.duName = form.name;
        model.duFileName = this.uploadedURL;
this.appointmentService.addRecordForLabReports(model).then(data =>{
  this.ngOnInit();
  if (data.success == '1') {
    this.global.showToast(data.msg, 1000, 'top');
    this.myForm.reset();
    this.viewCtrl.dismiss();
  } else {
    this.myForm.reset();
    this.global.showToast(data.msg, 1000, 'top');
  }
})
      });
    } else {
      this.global.showToastwaring('Please Enter Details', 1000, 'top');
    }
  }*/

 async ViewImage(imgp, name) {
    let medication_view = await  this.modalCtrl.create({
      component : FileuploadformylabreportsPage,
      componentProps: {
        imagepath: imgp,
        name: name
      }
 } );
    medication_view.present();
  }


  /* labReports_view(id) {
     let medication_view = this.modalCtrl.create(MyLabreportsviewPage, {myLabReportsId: id});
     medication_view.present();
   }*/

  /* labReports_view(id ) {
     console.log('going to myLabReportsView Page with id =>',id);
     this.navCtrl.push(MyLabreportsviewPage,  {myLabReportsId: id});
   }*/


  labReports_view(id) {
    console.log('going to myLabReportsView Page with id =>', id);
    this.navCtrl.navigateForward('/my-labreportsview', {state: id});
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }

  goBack() {
    console.log("Going back To Dashboard!!!");
    this.router.navigateByUrl('/dashboard');

  }

}
