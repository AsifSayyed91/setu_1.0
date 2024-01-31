import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Global} from "../globalpath";
import {LoginService} from "../login/login.service";
import {ForgotPasswordPage} from "../forgot-password/forgot-password.page";
import {LoadingController, NavController, Platform} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public type = 'password';
  public showPass = false;
  showFooter: boolean = true;
  loginForm: FormGroup;
  response;
  footer = this.global.footer;
  healthspring = this.global.Healthspring;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public fb: FormBuilder,
              public global: Global,
              public loginService: LoginService,
              public platform: Platform,
              private router: Router,
              ) {
    // this.initializeApp();
    this.loginForm = fb.group({
      'username': [null],
      'password': [null],
    });
  }

  ngOnInit(): void {
  }
  // initializeApp(): void {
  //   this.networkservice.initializeNetworkEvents();
  //   this.networkservice.getNetworkStatus().subscribe(data => {
  //     if (data == 0 || data == null) {
  //       // this.global.showToast('Please Check Internet Connection',2000,'bottom');
  //     } else if (data == 1) {
  //       this.global.showToastwaring('Please Check Internet Connection', 2000, 'bottom');
  //       console.log("Offline")
  //     }
  //   });
  // }

  onLogin(loginData) {
    localStorage.clear();
    localStorage.removeItem("userDetails");
    this.loadingCtrl.create({
      message: 'Please wait...'
    }).then((response) => {
      response.present();
    });
    this.loginService.login(loginData).subscribe((data: {}) => {
      this.response = data;
      console.log(this.response.status == 0);
      if (this.response.status == 0) {
        this.loadingCtrl.dismiss();
        this.global.showToasts('Login Failed !', 1000, 'top');
      } else {
        localStorage.setItem('userDetails', JSON.stringify(this.response.user));
        if (this.response.user.userImage != undefined) {
          localStorage.setItem('profileuserImage', JSON.stringify(this.response.user.userImage));
        }
        this.loadingCtrl.dismiss();
        this.global.showToast('Login Successfully !', 1000, 'top');
        this.router.navigateByUrl('/home');

      }
    });
  }

  showPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  forgotPassword() {
    this.navCtrl.navigateRoot('/forgot-password');
  }

  forgotUser() {
    this.navCtrl.navigateRoot('/forgot-username');
  }

  Register() {
    this.navCtrl.navigateRoot('/account-register-new');
  }

}
