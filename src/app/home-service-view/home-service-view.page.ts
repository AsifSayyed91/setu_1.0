import { Component, OnInit } from '@angular/core';
import {HomeHealthService} from "../home-health/home-health.service";
import {Global} from "../globalpath";
import {ModalController, NavController, NavParams} from "@ionic/angular";
import {PaginationInstance} from "ngx-pagination";

@Component({
  selector: 'app-home-service-view',
  templateUrl: './home-service-view.page.html',
  styleUrls: ['./home-service-view.page.scss'],
})
export class HomeServiceViewPage implements OnInit {

  homeHealthServiceId;
  queryList = [];
  queriesReciept: Array<any> = [];
  queriesReciepts: Array<any> = [];
  patientId;
  pagination: boolean = false;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  };

  constructor(public navCtrl: NavController,
              public global: Global,
              public  homeHealthService: HomeHealthService,
              public  viewCtrl: ModalController,
              public navParams: NavParams,
              public modalController: ModalController) {
    this.homeHealthServiceId = this.navParams.get('homeHealthServiceId');
    console.log("this.homeHealthServiceId", this.homeHealthServiceId)

  }


  ngOnInit() {
    this.homeHealthService.getQueryListById(this.homeHealthServiceId).then(data => {
      this.queriesReciept = data.content;
      this.queriesReciepts = data[0];
      console.log('homeHealthServiceId => ', this.homeHealthServiceId);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeHealthServiceViewPage');
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }


}
