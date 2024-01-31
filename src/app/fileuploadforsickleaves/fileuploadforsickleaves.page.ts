import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Global} from "../globalpath";
import {ModalController, NavController, NavParams} from "@ionic/angular";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";

@Component({
  selector: 'app-fileuploadforsickleaves',
  templateUrl: './fileuploadforsickleaves.page.html',
  styleUrls: ['./fileuploadforsickleaves.page.scss'],
})
export class FileuploadforsickleavesPage implements OnInit {
  appId;
  image_path;
  docOriginalName;
  currentFile;
  uploadedURL: any = {};
  Category: Array<any> = [];
  userDetails;
  patientId;
  imageFileName;
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
    Categary: new FormControl('', null),
  });

  constructor(public navCtrl: NavController,
              public global: Global,
              public viewCtrl: ModalController,
              public appointmentService: AppointmentlistService,
              public navParams: NavParams) {
    this.appId = this.navParams.get('appId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpPhotoApplistPage');
  }

  ngOnInit() {
    this.myForm.get('Categary')?.setValue('0');
    this.userDetails = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.appointmentService.patientIdByUserId(this.userDetails.userId).then(resp => {
      this.patientId = resp.patientId;
    });
    this.appointmentService.getDropDown(1, 100, '').then(resp => {
      this.Category = resp;
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
    this.currentFile = event.target.files[0];
    this.docOriginalName = this.currentFile.name;
  }

  submit(form: any) {
    console.log("submit called...", form.Categary)
    if (form.file != 0) {
      const formData: FormData = new FormData();
      const model: any = {};
      // formData.append('file', this.dataimage,this.imageFileName);
      formData.append('file', this.currentFile, this.currentFile.name);
      this.appointmentService.addFileUplaodService(formData).then(resp => {
        this.uploadedURL = resp;
        model.duDcId = {'dcId': form.Categary};
        model.duPath = this.uploadedURL;
        model.duPatientId = {'patientId': this.patientId};
        model.duName = form.name;
        // model.duFileName = this.docOriginalName;
        model.duFileName = this.uploadedURL;

        this.appointmentService.addRecordForSickLeaves(model).then(data => {
          this.ngOnInit();
          if (data.success == '1') {
            this.global.showToast(data.msg, 5000, 'top');
            this.myForm.reset();
            this.viewCtrl.dismiss();
            this.myForm.get('Categary')?.setValue('0');
          } else {
            this.myForm.reset();
            this.myForm.get('Categary')?.setValue('0');
            this.global.showToast(data.msg, 1000, 'top');

          }
        });
      });
    } else {
      this.global.showToastwaring('Please Enter Details', 1000, 'top');
    }
    // this.imageFileName = this.randomStr(10, '12123144') + '.jpg';

  }
}
