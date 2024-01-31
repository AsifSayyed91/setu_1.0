import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {RegisterService} from "../account-register/account.service";
import {Global} from "../globalpath";
import { Observable } from 'rxjs';
import {ActionSheetController, NavController, NavParams} from "@ionic/angular";

@Component({
  selector: 'app-account-register',
  templateUrl: './account-register.page.html',
  styleUrls: ['./account-register.page.scss'],
})
export class AccountRegisterPage implements OnInit {
  checkshow = false;
  button = true;
  imagebrows;
  base64: any;
  mobilevalid: boolean = false;
  mobileotpsend: boolean = false;
  genderList: Observable<any[]>;
  mstCompanyList: Observable<any[]>;
  countrylist = [];
  statelist = [];
  citylist = [];
  imagepath: any;
  selectedfile: any;
  bloodGroupList: Observable<any[]>;
  registration!: FormGroup;
  responseStatus: any;
  counter = 601; //20;
  showTimer: boolean = false;
  timeOut: boolean = false;
  generatedOTP: any;
  userMobileNo: any;
  mobileOTP: any;
  demoOTP: any;
  value;
  dobyear;
  age;
  msttitlelist: Array<any> = [];
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  maldives = this.globals.Maldives;
  mobileCode = this.globals.mobileCode;
  mobileLength = this.globals.mobileLength;
  nationalityList: Array<any> = [];
  nationalityName: any = 'Nationality ID No';
  footer = this.globals.footer;

