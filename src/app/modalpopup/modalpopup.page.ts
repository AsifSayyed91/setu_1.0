import { Component, OnInit } from '@angular/core';
import {ModalController, NavController, NavParams} from "@ionic/angular";

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.page.html',
  styleUrls: ['./modalpopup.page.scss'],
})
export class ModalpopupPage implements OnInit {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public  viewCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalpopupPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ngOnInit(): void {
  }


}
