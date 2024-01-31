import { Component, OnInit } from '@angular/core';
import {ModalController, NavController, NavParams, PopoverController} from "@ionic/angular";
import {Router} from "@angular/router";
import {EventsService} from "../services/events.service";

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {
  constructor(public navCtrl: NavController,
              public events: EventsService,
              public cache: Storage,
              private router: Router,
              public navParams: NavParams,
              public viewCtrl: ModalController,
              public popoverCtrl: PopoverController) {
    this.events.subscribe('user:created', (data: any) => {
      console.log('Welcome', data.user, 'at', data.time);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  Changepassword() {
    this.viewCtrl.dismiss();
    this.router.navigateByUrl('/changepassword');
    // this.appCtrl.getRootNavs()[0].push(ChangepasswordPage);
  }

  Profile() {
    this.viewCtrl.dismiss();
    this.router.navigateByUrl('/profile');
    // this.appCtrl.getRootNavs()[0].push(ProfilePage);
  }

  Logout() {
    this.cache.clear();
    localStorage.removeItem("userDetails");
    localStorage.clear();
    this.viewCtrl.dismiss();
    this.router.navigateByUrl('/login');
    // this.appCtrl.getRootNav().setRoot(LoginPage);
  }

  ngOnInit(): void {
  }
}
