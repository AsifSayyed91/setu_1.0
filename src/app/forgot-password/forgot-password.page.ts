import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Global} from "../globalpath";
import {NavController} from "@ionic/angular";
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  forgotForm: FormGroup;
  password = false;
  userOtp = false;
  userId: any;
  submit = false;
  resentopt = false;
  timeOut = false;
  showTimer = false;
  label: String = "";
  tick = 1000;
  response: any;
  OTP: any;
  maldives = this.globals.Maldives;
  mobilevalid: boolean = false;
  mobileotpsend: boolean = false;
  mobileCode = this.globals.mobileCode;
  footer = this.globals.footer;

  constructor(public global: Global, public fb: FormBuilder, public navCtrl: NavController, public loginService: LoginService, private globals: Global) {
    this.forgotForm = fb.group({
      'useremail': [null],
      'username': [null],
      'usermobile': [null],
      'userOtp': [null, Validators.required],
      'newPassword': [null, Validators.required],
      'confirmPassword': [null, Validators.required],
      'mobilecode': [null],
    });
  }

  ngOnInit() {
  }

  onForgot(forgotData) {
    this.forgotForm.reset();
    console.log('forgot password called...!');
    forgotData.userId = this.userId;
    if (forgotData.newPassword == forgotData.confirmPassword) {
      this.loginService.updatePassword(forgotData).subscribe();
      this.globals.showToast('Password Saved Successfully', 1000, 'top');
      this.navCtrl.navigateRoot('/login');

    } else {
      this.globals.showToastwaring('New Password & Confirm Password Not Match!', 1000, 'top');
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

  Generateotp(forgotData) {
    forgotData.mobilecode = this.mobileCode;
    this.loginService.forgotPasswordOTP(forgotData).subscribe((data: {}) => {
      this.response = data;
      console.log('response : ', data);
      if (this.response.status == 0) {
        this.globals.showToastwaring('Incorrect UserName Or Mobile Number !', 1000, 'top');
      } else {
        this.OTP = this.response.OTP;
        this.userId = this.response.user.userId;
        this.password = true;
        this.resentopt = true;
        this.mobileotpsend = true;
        this.mobilevalid = false;
        this.timeOut = false;
        this.showTimer = true;
        if (this.response.SMS_API_disabled === 3) {
          this.globals.showToast('Otp is ' + this.OTP, 1000, 'top');
          this.forgotForm.get('userOtp')?.setValue(this.OTP);
          this.submit = true;
        } else {
          this.globals.showToast('OTP Sent On Email !', 1000, 'top');
        }
      }
    });
  }

  Resentotp(forgotData) {
    if (this.OTP == forgotData.userOtp) {
      this.submit = true;
      this.resentopt = false;
    } else {
      this.globals.showToasterror('Incorrect OTP!', 1000, 'top');
    }
  }

  login() {
    this.navCtrl.navigateRoot('/login');
  }

}
