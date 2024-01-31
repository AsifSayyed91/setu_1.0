// import { Component, OnInit } from '@angular/core';
// import {LoginPage} from "../login/login.page";
// import {FormBuilder, FormGroup, Validators} from "@angular/forms";
// import {AlertController, LoadingController, NavController, NavParams} from "@ionic/angular";
// import {Global} from "../globalpath";
// import {RegisterService} from "../account-register/account.service";
//
// @Component({
//   selector: 'app-account-register-otp',
//   templateUrl: './account-register-otp.page.html',
//   styleUrls: ['./account-register-otp.page.scss'],
// })
// export class AccountRegisterOtpPage  {
//   //
//   // myForm: FormGroup;
//   registrationOtp: FormGroup;
//   mstcountry: any = {};
//   mobileLength = this.globals.mobileLength;
//   cityListForDubai: Array<any> = [];
//
//   mobileNoPlaceHolder: any = '';
//   countrylist = [];
//
//   checkshow = false;
//   ISDCode:any;
//   mobilevalid: boolean = false;
//   mobileotpsend: boolean = false;
//   // cityListForDubai: Array<any> = [];
//   areaListByState: Array<any> = [];
//   responseStatus: any;
//   counter = 601; //20;
//   showTimer: boolean = false;
//   timeOut: boolean = false;
//   generatedOTP: any;
//   userMobileNo: any;
//   mobileOTP: any;
//   demoOTP: any;
//   emailPattern = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
//   maldives = this.globals.Maldives;
//   mobileCode = this.globals.mobileCode;
//   nationalityList: Array<any> = [];
//   nationalityName: any = 'Nationality ID No';
//   footer = this.globals.footer;
//   mstCountry: any = {};
//   dubaiCode = 971;
//   disabledSendOtp = true;
//   statelist: Array<any> = [];
//   citylist : Array<any>= [];
//   areaList: Array<any> = [];
//   constructor(public navCtrl: NavController,
//               public loadingCtrl: LoadingController,
//               public registerService: RegisterService,
//               public fb: FormBuilder,
//               public alertCtrl: AlertController,
//               private globals: Global,
//               public navParams: NavParams) {
//     this.registrationOtp= this.fb.group({
//       'firstName': [null, Validators.required],
//       'lastName': [null, Validators.required],
//       'userMobileCode': [null, Validators.required],
//       'mobileno': [null, Validators.required],
//       'email': [null, Validators.required],
//       'mobileotp': [null]
//     });
//   }
//
//   ionViewDidLoad() {
//     console.log('ionViewDidLoad AccountRegisterOtpPage');
//   }
//
//   inputFilter(event: any) {
//     const pattern = /^[a-zA-Z\s]*$/;
//     let inputChar = String.fromCharCode(event.charCode);
//     if (!pattern.test(inputChar)) {
//       // invalid character, prevent input
//       event.preventDefault();
//     }
//   }
//
//   getMobNoLength(date: any) {
//     console.log('length ', this.mstcountry.countryIsdCodeMLen);
//     this.mstcountry = this.countrylist.filter(item => item.countryIsdCode == date)[0];
//     this.mobileLength = this.mstcountry.countryIsdCodeMLen;
//     this.mobileNoPlaceHolder = 'Enter ' + this.mobileLength + ' Digit Mobile No';
//     console.log('this.mstcountry ', this.mstcountry);
//   }
//
//   checkMail()
//   {
//     this.registerService.getRecordServiceByemailid(this.registrationOtp.get('email')?.value).then(resp => {
//       if (resp.length > 0) {
//         let alert =  this.alertCtrl.create({
//           message: 'You already have a Portal account, please login to continue. ', buttons: [{
//             text: 'Yes', handler: () => {
//               // alert.dismiss(true);
//               this.navCtrl.navigateRoot('LoginPage');
//               return false;
//             }
//           }, {
//             text: 'No', handler: () => {
//               // alert.dismiss(false);
//               this.registrationOtp.get('email')?.setValue('');
//               return false;
//             }
//           }]
//         });
//         alert.present();
//         alert.onDidDismiss((data) => {
//           if (data == true) {
//             this.navCtrl.navigateRoot('LoginPage');
//           }
//         });
//       } else {
//         console.log('false ');
//       }
//     });
//     return this.registrationOtp.get('email');
//   }
//
//   validMob(mobNo: any) {
//     console.log("mobile.elngth", mobNo.length);
//     if (mobNo.length != this.mobileLength) {
//       this.globals.showToastwaring('Please Enter Valid Mobile Number', 1000, 'top');
//       this.registrationOtp.controls['mobileno'].setValue('');
//     }
//   }
//
//   CheckMobileLength(ev) {
//     if (ev.key == '+') {
//       console.log("fdsfg");
//       this.registrationOtp.get('mobileno')?.setValue('');
//     } else {
//       if (ev.target.value.length >= this.mobileLength) {
//         if (this.mobileLength == this.mobileLength) {
//           this.registerService.checkExistByMobileNo(ev.target.value).subscribe(resp => {
//             if (resp[0].isMobileNoExist == 1) {
//               this.globals.showToastwaring('Patient Already Registered with this Mobile No.', 1000, 'top');
//               this.registrationOtp.get('mobileno')?.setValue('');
//             } else {
//               this.registrationOtp.get('mobileno')?.setValue(ev.target.value.substring(0, this.mobileLength));
//             }
//           });
//         } else {
//           this.registrationOtp.get('mobileno')?.setValue('');
//         }
//       } else {
//       }
//       if (ev.target.value.length >= this.mobileLength) {
//         this.mobilevalid = true;
//         this.mobileotpsend = false;
//       } else {
//         this.mobilevalid = false;
//         this.mobileotpsend = false;
//       }
//     }
//   }
//
//   sendOtp(model: any) {
//     this.mobilevalid = false;
//     this.mobileotpsend = true;
//     this.timeOut = false;
//     this.counter = 601;
//     if (model.mobileno != null) {
//       this.showTimer = true;
//       model.mobileno = this.mobileCode + model.mobileno;
//       // model.mobileno = '+'+this.ISDCode + model.mobileno;
//       this.registerService.validateMobileNumber(model).subscribe(resp => {
//         this.generatedOTP = resp.OTP;
//         this.userMobileNo = resp.MobileNo;
//         this.mobileOTP = resp.OTP;
//         if (!model.userMobileCode.toLocaleLowerCase().includes("971")) {
//           this.globals.showToast('OTP Sent to email Successfull !', 1000, 'top');
//         } else {
//           this.globals.showToast('OTP Sent to mobile no and on email!', 1000, 'top');
//         }
//         if (resp.SMS_API_disabled === 3) {
//           this.demoOTP = resp.OTP;
//           this.globals.showToast('OTP is set for demo purpose', 1000, 'top');
//         }
//       });
//     } else {
//       this.globals.showToasterror('Please Enter Valid Mobile Number!', 1000, 'top');
//     }
//   }
//
//   itemSelected(ev) {
//     console.log(ev.target.value);
//     let selectedCity = this.cityListForDubai.filter(function(item){return item.cityId == 3798});
//
//     // let selectedCity = this.cityListForDubai.filter(function(item){
//     //   return item.stateId == ev.target.value;
//     // });
//     ev = selectedCity[0];
//     console.log(selectedCity);
//     console.log(ev);
//     this.mstCountry = ev.stateCountryId;
//     // this.onSelect(this.searchbar.getValue())
//     // console.log(this.searchbar.getValue());
//     /*  this.getAreaByCityFilter(ev.cityId);*/
//     this.ISDCode = ev.stateCountryId.countryIsdCode;
//   }
//
//   resendotp(model: any) {
//     if (model.mobileno != null) {
//       this.showTimer = true;
//       model.mobileno = model.mobileCode + model.mobileno;
//       // model.mobileno = this.ISDCode + model.mobileno;
//       this.registerService.validateMobileNumber(model).subscribe(resp => {
//         this.generatedOTP = resp.OTP;
//         this.userMobileNo = resp.MobileNo;
//         this.mobileOTP = resp.OTP;
//         this.globals.showToast('OTP Sent Successfull!', 1000, 'top');
//         if (resp.SMS_API_disabled === 3) {
//           this.demoOTP = resp.OTP;
//           this.globals.showToast('OTP is set for demo purpose', 1000, 'top');
//         }
//
//       });
//     } else {
//       this.globals.showToasterror('Please Enter Valid Mobile Number!', 1000, 'top');
//     }
//   }
//
//   onRegisterRecord(registrationData) {
//
//     this.registrationOtp.reset();
//     let loading = this.loadingCtrl.create({
//       message: 'Please wait...'
//     });
//     registrationData.mobileno = this.mobileCode + registrationData.mobileno;
//     if (this.mobileOTP == registrationData.mobileotp) {
//       // this.registerService.registerPatient(registrationData).subscribe((data: {}) => {
//       //   this.responseStatus = data;
//       //   if (this.responseStatus.status == 1) {
//       //     loading.dismiss();
//       //     this.globals.showToast('Register Successfull, Please Check Your Email For Details!', 1000, 'top');
//       //     this.navCtrl.setRoot(LoginPage);
//       //     if (this.responseStatus.SMS_API_disabled === 3) {
//       //       loading.dismiss();
//       //       this.globals.showToastwaring('Username is ' + this.responseStatus.username + ' ' + 'and Password is ' + this.responseStatus.password, 10000, 'top');
//       //
//       //     }
//       //   } else {
//       //     loading.dismiss();
//       //     this.globals.showToastwaring('Please Fill the Form !', 1000, 'top');
//       //   }
//       // });
//     }
//     else {
//       loading.dismiss();
//       this.mobileotpsend = false;
//       this.mobilevalid = false;
//       this.globals.showToastwaring('Please Enter Valid OTP !', 1000, 'top');
//     }
//   }
//
//   onLogin() {
//     this.navCtrl.navigateRoot('LoginPage');
//   }
//
// }
//
//