  constructor(public fb: FormBuilder,
              public actionSheetCtrl: ActionSheetController,
              public registerService: RegisterService,
              public navCtrl: NavController,
              public navParams: NavParams,
              private globals: Global) {
    this.registration = fb.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'titleId': [null, Validators.required],
      'dob': [null, Validators.required],
      'age': [null],
      'gender': [null, Validators.required],
      'mobileno': [null, Validators.required],
      'mobileotp': [null, Validators.required],
      'email': ['', Validators.pattern(this.emailPattern)],
      'address': [null],
      'check': [null, Validators.required],
      'pincode': [null],
      'bloodgroup': [null],
      'countryId': [null],
      'pid': [null],
      'userUid': [null],
      'userImage': [null],
      'userIdDocFp': [false],
      'userInsuranceCardNo': [null],
      'userInsuranceCardFp': [false],
      'userInsuranceDateOfIssue': [null],
      'userInsuranceDateOfExp': [null],
      'userInsuranceId': [null], // 'city': [null, Validators.required],
      'stateId': [null],
      'city': [null],
      'uploadfile': [0],
      'userNationalityId': [null],
      'insurancePatient': false
      // 'userNationalityId': fb.group({
      //   'nationalityId': [null]
      // })
    });
  }

  ngOnInit(): void {
    this.registration.get('titleId')?.setValue('0');
    this.registration.get('bloodgroup')?.setValue('0');
    this.registration.get('gender')?.setValue('0');
    this.registration.get('countryId')?.setValue('0');
    this.registration.get('stateId')?.setValue('0');
    this.registration.get('city')?.setValue('0');
    this.registration.get('userInsuranceId')?.setValue('0');
    this.getCountry();
    this.genderList = this.registerService.getGenderList();
    this.bloodGroupList = this.registerService.getBloddGroupList();
    this.registerService.getTitleList('1', '', '', '', '').then(resp => {
      this.msttitlelist = resp.content;
    });
    this.registerService.getNationalityList('1', '', '', '', '').subscribe(data => {
      this.nationalityList = data.content;
    });
    this.registerService.getAllCompanyList('1', '', '', '', '').then(resp => {
      this.mstCompanyList = resp.content;
    });
  }

  getCountry() {
    this.registerService.getCountry('1', '500').then(data => {
      this.countrylist = data.content;
    })
  }

  selectCountry(id) {
    this.registerService.getState(id).then(data => {
      this.statelist = data;
    })
  }

  selectState(id) {
    this.registerService.getCity(id).then(data => {
      this.citylist = data;
    })
  }


  onSelectNatinality(nationality: any) {
    this.nationalityName = 'Enter ' + this.nationalityList.filter(nationalityId => nationalityId.nationalityId == nationality)[0].nationalityName + ' No';
  }

  checkImage(type) {
    if (type == 'image/x-png' || type == 'image/jpeg' || type == 'image/png') {
      return true;
    } else {
      return false;
    }
  }

  uploadIdentifyDocFp(event) {
    const form = new FormData();
    form.append('file', event.target.files[0]);
    console.log("d", form);
    this.registerService.uploadDoc(form).then(resp => {
      console.log("sre1", resp);
      this.registration.get('userIdDocFp')?.setValue(resp);
    });
  }

  uploadInssCardFp(event) {
    console.log("event", event);
    const form = new FormData();
    form.append('file', event.target.files[0]);
    console.log("d", form);
    this.registerService.uploadDoc(form).then(resp => {
      console.log("sre", resp);
      this.registration.get('userInsuranceCardFp')?.setValue(resp);
    });
  }

  selectedInsuranceDateOfIssue(ev: any) {
    var datePipe = new DatePipe('en-US');
    this.value = datePipe.transform(ev.target.value, 'dd-MM-yyyy');
    this.registration.get('userInsuranceDateOfIssue')?.setValue(this.value);
  }

  selectedInsuranceDateOfExp(ev: any) {
    var datePipe = new DatePipe('en-US');
    this.value = datePipe.transform(ev.target.value, 'dd-MM-yyyy');
    this.registration.get('userInsuranceDateOfExp')?.setValue(this.value);
  }

  take(event) {
    console.log("this.selectedfile", event);
    this.selectedfile = event.target.files[0];
    let form = new FormData();
    form.append('file', this.selectedfile);
    this.registerService.addfile(form).then(resp => {
      this.imagepath = this.globals.paientImgPath + resp;
      this.imagebrows = 5;
      this.base64 = resp;
      console.log("resp", resp);
      this.registration.get('userImage')?.setValue(resp);
      this.registration.get('uploadfile')?.setValue(1);
    });
  }

  setGender(tid: any) {
    let title = this.msttitlelist.filter(item => (item.titleId == tid));
    this.registration.get('gender')?.setValue(title[0].titleGenderId.genderId);
  }

  selectCity(id) {
    console.log(id, 'id')
  }

  onRegisterRecord(registrationData) {
    this.registration.reset();
    // registrationData.append('userImage', this.currentFile, this.currentFile.name);
    console.log("this.register", registrationData);
    if (registrationData.city == '0') {
      // registrationData.city== 'null';
      delete registrationData.city;
    }
    if (registrationData.address == null) {
      delete registrationData.address;
    }
    if (registrationData.pincode == null) {
      delete registrationData.pincode;
    }
    if (registrationData.bloodgroup == null) {
      delete registrationData.bloodgroup;
    }
    if (registrationData.pid == null) {
      delete registrationData.pid;
    }
    if (registrationData.bloodgroup == null || registrationData.bloodgroup == 0) {
      delete registrationData.bloodgroup;
    }
    registrationData.mobileno = this.mobileCode + registrationData.mobileno;

    if (registrationData.userInsuranceId == undefined || registrationData.userInsuranceId == null || registrationData.userInsuranceId === '') {
      registrationData.insurancePatient = false;
    } else {
      registrationData.insurancePatient = true;
    }

    if (this.mobileOTP == registrationData.mobileotp) {
      this.registerService.registerPatient(registrationData).subscribe((data: {}) => {
        this.responseStatus = data;
        if (this.responseStatus.status == 1) {
          this.globals.showToast('Register Successfull, Please Check Your Email For Details! !', 1000, 'top');
          this.navCtrl.navigateRoot('/login');
          if (this.responseStatus.SMS_API_disabled === 3) {
            this.globals.showToastwaring('Username is ' + this.responseStatus.username + ' ' + 'and Password is ' + this.responseStatus.password, 10000, 'top');

          }
        } else {
          this.globals.showToastwaring('Register Fail !', 1000, 'top');
        }
      });
    } else {
      this.globals.showToastwaring('Please Enter Valid OTP !', 1000, 'top');
    }
  }

  checkshowNot() {
    this.checkshow = true;
    // this.button = false;
    this.registration.get('check')?.setValue(true);

  }

  checkshowYes() {
    this.checkshow = false;
    // this.button = true;
    this.registration.get('check')?.setValue(null);

  }

  CheckMobileLength(ev) {
    console.log('ev', ev);
    if (this.maldives == true) {
      if (ev.target.value.length >= this.mobileLength) {
        this.mobilevalid = true;
        this.mobileotpsend = false;
      } else {
        this.mobilevalid = false;
        this.mobileotpsend = false;
      }
    } else {
      if (ev.target.value.length >= 10) {
        this.mobilevalid = true;
        this.mobileotpsend = false;
      } else {
        this.mobilevalid = false;
        this.mobileotpsend = false;
      }
    }
  }

  sendOtp(model: any) {
    this.mobilevalid = false;
    this.mobileotpsend = true;
    this.timeOut = false;
    this.counter = 601;
    if (model.mobileno != null) {
      this.showTimer = true;
      model.mobileno = this.mobileCode + model.mobileno;
      this.registerService.validateMobileNumber(model).subscribe(resp => {
        this.generatedOTP = resp.OTP;
        this.userMobileNo = resp.MobileNo;
        this.mobileOTP = resp.OTP;
        this.globals.showToast('OTP Sent Successfull !', 1000, 'top');
        if (resp.SMS_API_disabled === 3) {
          // alert('OTP is ' + this.mobileOTP);
          this.demoOTP = resp.OTP;
          this.globals.showToast('OTP is set for demo purpose', 1000, 'top');
        }
      });
    } else {
      this.globals.showToasterror('Please Enter Valid Mobile Number!', 1000, 'top');
    }
  }

  resendotp(model: any) {
    if (model.mobileno != null) {
      this.showTimer = true;
      model.mobileno = model.mobileCode + model.mobileno;
      this.registerService.validateMobileNumber(model).subscribe(resp => {
        this.generatedOTP = resp.OTP;
        this.userMobileNo = resp.MobileNo;
        this.mobileOTP = resp.OTP;
        this.globals.showToast('OTP Sent Successfull!', 1000, 'top');
        if (resp.SMS_API_disabled === 3) {
          this.demoOTP = resp.OTP;
          this.globals.showToast('OTP is set for demo purpose', 1000, 'top');
        }

      });
    } else {
      this.globals.showToasterror('Please Enter Valid Mobile Number!', 1000, 'top');
    }
  }

  selectedDate(ev: any) {
    var datePipe = new DatePipe('en-US');
    this.value = datePipe.transform(ev.target.value, 'dd/MM/yyyy');
    this.dobyear = datePipe.transform(ev.target.value, 'yyyy');
    var currentyear = (new Date()).getFullYear();
    this.age = currentyear - this.dobyear;
    this.registration.get('age')?.setValue(this.age);
  }

  changePatientName() {
    let patientName = this.registration.get('username')?.value;
    this.registration.get('username')?.setValue(patientName.toUpperCase());
  }

  //  National Id unique
  checknationalid(nationalid) {
    this.registerService.getRecordServiceBynationalid(nationalid).then(resp => {
      if (resp.length > 0) {
        this.globals.showToastwaring('Nationality Id Already Exist! Patient Already Registered', 1000, 'top');
        this.registration.get('pid')?.setValue(null);
      } else {
        this.registration.get('pid')?.setValue(nationalid);
      }
    });
  }

  onLogin() {
    this.navCtrl.navigateRoot('/login');
  }

  inputFilter(event: any) {
    const pattern = /^[a-zA-Z\s]*$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
}
