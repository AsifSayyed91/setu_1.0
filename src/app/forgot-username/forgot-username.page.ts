import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Global} from "../globalpath";
import {NavController} from "@ionic/angular";
import {RegisterService} from "../account-register/account.service";

@Component({
  selector: 'app-forgot-username',
  templateUrl: './forgot-username.page.html',
  styleUrls: ['./forgot-username.page.scss'],
})
export class ForgotUsernamePage implements OnInit {
  forgotForm: FormGroup;
  password = false;
  userOtp = false;
  userId: any;
  submit = false;
  resentopt = false;
  timeOut = false;
  showTimer = false;
  response: any;
  OTP: any;
  maldives = this.globals.Maldives;
  mobilevalid: boolean = false;
  mobileotpsend: boolean = false;
  mobileCode = this.globals.mobileCode;
  mobileLength: any = 10;
  footer = this.globals.footer;

  constructor(public fb: FormBuilder,
              public global: Global,
              public navCtrl: NavController,
              public globals: Global,
              public registerService: RegisterService) {
    this.forgotForm = fb.group({
      'useremail': [null],
      'userUid': [null],
      'usermobile': [null, Validators.required],
      'userOtp': [null, Validators.required],
      'mobilecode': [null],
    });
  }


  ngOnInit() :void{
  }

  onForgots(forgotData) {
    this.forgotForm.reset();
    if (this.OTP == forgotData.userOtp) {
      forgotData.userId = this.userId;
      this.registerService.sendUsernameSMS(forgotData).subscribe((data: {}) => {
        this.response = data;
        console.log("Data", data);
        if (this.response.status == 1) {
          if (this.response.SMS_API_disabled == 3) {
            alert('Username is ' + this.response.username);
          }
          this.globals.showToast('Username is sent to your mobile number.', 1000, 'top');
          this.navCtrl.navigateRoot('/login');
        }
      });
    } else {
      this.globals.showToastwaring('Incorrect OTP!.', 1000, 'top');
    }
  }

  CheckMobileLength(ev) {
    if (this.maldives == true) {
      if (ev.target.value.length >= 7) {
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

  Generateotps(forgotData) {
    forgotData.mobilecode = this.mobileCode;
    this.registerService.forgotUsernameOTP(forgotData).subscribe((data: {}) => {
      this.response = data;
      console.log(this.response.status == 0);
      if (this.response.status == 0) {
        this.globals.showToastwaring('Mobile No not Found !.', 1000, 'top');
      } else {
        this.globals.showToast('Otp Send to Mobile No', 1000, 'top');
        this.OTP = this.response.OTP;
        this.userId = this.response.user.userId;
        this.password = true;
        this.resentopt = true;
        this.mobileotpsend = true;
        this.mobilevalid = false;
        this.timeOut = false;
        this.showTimer = true;
        if (this.response.SMS_API_disabled === 3) {
          alert('OTP is ' + this.response.OTP);
        }
      }
    });
  }

  inputFilter(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  login() {
    this.navCtrl.navigateRoot('/login');
  }
}
