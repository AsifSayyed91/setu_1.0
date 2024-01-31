import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Global} from "../globalpath";
import {ChangePasswordService} from "../changepassword/change-password.service";
import {NavController, NavParams, ToastController} from "@ionic/angular";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  changePassForm: FormGroup;
  password = false;
  loginUser: any;
  username: string = "";

  constructor(public navCtrl: NavController,
              public global: Global,
              public changePasswordService: ChangePasswordService,
              public fb: FormBuilder,
              public navParams: NavParams,
              public toast: ToastController,
              public storage: Storage) {
    this.changePassForm = fb.group({
      'old_pass': [null, Validators.required],
      'new_pass': [null, Validators.required],
      'conf_pass': [null, Validators.required],
      'username': [null]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.username = this.loginUser.userName;
    this.changePassForm.get('username')?.setValue(this.username);
  }

  resetAll() {
    this.changePassForm.reset();
  }

  ChangePassword(form) {
    this.changePasswordService.changePassword1(form).then((resp: any) => {
      console.log('resp : ' + JSON.stringify(resp));
      if (resp.status == 'true') {
        this.global.showToast('Password Changed Sucessfully', 1000, 'top');
        this.changePassForm.reset();
        localStorage.clear();
        this.navCtrl.navigateRoot('/login');
      } else {
        this.global.showToasterror('Please Enter Correct Password', 1000, 'top');
      }
    });
  }
}
