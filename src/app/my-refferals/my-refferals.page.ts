import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MyRefferalsService} from "../my-refferals/my-refferals.service";
import {MyLabreportsService} from "../my-labreports/my-labreports.service";
import {Global} from "../globalpath";
import {ModalController, NavController, NavParams} from "@ionic/angular";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";
import {PaginationInstance} from "ngx-pagination";
import {FileuploadforefferalPage} from "../fileuploadforefferal/fileuploadforefferal.page";
import {ModalpopupPage} from "../modalpopup/modalpopup.page";

@Component({
  selector: 'app-my-refferals',
  templateUrl: './my-refferals.page.html',
  styleUrls: ['./my-refferals.page.scss'],
})
export class MyRefferalsPage implements OnInit {
  appId;
  image_path;
  docOriginalName;
  currentFile;
  uploadedURL: any = {};
  Category: Array<any> = [];
  DocumentList = [];
  userDetails;
  imageFileName;
  loginUser;
  myRefferalList = [];
  myRefferalListByLab = [];
  myRefferalListRadiology = [];
  refferal_type: any;
  patientId;
  pagination: boolean = false;
  temrDocumentUploadList = [];
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
    refferalType: new FormControl(435, null),
  });

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public navParams: NavParams,
              public myRefferalsService: MyRefferalsService,
              public myLabReportsService: MyLabreportsService,
              public global: Global,
              public viewCtrl: ModalController,
              public appointmentService: AppointmentlistService) {
    this.appId = this.navParams.get('appId');
  }

  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.getPage(1);
    this.myRefferalsService.getRefferalsList().then(resp => {
      console.log("reffList", resp);
    });
    this.myLabReportsService.getDocumentList().then(resp => {
      console.log("doc", resp);
    });
  }

  onFileChange(event) {
    this.currentFile = event.target.files[0];
    this.docOriginalName = this.currentFile.name;
  }

  /* onRefferalTypeSelect(val) {
     if (val == 'walkin') {

     } else if (val == 'future') {

     }

   }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyRefferalsPage');
  }

  /* refferals_view(id , refferaltype) {
     console.log(id , refferaltype);
     let refferals_view = this.modalCtrl.create(MyRefferalsviewPage, {myRefferalsId: id , refferaltype:refferaltype});
     refferals_view.present();
   }*/

  refferals_view(id , refferaltype) {
    console.log(id , refferaltype);
    this.navCtrl.navigateForward('/my-refferalsview', {state: {myRefferalsId: id , refferaltype:refferaltype}});
  }

  async ViewImage(imgp, name) {
    let medication_view = await  this.modalCtrl.create({
      component: FileuploadforefferalPage,
      componentProps:{imagepath: imgp, name: name}
    });
    medication_view.present();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }

  onRefferalTypeSelect(){
    console.log("refferalType called");
  }

  submit(form: any) {
    if (form.file != 0) {
      const formData: FormData = new FormData();
      const model: any = {};
      formData.append('file', this.currentFile, this.currentFile.name);
      this.appointmentService.addFileUplaodService(formData).then(resp => {

        this.uploadedURL = resp;
        // model.duDcId = {'dcId': form.Categary};
        // model.duPath = this.uploadedURL;
        model.patientId = {'patientId': this.patientId};
        model.duName = form.name;
        model.refferalType = (form.refferalType != null)?form.refferalType:435 ;
        model.duFileName = this.uploadedURL;

        this.appointmentService.addRecordForRefferals(model).then(data => {
          this.ngOnInit();
          console.log(" refferalType => ", form.refferalType);
          if (data.success == '1') {
            if (form.refferalType == 435){
              this.myRefferalsService.getRefferalsListByLab().then(data => {
                this.pagination = true;
                this.myRefferalListByLab = data;
                console.log("myRefferalListByLab => ", this.myRefferalListByLab);
                this.refferal_type = data.refferal_type;
              });
            } else if (form.refferalType == 2){
              this.myRefferalsService.getRefferalsListRadio().then(data => {
                this.pagination = true;
                this.myRefferalListRadiology = data;
                console.log("myRefferalListRadiology => ", this.myRefferalListRadiology);
                this.refferal_type = data.refferal_type;
              });
            }
            this.global.showToast(data.msg, 1000, 'top');
            this.myForm.reset();
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

  getPage(page) {
    this.config.currentPage = page;
    this.myRefferalsService.patientIdByUserId(this.loginUser.userId).then(resp => {
      this.patientId = resp.patientId;
      console.log('patient id => ', this.patientId);
      this.myRefferalsService.getRefferalsListPatient(this.patientId).then(data => {
        if (data) {
          this.pagination = true;
          this.myRefferalList = data;
          console.log("myRefferals List By Patient => " , data);
          this.config.currentPage = page;
          this.config.totalItems = data.totalElements;
        } else {
          this.pagination = true;
        }
      })

      /*
            this.myRefferalsService.getRefferalsListByLab().then(data => {
              this.pagination = true;
              this.myRefferalListByLab = data;
              console.log("myRefferalListByLab => ", this.myRefferalListByLab);
              this.refferal_type = data.refferal_type;
            })
            this.myRefferalsService.getRefferalsListRadio().then(data => {
              this.pagination = true;
              this.myRefferalListRadiology = data;
              console.log("myRefferalListRadiology => ", this.myRefferalListRadiology);
              this.refferal_type = data.refferal_type;
            })*/

    })
  }
}
