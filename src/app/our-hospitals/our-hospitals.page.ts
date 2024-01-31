import { Component, OnInit } from '@angular/core';
import {PopoverPage} from "../popover/popover.page";
import {Global} from "../globalpath";
import {NavController, NavParams, PopoverController} from "@ionic/angular";
import {RegisterService} from "../account-register/account.service";

@Component({
  selector: 'app-our-hospitals',
  templateUrl: './our-hospitals.page.html',
  styleUrls: ['./our-hospitals.page.scss'],
})
export class OurHospitalsPage implements OnInit {
  patientimagepath = this.global.paientImgPath;
  mstUnitList: Array<any> = [];
  hospital;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public  registerService : RegisterService,
              public global: Global,
              public popoverCtrl: PopoverController,) {
    this.hospital = this.navParams.get('partnerTypeHospital');
    console.log("hospital => " , this.hospital);
  }

  ngOnInit(): void {
    this.registerService.getUnitList('1', '', '', '', '').then(resp => {
      this.mstUnitList = resp.content;
      console.log("this.mstUnitList ", this.mstUnitList)
    });
  }


  async popoverMenu(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: event,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }

}
