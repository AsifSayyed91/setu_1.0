import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CompleteTestService} from "../providers/network/Autocomplete.service";
import {DatePipe} from "@angular/common";
import {RegisterService} from "../account-register/account.service";
import {ExploreService} from "../explore-services/explore-services.service";
import {Global} from "../globalpath";
import {ActionSheetController, AlertController, LoadingController, NavController, NavParams} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-register-new',
  templateUrl: './account-register-new.page.html',
  styleUrls: ['./account-register-new.page.scss'],
})
export class AccountRegisterNewPage implements OnInit {

  // myForm: FormGroup;
  checkshow = false;
  email: any;
  button = true;
  imagebrows;
  ISDCode:any;
  base64: any;
  userMobileCode: any;
  mobilevalid: boolean = false;
  mobileotpsend: boolean = false;
  genderList: Observable<any[]>;
  mstCompanyList: Observable<any[]>;
  mobileNoPlaceHolder: any = '';
  countrylist = [];
  statelist = [];
  citylist = [];
  areaList = [];
  imagepath: any;
  selectedfile: File;
  bloodGroupList: Observable<any[]>;
  cityListForDubai: Array<any> = [];
  areaListByState: Array<any> = [];
  registration: FormGroup;
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
  emailPattern = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  maldives = this.globals.Maldives;
  mobileCode = this.globals.mobileCode;
  mobileLength = this.globals.mobileLength;
  nationalityList: Array<any> = [];
  nationalityName: any = 'Nationality ID No';
  footer = this.globals.footer;
  mstcountry: any = {};
  mstcitylist: Array<any> = [];
  mstAreaList: Array<any> = [];
  mstCity: any = {};
  mstCountry: any = {};
  dubaiCode = 971;
  disabledSendOtp = true;
  // selectedCountryCode: string = 'AE';

  showOtpButton: Boolean = false;

  // @ViewChild('searchbar') searchbar: AutoCompleteComponent ;

  constructor(public fb: FormBuilder,
              // public completeTestService: CompleteTestService,
              private completeTestService: CompleteTestService,
              public loadingCtrl: LoadingController,
              public http: HttpClient,
              public alertCtrl: AlertController,
              public actionSheetCtrl: ActionSheetController,
              private registerService: RegisterService,
              public navCtrl: NavController,
              public navParams: NavParams,
              private route: ActivatedRoute,
              private router: Router,
              private globals: Global,
              public exploreservicesService: ExploreService,
              private alertController: AlertController) {

  }

  ngOnInit(): void {
    this.registration = this.fb.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'titleId': [null, Validators.required],
      'dob': [null],
      'age': [null],
      'userDay': [null],
      'userMonth': [null],
      'gender': [null],
      'userMobileCode': [null, Validators.required],
      'mobileno': [null, Validators.required],
      'mobileotp': [null],
      // 'mobileotp': [null, Validators.required],
      // 'email': [null, Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
      // 'email': [null, Validators.required],
      // 'email': ['', [Validators.required, Validators.email]],
      'email': ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}')]],

