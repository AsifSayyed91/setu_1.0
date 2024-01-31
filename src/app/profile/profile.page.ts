import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../profile/profile.service";
import {Global} from "../globalpath";
import {DatePipe} from "@angular/common";
import {AlertController, LoadingController, ModalController, NavController, NavParams} from "@ionic/angular";
import {RegisterService} from "../account-register/account.service";
import {ExploreService} from "../explore-services/explore-services.service";
import {MyUploadviewPage} from "../my-uploadview/my-uploadview.page";
import {Router} from "@angular/router";
import {EventsService} from "../services/events.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  loginUser;
  loginUser1;
  value;
  selectedDobFormat;
  dobyear;
  age;
  userImage;
  users;
  imagebrows;
  base64: any;
  uploadfile;
  selectedfile!: File;
  imagepath;
  userDetails;
  login;
  profile: boolean = true;
  Address: boolean = false;
  profileView: boolean = false;
  Identification: boolean = false;
  timeOut: boolean = false;
  counter = 601; //20;
  userMobileNo: any;
  demoOTP: any;
  showTimer: boolean = false;
  generatedOTP: any;
  Insurance: boolean = false;
  title = 'User profile';
  InsuranceDateOfExp;
  InsuranceDateIssue;
  Addressform: FormGroup;
  Insuranceform: FormGroup;
  registration: FormGroup;
  mobileLength = this.global.mobileLength;
  registration_new: FormGroup;
  countrylist: Array<any> = [];
  mstCompanyList: Array<any> = [];
  nationalityList: Array<any> = [];
  msttitlelist: Array<any> = [];
  genderList: any;
  cityListForDubai: any;
  statelist: Array<any> = [];
  citylist: Array<any> = [];
  mstCountry: Array<any> = [];
  areaList = [];
  mobileOTP: any;
  responseStatus: any;
  selectedCityName: any;
  mobileCode = this.global.mobileCode;
  mobileotpsend: boolean = false;
  mobilevalid: boolean = false;
  showOtpButton: boolean = false;
  checkshow: boolean = false;

  nationalityName: any = 'Nationality ID No';
  user;

  constructor(public fb: FormBuilder,
              public viewCtrl: ModalController,
              private dp: DatePipe,
              public events: EventsService,
              public profileservice: ProfileService,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              public global: Global,
              public registerService: RegisterService,
              public alertCtrl: AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public exploreservicesService: ExploreService,
              private  router:Router) {
    this.events.subscribe('user:created', (data: any) => {
      console.log('Welcome', data.user, 'at', data.time);
    });
    this.Addressform = fb.group({
      'address': [null],
      'pincode': [null],
      'countryId': [null],
      'stateId': [null],
      'city': [null],
    });
    this.Insuranceform = fb.group({
      'userInsuranceCardNo': [null, Validators.required],
      'userInsuranceCardFp': [false],
      'userInsuranceDateOfIssue': [null, Validators.required],
      'userInsuranceDateOfExp': [null, Validators.required],
      'userInsuranceId': [null, Validators.required],
    });
    this.registration = fb.group({
      'userIdDocFp': [false],
      'uploadfile': [0],
      'userUid': [null],
      'userNationalityId': [null],
    });

    this.registration_new = fb.group({
      'firstName': [null],
      'lastName': [null],
      'titleId': [1, Validators.required],
      'dob': [null],
      'age': [null],
      'userDay': [null],
      'userMonth': [null],
      'gender': [null],
      'userMobileCode': [null, Validators.required],
      'mobileno': [null, Validators.required],
      'mobileotp': [null],
      // 'email': [null, Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
      'email': [null, Validators.required],
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
      'city': [null],
      'state': [null],
      'area': [null],
      'uploadfile': [0],
      'userNationalityId': [null],
      'insurancePatient': false,
      'isUserOrStaff': false
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ngOnInit() :void{
    this.loginUser1 = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.user = JSON.parse(localStorage.getItem('profileuserImage') || '{}');
    this.userImage = this.global.paientImgPath + this.user;
    this.profileservice.getProfile(this.loginUser1.userId).then(data => {
      this.loginUser = data;
      console.log("loginUser77777777777777", this.loginUser)
      // this.userImage = this.global.paientImgPath + this.loginUser.userImage;
    });
  }

  async  ViewImage(imgp, name) {
    let medication_view = await  this.modalCtrl.create({
      component: MyUploadviewPage,
    componentProps: {
      imagepath: imgp,
      name: name
    }
    });
    medication_view.present();
    console.log("view image", imgp);
  }

 async updateProfile(imgp, name) {
    let medication_view = await this.modalCtrl.create({
      component: MyUploadviewPage,
   componentProps: {
        imagepath: imgp,
     name: name
      }
    });
    medication_view.present();
    console.log("view image", imgp);
  }

  viewProfile(openClose: boolean) {
    this.profileView = !this.profileView;
    this.profile = !this.profile;
    this.registration_new.reset();
    console.log(this.loginUser1.userMobile);
    this.checkshow = false;

    if (openClose) {
      this.registerService.getTitleList('1', '', '', '', '').then(resp => {
        this.msttitlelist = resp.content;
      });

      this.genderList = this.registerService.getGenderList();

      this.exploreservicesService.getCityListforDubai().subscribe((data: any) => {
        this.cityListForDubai = data;
        // console.log('hey dipak this is the cityListForDubai  =>',this.cityListForDubai);

        // set all form values
        this.registration_new.get("firstName")?.setValue(this.loginUser.userFirstname);
        this.registration_new.get("lastName")?.setValue(this.loginUser.userLastname);
        this.registration_new.get("dob")?.setValue(this.loginUser.dob);
        this.registration_new.get("gender")?.setValue(this.loginUser.userGenderId.genderId);
        this.registration_new.get("titleId")?.setValue(this.loginUser.userTitleId.titleId);
        this.registration_new.get("email")?.setValue(this.loginUser.userEmail);
        // this.registration_new.get("area")?.setValue(this.loginUser.userArea);
        this.registration_new.get("mobileno")?.setValue(this.loginUser.userMobile);
        this.registration_new.get('state')?.setValue(this.loginUser.userCityId.cityStateId.stateId);
        // this.mstCountry = this.loginUser1.userCityId.cityStateId.stateCountryId;
      });
    }

    if (this.loginUser1.userEmail != null && this.loginUser1.userEmail != '') {
      this.registration_new.get('email')?.setValue(this.loginUser1.userEmail);
    }
    if (this.loginUser1.userMobile != null && this.loginUser1.userMobile != '' && this.loginUser1.userMobile != undefined) {
      this.registration_new.get('mobileno')?.setValue(this.loginUser1.userMobile);
    }

  }

  ViewIdentification(loginUser: any, name: any, id: any) {
    console.log("loginUser : ", loginUser, name, id);
    this.login = loginUser;
    if (id == 1) {
      this.title = name;
      this.profile = false;
      this.Address = false;
      this.Identification = true;
      this.Insurance = false;
    }
  }


  checkshowNot() {
    this.checkshow = true;
    this.registration_new.get('check')?.setValue(true);

  }

  checkshowYes() {
    this.checkshow = false;
    // this.button = true;
    this.registration_new.get('check')?.setValue(null);

  }

  selectedDate() {
    let userDob = this.registration_new.get('dob')?.value;
    console.log("selected dob : ", userDob);
    var datePipe = new DatePipe('en-US');
    // this.selectedDobFormat = datePipe.transform(userDob, 'yyyy/MM/dd');
    // console.log("after formatting dob : ", this.selectedDobFormat);
    this.value = datePipe.transform(userDob, 'dd/MM/yyyy');
    console.log("dob : ", this.value);
    this.dobyear = datePipe.transform(userDob, 'yyyy');
    var currentyear = (new Date()).getFullYear();
    this.age = currentyear - this.dobyear;
    console.log("age : ", this.age);
    this.registration_new.get('age')?.setValue(this.age);
  }

  setGender(tid: any) {
    let title = this.msttitlelist.filter(item => (item.titleId == tid));
    this.registration_new.get('gender')?.setValue(title[0].titleGenderId.genderId);
  }

  itemSelected(ev) {
    console.log(ev.target.value);
    // let selectedCity = this.cityListForDubai.filter(function(item){return item.cityId == 3798});

    let selectedCity = this.cityListForDubai.filter(function (item) {
      return item.stateId == ev.target.value;
    });
    let selectedCityName_ = this.cityListForDubai.filter(function (item) {
      if (item.stateId == ev.target.value) {
        return item.stateName
      }
    });

    console.log("selectedCityName_");
    console.log(selectedCityName_[0].stateName);

    this.registerService.getCityName(selectedCityName_[0].stateName).then(resp => {
      this.selectedCityName = resp[0];
    });

    ev = selectedCity[0];
    console.log(selectedCity);
    this.registration_new.get('state')?.setValue(ev.stateId);
    if (ev.stateId == '41391' || ev.stateId == 41391) {
      this.showOtpButton = true;
    }
    this.mstCountry = ev.stateCountryId;
    // this.onSelect(this.searchbar.getValue())
    // console.log(this.searchbar.getValue());
    /*  this.getAreaByCityFilter(ev.cityId);*/
    this.getAreaByStateFilter(ev.stateId);
  }

  getAreaByStateFilter(stateId) {
    this.exploreservicesService.getAreaByState(stateId).subscribe((data: any) => {
      this.areaList = data;
      console.log('areaList By State =>', this.areaList);
    })
  }

  inputFilter(event: any) {
    const pattern = /^[a-zA-Z\s]*$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  /*selectedDate() {
    let userDob = this.registration.get('dob')?.value;
    var datePipe = new DatePipe('en-US');
    this.value = datePipe.transform(userDob, 'dd/MM/yyyy');
    this.dobyear = datePipe.transform(userDob, 'yyyy');
    var currentyear = (new Date()).getFullYear();
    this.age = currentyear - this.dobyear;
    this.registration.get('age')?.setValue(this.age);
  }*/

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
    await alert.onDidDismiss();
  }


  async dismissAlert(data) {
    const alert = await this.alertCtrl.create({
    });
    await alert.onDidDismiss();
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

  CheckMobileLength(ev) {
    if (ev.key == '+') {
      console.log("fdsfg");
      this.registration_new.get('mobileno')?.setValue('');
    } else {
      if (ev.target.value.length >= this.mobileLength) {
        if (this.mobileLength == this.mobileLength) {
          this.registerService.checkExistByMobileNo(ev.target.value).subscribe(resp => {
            if (resp[0].isMobileNoExist == 1) {
              this.global.showToastwaring('Patient Already Registered with this Mobile No.', 1000, 'top');
              this.registration_new.get('mobileno')?.setValue('');
            } else {
              this.registration_new.get('mobileno')?.setValue(ev.target.value.substring(0, this.mobileLength));
            }
          });
        } else {
          this.registration_new.get('mobileno')?.setValue('');
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
        if (!model.userMobileCode.toLocaleLowerCase().includes("971")) {
          this.global.showToast('OTP Sent to email Successfull !', 1000, 'top');
        } else {
          this.global.showToast('OTP Sent to mobile no and on email!', 1000, 'top');
        }
        if (resp.SMS_API_disabled === 3) {
          this.demoOTP = resp.OTP;
          this.global.showToast('OTP is set for demo purpose', 1000, 'top');
        }
      });
    } else {
      this.global.showToasterror('Please Enter Valid Mobile Number!', 1000, 'top');
    }
  }

  ViewAddress(login, name, id) {
    this.login = login;
    if (id == 1) {
      this.title = name;
      this.profile = false;
      this.Address = true;
      this.Identification = false;
      this.Insurance = false;
      this.Addressform.get('address')?.setValue(this.login.userAddress);
      this.Addressform.get('pincode')?.setValue(this.login.userPincode);
      if (this.login.userCityId != null) {
        this.Addressform.get('countryId')?.setValue(this.login.userCityId.cityStateId.stateCountryId.countryId)
      } else {
        this.Addressform.get('countryId')?.setValue(0)
      }
      if (this.login.userCityId != null) {
        this.Addressform.get('stateId')?.setValue(this.login.userCityId.cityStateId.stateId)
      } else {
        this.Addressform.get('stateId')?.setValue(0)
      }
      if (this.login.userCityId != null) {
        this.Addressform.get('city')?.setValue(this.login.userCityId.cityId)
      } else {
        this.Addressform.get('city')?.setValue(0)
      }
      this.getCountry();
    }
    else if (id == 2) {
      this.title = name;
      this.profile = false;
      this.Address = false;
      this.Identification = false;
      this.Insurance = true;
      this.Insurance = true;
      this.registerService.getAllCompanyList('1', '', '', '', '').then(resp => {
        this.mstCompanyList = resp.content;
      });
      if (this.login.userInsuranceCardNo != null) {
        this.Insuranceform.get('userInsuranceCardNo')?.setValue(this.login.userInsuranceCardNo);
      } else {
        this.Insuranceform.get('userInsuranceCardNo')?.setValue('');
      }
      if (this.login.userInsuranceId != null) {
        this.Insuranceform.get('userInsuranceId')?.setValue(this.login.userInsuranceId.companyId);
      } else {
        this.Insuranceform.get('userInsuranceId')?.setValue(0);
      }

      if (this.login.userInsuranceDateOfIssue != null) {
        var datePipe = new DatePipe('en-US');
        var date = this.login.userInsuranceDateOfIssue.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3");
        this.InsuranceDateIssue = datePipe.transform(date, 'yyyy-MM-dd', 'es-ES');
      } else {

      }
      if (this.login.userInsuranceDateOfExp != null) {
        let myDate = this.login.userInsuranceDateOfExp.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
        this.InsuranceDateOfExp = this.dp.transform(myDate, 'yyyy-MM-dd', 'es-ES');
      } else {
      }
    }
    else {
      this.title = name;
      this.profile = false;
      this.Address = false;
      this.Identification = true;
      this.Insurance = false;

      this.registerService.getNationalityList('1', '', '', '', '').subscribe(data => {
        this.nationalityList = data.content;
      });

      if (this.login.userNationalityId != null) {
        this.registration.get('userNationalityId')?.setValue(this.login.userNationalityId.nationalityId);
      } else {
        this.registration.get('userNationalityId')?.setValue('')
      }

      if (this.login.userUid != null) {
        this.registration.get('userUid')?.setValue(this.login.userUid);
      } else {
        this.registration.get('userUid')?.setValue('');
      }
    }
    // this.ngOnInit();
    // let medication_view = this.modalCtrl.create(MyUploadviewPage, {login: login, name: name, link: id});
    // medication_view.present();
  }

  cancel() {
    this.profile = true;
    this.Address = false;
    this.Identification = false;
    this.Insurance = false;
  }

  upload(ev) {
    let type = ev.target.files[0].type;
    if (this.checkImage(type)) {
      this.selectedfile = ev.target.files[0];
      let form = new FormData();
      form.append('file', this.selectedfile);
      this.registerService.addfile(form).then(resp => {
        this.userImage = this.global.paientImgPath + resp;
        this.imagebrows = 5;
        this.base64 = resp;
        this.imagepath = resp;
        this.uploadfile = 1;
        this.Profile();
      });
    } else {
      this.global.showToastwaring('Please select correct format Note:You Have To Select File In Image Format Ex.: .JPG,.JPEG,.PNG', 1000, 'top');
    }
  }

  Profile() {
    localStorage.setItem('profileuserImage', JSON.stringify(this.imagepath));
    this.users = this.loginUser;
    let usermodel = {};
    usermodel['address'] = this.users.userArea;
    usermodel['userImage'] = this.imagepath;
    usermodel['pincode'] = this.users.userPincode;
    usermodel['uploadfile'] = 1;
    usermodel['userId'] = this.users.userId;
    usermodel['userIdDocFp'] = this.users.userIdDocFp;
    usermodel['userInsuranceCardNo'] = this.users.userInsuranceCardNo;
    usermodel['userInsuranceCardFp'] = this.users.userInsuranceCardFp;
    usermodel['userInsuranceDateOfIssue'] = this.users.userInsuranceDateOfIssue;
    usermodel['userInsuranceDateOfExp'] = this.users.userInsuranceDateOfExp;

    if (this.users.userInsuranceId != null || this.users.userInsuranceId != undefined) {
      usermodel['userInsuranceId'] = this.users.userInsuranceId.companyId;
    } else {
      usermodel['userInsuranceId'] = '';
    }
    if (this.users.userCityId != null) {
      usermodel['city'] = this.users.userCityId.cityId;
    }
    if (this.users.userNationalityId != null) {
      usermodel['userNationalityId'] = this.users.userNationalityId.nationalityId;
    }
    if (this.users.userInsuranceId == undefined || this.users.userInsuranceId == null || this.users.userInsuranceId === '') {
      usermodel['insurancePatient'] = false;
    } else {
      usermodel['insurancePatient'] = true;
    }
    this.profileservice.editRecordService(usermodel).then(resp => {
      this.global.showToast('Profile Updated Succesfully', 1000, 'top');
      this.router.navigateByUrl('/home');
    });
  }


  getCountry() {
    this.registerService.getCountry('1', '500').then(data => {
      this.countrylist = data.content;
    });
    if (this.login.userCityId != null) {
      this.registerService.getState(this.login.userCityId.cityStateId.stateCountryId.countryId).then(data => {
        this.statelist = data;
      });
      this.registerService.getCity(this.login.userCityId.cityStateId.stateId).then(data => {
        this.citylist = data;
      })
    } else {
      this.Addressform.get('stateId')?.setValue(0);
      this.Addressform.get('city')?.setValue(0);
    }
  }

  uploadInssCardFp(event) {
    let type = event.target.files[0].type;
    if (this.checkImage(type)) {
      const form = new FormData();
      form.append('file', event.target.files[0]);
      this.registerService.uploadDoc(form).then(resp => {
        this.Insuranceform.get('userInsuranceCardFp')?.setValue(resp);
      });
    } else {
      this.global.showToastwaring('Please select correct format Note:You Have To Select File In Image Format Ex.: .JPG,.JPEG,.PNG', 1000, 'top');
    }
  }

  selectedInsuranceDateOfIssue(ev: any) {
    var datePipe = new DatePipe('en-US');
    this.value = datePipe.transform(ev.target.value, 'dd-MM-yyyy');
    this.Insuranceform.get('userInsuranceDateOfIssue')?.setValue(this.value);
  }

  selectedInsuranceDateOfExp(ev: any) {
    var datePipe = new DatePipe('en-US');
    this.value = datePipe.transform(ev.target.value, 'dd-MM-yyyy');
    this.Insuranceform.get('userInsuranceDateOfExp')?.setValue(this.value);
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

  selectCity(id) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  uploadIdentifyDocFp(event) {
    let type = event.target.files[0].type;
    if (this.checkImage(type)) {
      const form = new FormData();
      form.append('file', event.target.files[0]);
      this.registerService.uploadDoc(form).then(resp => {
        this.registration.get('userIdDocFp')?.setValue(resp);
      });
    } else {
      this.global.showToastwaring('Please select correct format Note:You Have To Select File In Image Format Ex.: .JPG,.JPEG,.PNG', 1000, 'top');
    }
  }

  onSelectNatinality(nationality: any) {
    this.nationalityName = 'Enter ' + this.nationalityList.filter(nationalityId => nationalityId.nationalityId == nationality)[0].nationalityName + ' No';
  }

  onAddressform(form: any) {
    this.loginUser = this.loginUser;
    let models = {};
    models['username'] = this.loginUser.userName;
    models['password'] = this.loginUser.password;
    models['dob'] = this.loginUser.userDob;
    models['age'] = this.loginUser.userAge;
    models['userMonth'] = this.loginUser.userMonth;
    models['userDay'] = this.loginUser.userDay;
    models['email'] = this.loginUser.userEmail;
    if (this.loginUser.userGenderId != null) {
      models['gender'] = this.loginUser.userGenderId.genderId;
    }
    models['mobileno'] = this.loginUser.userMobile;
    if (form.address == "") {
      models['address'] = this.loginUser.userAddress;
    } else {
      models['address'] = form.address;
    }
    models['address'] = form.address;
    models['city'] = form.city;
    if (this.loginUser.userBloodgroupId != null) {
      models['bloodgroup'] = this.loginUser.userBloodgroupId.bloodgroupId;
    }
    if (form.pincode == null) {
      models['pincode'] = this.loginUser.userPincode;
    } else {
      models['pincode'] = form.pincode;
    }
    models['firstName'] = this.loginUser.userFirstname;
    models['lastName'] = this.loginUser.userLastname;
    if (this.loginUser.userTitleId != null) {
      models['titleId'] = this.loginUser.userTitleId.titleId;
    }
    models['isRegByApi'] = this.loginUser.isRegByApi;
    models['uploadfile'] = '1';
    models['userIdDocFp'] = this.loginUser.userIdDocFp;
    models['userInsuranceCardNo'] = this.loginUser.userInsuranceCardNo;
    models['userInsuranceCardFp'] = this.loginUser.userInsuranceCardFp;
    models['userInsuranceDateOfIssue'] = this.loginUser.userInsuranceDateOfIssue;
    models['userInsuranceDateOfExp'] = this.loginUser.userInsuranceDateOfExp;
    models['userUid'] = this.loginUser.userUid;
    if (this.loginUser.userNationalityId != null) {
      models['userNationalityId'] = this.loginUser.userNationalityId.nationalityId;
    }
    models['userId'] = this.loginUser.userId;
    if (this.loginUser.userInsuranceId != null || this.loginUser.userInsuranceId != undefined) {
      models['userInsuranceId'] = this.loginUser.userInsuranceId.companyId;
    } else {
      models['userInsuranceId'] = form.userInsuranceId;
    }
    if (this.loginUser.userInsuranceId == undefined || this.loginUser.userInsuranceId == null || this.loginUser.userInsuranceId === '') {
      models['insurancePatient'] = false;
    } else {
      models['insurancePatient'] = true;
    }
    console.log("models", models)
    if (form.city == 0) {
      this.global.showToast('Fill the Address Details', 1000, 'top');
    } else {
      this.profileservice.editRecordService(models).then(resp => {
        this.global.showToast('Profile Updated Succesfully', 1000, 'top');
        this.profileView = true;
        this.profile = false;
        this.Address = false;
        this.Identification = false;
        this.Insurance = false;
        // this.ngOnInit();
        // this.navCtrl.setRoot(ProfilePage);
      });
    }
  }

  onInsurance(form: any) {
    this.loginUser = this.loginUser;
    var datePipe = new DatePipe('en-US');
    this.loginUser.userInsuranceDateOfIssue = datePipe.transform(form.userInsuranceDateOfIssue, 'dd-MM-yyyy')
    this.loginUser.userInsuranceDateOfExp = datePipe.transform(form.userInsuranceDateOfExp, 'dd-MM-yyyy');
    let model = {};
    model['username'] = this.loginUser.userName;
    model['password'] = this.loginUser.password;
    model['dob'] = this.loginUser.userDob;
    model['age'] = this.loginUser.userAge;
    model['userMonth'] = this.loginUser.userMonth;
    model['userDay'] = this.loginUser.userDay;
    model['email'] = this.loginUser.userEmail;
    if (this.loginUser.userGenderId != null) {
      model['gender'] = this.loginUser.userGenderId.genderId;
    }
    model['mobileno'] = this.loginUser.userMobile;
    model['address'] = this.loginUser.userAddress;
    if (this.loginUser.userCityId != null) {
      model['city'] = this.loginUser.userCityId.cityId;
    }
    if (this.loginUser.userBloodgroupId != null) {
      model['bloodgroup'] = this.loginUser.userBloodgroupId.bloodgroupId;
    }
    model['pincode'] = this.loginUser.userPincode;
    model['firstName'] = this.loginUser.userFirstname;
    model['lastName'] = this.loginUser.userLastname;
    if (this.loginUser.userTitleId != null) {
      model['titleId'] = this.loginUser.userTitleId.titleId;
    }
    model['isRegByApi'] = this.loginUser.isRegByApi;
    model['uploadfile'] = '1';
    model['userIdDocFp'] = this.loginUser.userIdDocFp;
    model['userInsuranceCardNo'] = form.userInsuranceCardNo;
    if (form.userInsuranceCardFp == false) {
      model['userInsuranceCardFp'] = this.loginUser.userInsuranceCardFp;
    } else {
      model['userInsuranceCardFp'] = form.userInsuranceCardFp;
    }
    model['userInsuranceDateOfIssue'] = this.loginUser.userInsuranceDateOfIssue;
    model['userInsuranceDateOfExp'] = this.loginUser.userInsuranceDateOfExp;
    model['userUid'] = this.loginUser.userUid;

    if (this.loginUser.userNationalityId != null) {
      model['userNationalityId'] = this.loginUser.userNationalityId.nationalityId;
    }
    model['userId'] = this.loginUser.userId;
    if (this.loginUser.userInsuranceId != null || this.loginUser.userInsuranceId != undefined) {
      model['userInsuranceId'] = this.loginUser.userInsuranceId.companyId;
    } else {
      model['userInsuranceId'] = form.userInsuranceId;
    }
    if (this.loginUser.userInsuranceId == undefined || this.loginUser.userInsuranceId == null || this.loginUser.userInsuranceId === '') {
      model['insurancePatient'] = false;
    } else {
      model['insurancePatient'] = true;
    }
    if (form.city == 0) {
      this.global.showToast('Fill the Address Details', 1000, 'top');
    } else {
      this.profileservice.editRecordService(model).then(resp => {
        this.global.showToast('Profile Updated Succesfully', 1000, 'top');
        this.profile = true;
        this.Address = false;
        this.Identification = false;
        this.Insurance = false;
        this.ngOnInit();
      });
    }

  }

  validMob(mobNo: any) {
    console.log("mobile.elngth", mobNo.length);
    if (mobNo.length != this.mobileLength) {
      this.global.showToastwaring('Please Enter Valid Mobile Number', 1000, 'top');
      this.registration_new.controls['mobileno'].setValue('');
    }
  }

  onRegisterRecord(form) {
    this.loginUser = this.loginUser;
    console.log("this.loginUser", this.loginUser);
    console.log("form", form);
    let model = {};
    model['userId'] = this.loginUser.userId;
    model['password'] = this.loginUser1.password;
    model['userName'] = this.loginUser1.userName;
    if (this.selectedCityName != null && this.selectedCityName != '' && this.selectedCityName != undefined) {
      model['userCityId'] = this.selectedCityName;
    } else {
      model['userCityId'] = this.loginUser.userCityId
    }
    if (this.loginUser.userCityId != null && this.loginUser.userCityId != '' && this.loginUser.userCityId != undefined) {
      model['userCityId'] = this.loginUser.userCityId
    } else {
      model['userCityId'] = this.selectedCityName;
    }
    if (form.firstName != null && form.firstName != '' && form.firstName != undefined) {
      model['userFirstname'] = form.firstName
    } else {
      model['userFirstname'] = this.loginUser.userFirstname
    }
    if (form.lastName != null && form.lastName != '' && form.lastName != undefined) {
      model['userLastname'] = form.lastName
    } else {
      model['userLastname'] = this.loginUser.userLastname
    }
    if (form.titleId != null && form.titleId != '' && form.titleId != undefined) {
      model['userTitleId'] = {'titleId': form.titleId}
    } else {
      model['userTitleId'] = this.loginUser.userTitleId
    }
    if (form.dob != null && form.dob != '' && form.dob != undefined) {
      model['userDob'] = form.dob
    } else {
      model['userDob'] = this.loginUser.userDob
    }
    if (form.age != null && form.age != '' && form.age != undefined) {
      model['userAge'] = form.age
    } else {
      model['userAge'] = this.loginUser.userAge
    }
    if (form.gender != null && form.gender != '' && form.gender != undefined) {
      model['userGenderId'] = {'genderId': form.gender}
    } else {
      model['userGenderId'] = this.loginUser.userGenderId
    }
    if (form.mobileno != null && form.mobileno != '' && form.mobileno != undefined) {
      model['userMobile'] = form.mobileno
    } else {
      model['userMobile'] = this.loginUser.userMobile
    }
    if (form.email != null && form.email != '' && form.email != undefined) {
      model['userEmail'] = form.email
    } else {
      model['userEmail'] = this.loginUser.userEmail
    }
    if (form.state != null && form.state != '' && form.state != undefined) {
      model['state'] = form.state
    } else {
      model['state'] = this.loginUser.state
    }
    if (form.area != null && form.area != '' && form.area != undefined) {
      model['area'] = form.area
    } else {
      model['area'] = this.loginUser.area
    }
    // if(form.city != null && form.city != '' && form.city != undefined){model['userCityId'] = form.cityId}else{model['userCityId'] = this.loginUser.cityId}

    // let city = this.selectedCityName[0];

    if (form.userNationalityId != null && form.userNationalityId != '' && form.userNationalityId != undefined) {
      model['userNationalityId'] = {'nationalityId': form.userNationalityId};
    }
    if (form.userUid != null && form.userUid != '' && form.userUid != undefined) {
      model['userUid'] = form.userUid;
    }
    if (form.userIdDocFp != null && form.userIdDocFp != '' && form.userIdDocFp != undefined) {
      model['userIdDocFp'] = form.userIdDocFp;
    }


    this.profileservice.updatePatient_(model).then(resp => {
      this.global.showToast('Profile Updated Succesfully', 1000, 'top');
      // this.profileView = true;
      this.profile = true;
      this.Address = false;
      this.Identification = false;
      this.Insurance = false;
      this.profileservice.getProfile(this.loginUser.userId).then(data => {
        localStorage.setItem('userDetails', JSON.stringify(data));
      });
      // this.ngOnInit();
      this.router.navigateByUrl('/home')

    });

    // this.viewProfile(false);
  }

  checkImage(type) {
    if (type == 'image/x-png' || type == 'image/jpeg' || type == 'image/png') {
      return true;
    } else {
      return false;
    }
  }

  onRegisterRecord_(registrationData) {

    this.registration.reset();
    this.loadingCtrl.create({
      message: 'Please wait...'
    }).then((response) => {
      response.present();
    });

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
    if (registrationData.state == null) {
      registrationData.state = 3798;
    }
    if (registrationData.area == null) {
      registrationData.area = 1;
    }
    if (registrationData.titleId == null) {
      registrationData.titleId = 1;
    }
    if (registrationData.gender == null) {
      registrationData.gender = 1;
    }
    if (registrationData.uploadfile == null) {
      registrationData.uploadfile = 0;
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
          this.loadingCtrl.dismiss();
          this.global.showToast('Register Successfull !', 1000, 'top');
          this.router.navigateByUrl('/login');
          if (this.responseStatus.SMS_API_disabled === 3) {
            this.loadingCtrl.dismiss();
            this.global.showToastwaring('Username is ' + this.responseStatus.username + ' ' + 'and Password is ' + this.responseStatus.password, 10000, 'top');

          }
        } else {
          this.loadingCtrl.dismiss();
          this.global.showToastwaring('Please Fill the Form !', 1000, 'top');
        }
      });
    } else {
      this.loadingCtrl.dismiss();
      this.mobileotpsend = false;
      this.mobilevalid = false;
      this.global.showToastwaring('Please Enter Valid OTP !', 1000, 'top');
    }
  }

}
