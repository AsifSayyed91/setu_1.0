import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProfileService} from "../profile/profile.service";
import {Global} from "../globalpath";
import {ModalController, NavController, NavParams} from "@ionic/angular";
import {RegisterService} from "../account-register/account.service";
import {EventsService} from "../services/events.service";

@Component({
  selector: 'app-my-uploadview',
  templateUrl: './my-uploadview.page.html',
  styleUrls: ['./my-uploadview.page.scss'],
})
export class MyUploadviewPage implements OnInit {
  imagepath;
  title;
  login;
  link;
  value;
  flag: boolean = false;
  docpath = this.global.paientImgPath;
  // docpath = this.global.docpath;
  registration!: FormGroup;
  nationalityName: any = 'Nationality ID No';

  constructor(public navCtrl: NavController,
              public cache: Storage,
              public profileservice: ProfileService,
              public registerService: RegisterService,
              public fb: FormBuilder,
              public events: EventsService,
              public viewCtrl: ModalController,
              public navParams: NavParams,
              public global: Global) {
    this.events.subscribe('user:created', (data: any) => {
      console.log('Welcome', data.user, 'at', data.time);
    });

    this.imagepath = this.navParams.get('imagepath');
    console.log("imagepath", this.imagepath);
    this.title = this.navParams.get('name');
    this.login = this.navParams.get('login');
    this.link = this.navParams.get('link');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyUploadviewPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ngOnInit(): void {
  }
}
