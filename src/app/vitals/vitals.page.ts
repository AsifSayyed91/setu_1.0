import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VitalServices} from "../vitals/vital-services";
import {Global} from "../globalpath";
import {ModalController, NavController, NavParams} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.page.html',
  styleUrls: ['./vitals.page.scss'],
})
export class VitalsPage implements OnInit {
  // vitalForm:FormGroup;
  VitalForm: FormGroup;
  appdetails;

  constructor(public fb: FormBuilder,
              public navCtrl: NavController,
              public vitalServices: VitalServices,
              public viewCtrl: ModalController,
              public navParams: NavParams,
              private router: Router,
              public global: Global,) {
    this.appdetails = this.router.getCurrentNavigation()?.extras?.state;
    console.log("appdetails", this.appdetails);
    // this.vitalForm=fb.group({
    //   'height':[null],
    //   'weight':[null],
    //   'bmi':[null],
    //   'bodytemp':[null],
    //   'pulse':[null],
    //   'resprate':[null],
    //   'systolic':[null],
    //   'diastolic':[null],
    //   'map':[null],
    //   'spo':[null],
    //   'blood':[null],
    //   'hemoglobin':[null],
    //   'fat':[null],
    //   'muscle':[null],
    // });

    this.VitalForm = fb.group({
      // 'vitalVisitId': fb.group({
      //   'visitId': [null]
      // }),
      // 'vitalStaffId': fb.group({
      //   'staffId': [null]
      // }),
      // 'vitalTimelineId': fb.group({
      //   'timelineId': [null]
      // }),
      'vitalHeight': [null, Validators.required],
      'vitalWeight': [null, Validators.required],
      'vitalBmi': [null, Validators.required],
      'vitalBodyTemp': [null, Validators.required],
      'vitalPulse': [null, Validators.required],
      'vitalRespirationRate': [null, Validators.required],
      'vitalSysBp': [null, Validators.required],
      'vitalDiaBp': [null, Validators.required],
      'vitalMap': [null, Validators.required],
      'vitalSpo2': [null, Validators.required],
      'vitalBloodGlucose': [null, Validators.required],
      'vitalHimoglobin': [null, Validators.required],
      'vitalFat': [null, Validators.required],
      'vitalMuscleMass': [null, Validators.required],
      'vitalRemark': [null, Validators.required],
      'vitalPainScore': [null, Validators.required]
    });
  }