      'address': [null],
      'check': [null, Validators.required],
      'pincode': [null],
      'bloodgroup': [null],
      'pid': [null],
      'userUid': [null],
      'userImage': [null],
      'userIdDocFp': [false],
      'userInsuranceCardNo': [null],
      'userInsuranceCardFp': [false],
      'userInsuranceDateOfIssue': [null],
      'userInsuranceDateOfExp': [null],
      'userInsuranceId': [null],
      'city': [null, Validators.required],
      'state': [null, Validators.required],
      'area': [null, Validators.required],
      'uploadfile': [0],
      'userNationalityId': [null],
      'insurancePatient': false,
      'isUserOrStaff': false
    });
    this.registerService.getTitleList('1', '', '', '', '').then(resp => {
      this.msttitlelist = resp.content;
    });
    this.registration.get('titleId')?.setValue('0');
    this.registration.get('gender')?.setValue('0');
    this.registration.get('city')?.setValue('0');
    this.genderList = this.registerService.getGenderList();


    this.exploreservicesService.getCityListforDubai().subscribe((data: any) => {
      this.cityListForDubai = data;
      console.log('hey dipak this is the cityListForDubai  =>',this.cityListForDubai);
    });
    +
      this.registerService.getNationalityList('1', '', '', '', '').subscribe(data => {
        this.nationalityList = data.content;
      });


    /*  this.exploreservicesService.getAreaByState(stateId).subscribe((data: any) => {
        this.areaListByState = data;
        console.log('AreaList  =>',this.cityListForDubai);
      });*/

  }



  itemSelected(ev) {
    console.log(ev.target.value);
    // let selectedCity = this.cityListForDubai.filter(function(item){return item.cityId == 3798});

    let selectedCity = this.cityListForDubai.filter(function(item){
      return item.stateId == ev.target.value;
    });
    ev = selectedCity[0];
    console.log(selectedCity);
    console.log(ev);
    this.registration.get('state')?.setValue(ev.stateId);
    if (ev.stateId == '41391' || ev.stateId == 41391) {
      this.showOtpButton = true;
    }
    this.mstCountry = ev.stateCountryId;
    // this.onSelect(this.searchbar.getValue())
    // console.log(this.searchbar.getValue());
    /*  this.getAreaByCityFilter(ev.cityId);*/
    this.getAreaByStateFilter(ev.stateId);
    this.ISDCode = ev.stateCountryId.countryIsdCode;
  }

  onSelect(cityId: any) {
    this.mstCity = cityId;
    this.mobileLength = cityId.cityStateId.stateCountryId.countryIsdCodeMLen;
    // this.mobileLength = cityId.stateCountryId.countryCode;
    console.log('country By State =>', this.mstCity.stateCountryId.countryIsdCode);
    this.registration.get('userMobileCode')?.setValue(cityId.cityStateId.stateCountryId.countryIsdCode);
    this.mobileNoPlaceHolder = 'Enter ' + this.mobileLength + ' Digit Mobile No';
  }


  getAreaByStateFilter(stateId) {
    this.exploreservicesService.getAreaByState(stateId).subscribe((data: any) => {
      this.areaList = data;
      console.log('areaList By State =>', this.areaList);
    })
  }

  //for Area filter
  getAreaByCityFilter(cityId) {
    //const cid = cityId.target.value;
    this.registerService.getAreaListByCityId(cityId).subscribe((data: any) => {
      this.areaList = data;
      console.log('areaList =>', this.areaList);
    })
  }
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      message: 'You already have a Portal account, please login to continue. ',
      buttons: [{
        text: 'Yes', handler: () => {
          alert.dismiss(true);
          this.router.navigateByUrl('/login');
          return false;
        }
      }, {
        text: 'No', handler: () => {
          alert.dismiss(false);
          this.registration.get('email')?.setValue('');
          return false;
        }
      }]
    });

    await alert.present();
    // await alert.onDidDismiss();
  }

  checkMail() {
    this.registerService.getRecordServiceByemailid(this.registration.get('email')?.value).then(resp => {
      if (resp.length > 0) {
        this.presentAlert();
        // alert.onDidDismiss((data) => {
        //   if (data == true) {
        //     this.router.navigateByUrl('/login');
        //   }
        // });
      } else {
        console.log('false ');
      }
    });
    return this.registration.get('email');
  }
  /*selectCountry(id) {
    this.registration.get('city').setValue(0);
    this.mstcountry = this.countrylist.filter(country => country.countryId == id)[0];
    this.registration.get('userMobileCode').setValue(this.mstcountry.countryIsdCode);
    this.mobileLength = this.mstcountry.countryIsdCodeMLen;
    this.mobileNoPlaceHolder = 'Enter ' + this.mobileLength + ' Digit Mobile No';
    this.registerService.getState(id).then(data => {
      this.statelist = data;
    })
  }*/

  selectState(id) {
    console.log('select state =>', id)
    this.registerService.getCity(id).then(data => {
      this.citylist = data;
    })
  }

  selectArea(id) {
    console.log('select area =>', id)
    // this.registerService.getCity(id).then(data => {
    this.registerService.getArea(id).then(data => {
      this.areaList = data;
      console.log('area list => ', this.areaList);
    })
  }


  getMobNoLength(date: any) {
    console.log('length ', this.mstcountry.countryIsdCodeMLen);
    this.mstcountry = this.countrylist.filter((item:any) => item.countryIsdCode == date)[0];
    this.mobileLength = this.mstcountry.countryIsdCodeMLen;
    this.mobileNoPlaceHolder = 'Enter ' + this.mobileLength + ' Digit Mobile No';
    console.log('this.mstcountry ', this.mstcountry);
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
    console.log("d", form)
    this.registerService.uploadDoc(form).then(resp => {
      console.log("sre1", resp)
      this.registration.get('userIdDocFp')?.setValue(resp);
    });
  }

  uploadInssCardFp(event) {
    console.log("event", event)
    const form = new FormData();
    form.append('file', event.target.files[0]);
    console.log("d", form)
    this.registerService.uploadDoc(form).then(resp => {
      console.log("sre", resp)
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
    let type = event.target.files[0].type;
    if (this.checkImage(type)) {
      console.log("this.selectedfile", event)
      this.selectedfile = event.target.files[0];
      let form = new FormData();
      form.append('file', this.selectedfile);
      this.registerService.addfile(form).then(resp => {
        this.imagepath = this.globals.paientImgPath + resp;
        this.imagebrows = 5;
        this.base64 = resp;
        console.log("resp", resp)
        this.registration.get('userImage')?.setValue(resp);
        this.registration.get('uploadfile')?.setValue(1);
      });
    } else {
      this.globals.showToastwaring('Please select correct format Note:You Have To Select File In Image Format Ex.: .JPG,.JPEG,.PNG', 1000, 'top');
    }
  }

  setGender(tid: any) {
    let title = this.msttitlelist.filter(item => (item.titleId == tid));
    this.registration.get('gender')?.setValue(title[0].titleGenderId.genderId);
  }


  onRegisterRecord(registrationData) {

    this.registration.reset();
    this.loadingCtrl.create({
      message: 'Please wait...'
    }).then((response) => {
      response.present();
    });
    // loading.present();
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
    // registrationData.mobileno = this.ISDCode + registrationData.mobileno;

    if (registrationData.userInsuranceId == undefined || registrationData.userInsuranceId == null || registrationData.userInsuranceId === '') {
      registrationData.insurancePatient = false;
    } else {
      registrationData.insurancePatient = true;
    }

    if (this.mobileOTP == registrationData.mobileotp) {
      this.registerService.registerPatient(registrationData).subscribe((data: {}) => {
        this.responseStatus = data;
        if (this.responseStatus.status == 1) {
          this.loadingCtrl.dismiss();
          this.globals.showToast('Register Successfull, Please Check Your Email For Details!', 1000, 'top');
          this.router.navigateByUrl('/login');
          if (this.responseStatus.SMS_API_disabled === 3) {
            this.loadingCtrl.dismiss();
            this.globals.showToastwaring('Username is ' + this.responseStatus.username + ' ' + 'and Password is ' + this.responseStatus.password, 10000, 'top');

          }
        } else {
          this.loadingCtrl.dismiss();
          this.globals.showToastwaring('Please Fill the Form !', 1000, 'top');
        }
      });
    } else {
      this.loadingCtrl.dismiss();
      this.mobileotpsend = false;
      this.mobilevalid = false;
      this.globals.showToastwaring('Please Enter Valid OTP !', 1000, 'top');
    }
  }

  checkshowNot() {
    this.checkshow = true;
    this.registration.get('check')?.setValue(true);

  }

  checkshowYes() {
    this.checkshow = false;
    // this.button = true;
    this.registration.get('check')?.setValue(null);

  }

  validMob(mobNo: any) {
    console.log("mobile.elngth", mobNo.length)
    if (mobNo.length != this.mobileLength) {
      this.globals.showToastwaring('Please Enter Valid Mobile Number', 1000, 'top');
      this.registration.controls['mobileno'].setValue('');
    }
  }

  CheckMobileLength(ev) {
    if (ev.key == '+') {
      console.log("fdsfg");
      this.registration.get('mobileno')?.setValue('');
    } else {
      if (ev.target.value.length >= this.mobileLength) {
        if (this.mobileLength == this.mobileLength) {
          this.registerService.checkExistByMobileNo(ev.target.value).subscribe(resp => {
            if (resp[0].isMobileNoExist == 1) {
              this.globals.showToastwaring('Patient Already Registered with this Mobile No.', 1000, 'top');
              this.registration.get('mobileno')?.setValue('');
            } else {
              this.registration.get('mobileno')?.setValue(ev.target.value.substring(0, this.mobileLength));
            }
          });
        } else {
          this.registration.get('mobileno')?.setValue('');
        }
      } else {
      }
      if (ev.target.value.length >= this.mobileLength) {
        this.mobilevalid = true;
        this.mobileotpsend = false;
      } else {
        this.mobilevalid = false;
        this.mobileotpsend = false;
      }
    }
  }

  sendOtp(model: any) {
    console.log("model 1st", model);

    this.mobilevalid = false;
    this.mobileotpsend = true;
    this.timeOut = false;
    this.counter = 601;
    if (model.mobileno != null) {
      this.showTimer = true;
      model.mobileno = this.mobileCode + model.mobileno;
      // Console('counry code', model.mobileno);
      // model.mobileno = '+'+this.ISDCode + model.mobileno;
      this.registerService.validateMobileNumber(model).subscribe(resp => {
        this.generatedOTP = resp.OTP;
        this.userMobileNo = resp.MobileNo;
        this.mobileOTP = resp.OTP;
        console.log("model 2nd", model);
        if (!model.userMobileCode.toLocaleLowerCase().includes("971")) {
          this.globals.showToast('OTP Sent to email Successfull !', 1000, 'top');
        } else {
          this.globals.showToast('OTP Sent to mobile no and on email!', 1000, 'top');
        }
        if (resp.SMS_API_disabled === 3) {
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
      // model.mobileno = this.ISDCode + model.mobileno;
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

  selectedDate() {
    let userDob = this.registration.get('dob')?.value;
    var datePipe = new DatePipe('en-US');
    this.value = datePipe.transform(userDob, 'dd/MM/yyyy');
    this.dobyear = datePipe.transform(userDob, 'yyyy');
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
    this.router.navigateByUrl('/login');
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
