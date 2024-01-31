import { Component, OnInit } from '@angular/core';
import {Global} from "../globalpath";
import {MyComplaintsService} from "../my-complaints/my-complaints.service";
import {ModalController, NavController, NavParams} from "@ionic/angular";
import {PaginationInstance} from "ngx-pagination";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-complaints-view',
  templateUrl: './my-complaints-view.page.html',
  styleUrls: ['./my-complaints-view.page.scss'],
})
export class MyComplaintsViewPage implements OnInit {
  myComplaintsId;
  complaintsList = [];
  complaintsReciept: Array<any> = [];
  complaintsReceipts: Array<any> = [];
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
              public  myComplaintsService: MyComplaintsService,
              public  viewCtrl: ModalController,
              public navParams: NavParams,
              private router: Router,
              public modalController: ModalController) {
    this.myComplaintsId = this.router.getCurrentNavigation()?.extras?.state;
    console.log("this.myComplaintsId", this.myComplaintsId)

  }


  ngOnInit() {
    this.myComplaintsService.getComplaitsListById(this.myComplaintsId).then(data => {
      this.complaintsList = data.content;
      this.complaintsReceipts = data[0];
      console.log('myComplaintsId => ', this.myComplaintsId);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyComplaintsViewPage');
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

}
