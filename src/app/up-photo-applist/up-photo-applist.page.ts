import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Global} from "../globalpath";
import {ModalController, NavController, NavParams} from "@ionic/angular";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-up-photo-applist',
  templateUrl: './up-photo-applist.page.html',
  styleUrls: ['./up-photo-applist.page.scss'],
})
export class UpPhotoApplistPage implements OnInit {
  appId;
  image_path;
  docOriginalName;
  currentFile;
  uploadedURL: any;
  Category: Array<any> = [];
  userDetails;
  patientId;
  imageFileName;
  dcId;
  myForm: FormGroup;



  constructor(public navCtrl:NavController,
              public viewCtrl: ModalController,
              public navParams: NavParams,
              public global: Global,
              public appointmentService: AppointmentlistService,
              public fb: FormBuilder,) {
    this.appId = this.navParams.get('appId');

    this.myForm = fb.group({
      'name': [null, Validators.required],
      'file': [null, Validators.required],
      'dcId': fb.group({
        'dcId': [null, Validators.required]
      })
    });
  }


  ngOnInit() {
    // this.myForm.get('dcId').setValue('0');
    this.userDetails = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.appointmentService.patientIdByUserId(this.userDetails.userId).then(resp => {
      this.patientId = resp.patientId;
    });
    this.appointmentService.getDropDown(1, 100, '').then(resp => {
      this.Category = resp;
      console.log('category response =>', resp);
    });
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  randomStr(len, arr) {
    var ans = '';
    for (var i = len; i > 0; i--) {
      ans += arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
  }

  onSelectCategory(id) {
    console.log('categaryid', id);
  }

  onFileChange(event) {
    console.log('onFileChange called..', event);
    this.currentFile = event.target.files[0];
    this.docOriginalName = this.currentFile.name;
  }



  submit(form: any) {
    if (form.file != 0) {
      const formData: FormData = new FormData();
      const model: any = {};
      formData.append('file', this.currentFile, this.currentFile.name);
      this.appointmentService.addFileUplaodService(formData).then(resp => {
        console.log(resp);
        this.uploadedURL = resp;
        // this.uploadedURL = this.global.paientImgPath + resp;
        model.duPath = this.uploadedURL;
        model.patientId = {'patientId': parseInt(this.patientId)};
        model.dcId = form.dcId;
        model.refferalType = form.dcId.dcId;
        model.duName = form.name;
        model.duFileName = this.uploadedURL;
        console.log("dcId", form.dcId);

        if (form.dcId.dcId == 3) {
          this.appointmentService.addRecordForLabReports(model).then(data => {
            console.log("Lab Reports => ", data);
            model.patientId = {'patientId': parseInt(this.patientId)};
            this.ngOnInit();
            if (data.success == '1') {
              this.global.showToast(data.msg, 1000, 'top');
              this.viewCtrl.dismiss();
            } else {
              this.myForm.reset();
              this.global.showToast(data.msg, 1000, 'top');
            }
          })
        } else if (form.dcId.dcId == 4) {
          this.appointmentService.addRecordForRadiology(model).then(data => {
            console.log("Radiology Reports => ", data);
            model.patientId = {'patientId': parseInt(this.patientId)};
            this.ngOnInit();
            if (data.success == '1') {
              this.global.showToast(data.msg, 1000, 'top');
              this.viewCtrl.dismiss();
            } else {
              this.myForm.reset();
              this.global.showToast(data.msg, 1000, 'top');
            }
          })
        } else if (form.dcId.dcId == 5) {
          this.appointmentService.addRecordForPrescription(model).then(data => {
            console.log("prescription Reports => ", data);
            model.patientId = {'patientId': parseInt(this.patientId)};
            this.ngOnInit();
            if (data.success == '1') {
              this.global.showToast(data.msg, 1000, 'top');
              this.viewCtrl.dismiss();
            } else {
              this.myForm.reset();
              this.global.showToast(data.msg, 1000, 'top');
            }
          })
        } else if (form.dcId.dcId == 2) {
          this.appointmentService.addRecordForRefferals(model).then(data => {
            console.log("refferals Reports => ", data);
            model.patientId = {'patientId': parseInt(this.patientId)};
            this.ngOnInit();
            if (data.success == '1') {
              this.global.showToast(data.msg, 1000, 'top');
              this.viewCtrl.dismiss();
            } else {
              this.myForm.reset();
              this.global.showToast(data.msg, 1000, 'top');
            }
          })
        } else if (form.dcId.dcId == 435) {
          this.appointmentService.addRecordForRefferals(model).then(data => {
            model.patientId = {'patientId': parseInt(this.patientId)};
            this.ngOnInit();
            if (data.success == '1') {
              this.global.showToast(data.msg, 1000, 'top');
              this.viewCtrl.dismiss();
            } else {
              this.myForm.reset();
              this.global.showToast(data.msg, 1000, 'top');
            }
          })
        }else if (form.dcId.dcId == 438) {
          this.global.showToastwaring('Sick Leave cannot be uploaded from App', 2000, 'top');
        }



      });
    } else {
      this.global.showToastwaring('Please Enter Details', 1000, 'top');
    }
  }
}