  ngOnInit() {
    console.log("ngOnInIt Called !!");

  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  onVital(model) {
    console.log('modal', model)
  }

  calculateBMI(height: any, weight: any) {
    let calulatedBMI = 0;
    if (height === '') {
      height = this.VitalForm.value.vitalHeight;
      height = height / 100;
    }
    else if (weight === '') {
      weight = this.VitalForm.value.vitalWeight;
    }
    if (height === 0 || isNaN(height)) {
      //  this.toastr.success('Failed ! ');
    }
    else {
      calulatedBMI = weight / (height * height);
    }
    this.VitalForm.get('vitalBmi')?.setValue(calulatedBMI.toFixed(2));
  }

  checkThreeTwoDecimalDigitBodyTemp(no: any, limit: any) {
    if (no.length > 6) {
      this.VitalForm.controls['vitalBodyTemp'].setValue('');
    }
    else {
      var available;
      available = no.split('.');
      // console.log(available.length);
      if (available[0].length <= 3 && available[0] <= 120 && available[0] >= 0) {
        if (available.length == 2) {
          if (available[1] != undefined && available[1].length <= 2) {
          }
          else {
            this.VitalForm.controls['vitalBodyTemp'].setValue('');
          }
        }
      }
      else {
        this.VitalForm.controls['vitalBodyTemp'].setValue('');
      }
    }
  }

  checklength3(no: any, key: any) {
    // hi
    // console.log(no);
    switch (key) {
      case 'vitalPulse':
        if (no <= 150 && no >= 0) {
          this.VitalForm.controls['vitalPulse'].setValue(no.substring(0, 3));
        }
        else {
          // this.toastr.error('Please Enter Valid Input!');
          this.VitalForm.controls['vitalPulse'].setValue('');
        }
        break;
      case 'vitalRespirationRate':
        if (no <= 70 && no >= 0) {
          this.VitalForm.controls['vitalRespirationRate'].setValue(no.substring(0, 3));
        }
        else {
          // this.toastr.error('Please Enter Valid Input!');
          this.VitalForm.controls['vitalRespirationRate'].setValue('');
        }
        break;
      case 'vitalSysBp':
        if (no <= 260 && no >= 0) {
          this.VitalForm.controls['vitalSysBp'].setValue(no.substring(0, 3));
        }
        else {
          // this.toastr.error('Please Enter Valid Input!');
          this.VitalForm.controls['vitalSysBp'].setValue('');
        }
        break;
      case 'vitalDiaBp':
        if (no <= 260 && no >= 0) {
          this.VitalForm.controls['vitalDiaBp'].setValue(no.substring(0, 3));
        }
        else {
          // this.toastr.error('Please Enter Valid Input!');
          this.VitalForm.controls['vitalDiaBp'].setValue('');
        }
        break;
      case 'vitalSpo2':
        if (no <= 100 && no >= 0) {
          this.VitalForm.controls['vitalSpo2'].setValue(no.substring(0, 3));
        }
        else {
          // this.toastr.error('Please Enter Valid Input!');
          this.VitalForm.controls['vitalSpo2'].setValue('');
        }
        break;
      case 'vitalMuscleMass':
        if (no < 100 && no >= 0) {
          this.VitalForm.controls['vitalMuscleMass'].setValue(no.substring(0, 5));
        }
        else if (no == 100) {
          this.VitalForm.controls['vitalMuscleMass'].setValue(no.substring(0, 6));
        }
        else {
          // this.toastr.error('Please Enter Valid Input!');
          this.VitalForm.controls['vitalMuscleMass'].setValue('');
        }
        break;
      case 'vitalFat':
        if (no <= 100 && no >= 0) {
          this.VitalForm.controls['vitalFat'].setValue(no.substring(0, 3));
        }
        else {
          // this.toastr.error('Please Enter Valid Input!');
          this.VitalForm.controls['vitalFat'].setValue('');
        }
        break;
    }
  }

  checkThreeTwoDecimalDigitBG(no: any, limit: any) {
    if (no.length > 6) {
      this.VitalForm.controls['vitalBloodGlucose'].setValue('');
      // this.toastr.error('Please enter correct value', 'Validation Error ! ');
    }
    else {
      var available;
      available = no.split('.');
      if (Number(available[0]) <= Number(limit) && available[0] >= 0) {
        if (available.length == 2) {
          if (available[1] != undefined && available[1].length <= 2) {
          }
          else {
            this.VitalForm.controls['vitalBloodGlucose'].setValue('');
            // this.toastr.error('Please enter correct value', 'Validation Error ! ');
          }
        }
      }
      else {
        this.VitalForm.controls['vitalBloodGlucose'].setValue('');
        // this.toastr.error('Please enter correct value', 'Validation Error ! ');
      }
    }
  }

  checkThreeTwoDecimalDigitHG(no: any, limit: any) {
    if (no.length > 6) {
      this.VitalForm.controls['vitalHimoglobin'].setValue('');
      // this.toastr.error('Please enter correct value', 'Validation Error ! ');
    }
    else {
      var available;
      available = no.split('.');
      // console.log(available.length);
      if (Number(available[0]) <= Number(limit)) {
        if (available.length == 2) {
          if (available[1] != undefined && available[1].length <= 2) {
          }
          else {
            this.VitalForm.controls['vitalHimoglobin'].setValue('');
            // this.toastr.error('Please enter correct value', 'Validation Error ! ');
          }
        }
      }
      else {
        this.VitalForm.controls['vitalHimoglobin'].setValue('');
        // this.toastr.error('Please enter correct value', 'Validation Error ! ');
      }
    }
  }

  calculateMAP(SBP: any, DBP: any) {
    /*SBP = 83;
    DBP = 50;*/
    SBP = parseFloat(this.VitalForm.value.vitalSysBp);
    DBP = parseFloat(this.VitalForm.value.vitalDiaBp);
    // console.log(this.VitalForm.value.vitalSysBp);
    // console.log(this.VitalForm.value.vitalDiaBp);
    if (this.VitalForm.value.vitalSysBp != null && this.VitalForm.value.vitalDiaBp != null) {
      let inya = 0;
      inya = (DBP) * 2;
      // console.log(inya);
      let romya = 0;
      romya = (SBP) + (inya);
      // console.log(romya);
      let romyaTofixed: any = romya / 3;
      romyaTofixed = parseFloat(romyaTofixed).toFixed(2);
      this.VitalForm.get('vitalMap')?.setValue(romyaTofixed);
    }
  }

  onAddVitals(model: any) {
    console.log('onAddVitls called...');
    if (model.vitalPainScore != null || model.vitalRemark != null || model.vitalHeight != null || model.vitalHimoglobin != null || model.vitalBmi != null || model.vitalBodyTemp != null || model.vitalSysBp != null || model.vitalDiaBp != null || model.vitalFat != null || model.vitalMap != null || model.vitalMuscleMass != null || model.vitalPulse != null || model.vitalRespirationRate != null || model.vitalSpo2 != null || model.vitalWeight != null) {
      model.vitalVisitId = {'visitId': this.appdetails.appointmentTimelineId.timelineVisitId.visitId};
      model.vitalTimelineId = {'timelineId': this.appdetails.appointmentTimelineId.timelineId};
      model.vitalStaffId = {'staffId': this.appdetails.appointmentStaffId.staffId};
      /*   model.vitalVisitId = {'visitId': 1};
         model.vitalTimelineId = {'timelineId': 2};
         model.vitalStaffId = {'staffId': 3};*/
      // console.log(model);
      // if (this.temrVital.vitalId !== null || this.temrVital.vitalId !== undefined) {
      //   model.vitalId = this.temrVital.vitalId;
      // }
      this.vitalServices.addRecordService(model).then(resp => {
        console.log(resp);
        // this.isVitalAdded = true;
        // this.toastr.success(resp.msg, 'Vitals Details Added Succesfully ! ');
        // this.isNgInit = true;
        // this.getVitalDetails(1);
        this.global.showToast('Record Added Successfully', 3000, 'top');
        this.VitalForm.reset();
        this.ngOnInit();
      });
    }
    else {
      // this.toastr.error('Please fill Any One Vital Deatils..! ! ');
      this.global.showToasterror('Unable to save Record', 3000, 'top');
    }
  }


  /* if (resp.success === '1') {
        this.global.showToast('Record Added Successfully', 3000, 'top');
        this.myComplaints.reset()
;        this.ngOnInit();
      }
      else {
        this.global.showToasterror('Unable to save Record', 3000, 'top');
      }*/
}
