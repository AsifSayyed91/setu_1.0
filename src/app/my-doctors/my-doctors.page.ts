import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import {DatePipe} from "@angular/common";
import {Global} from "../globalpath";
import {NavController, NavParams} from "@ionic/angular";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";
import {PaginationInstance} from "ngx-pagination";

@Component({
  selector: 'app-my-doctors',
  templateUrl: './my-doctors.page.html',
  styleUrls: ['./my-doctors.page.scss'],
})
export class MyDoctorsPage implements OnInit {

  appointmentlist: Array<any> = [];
  pagination: boolean = false;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  };
  today;
  patientId;
  AppointmentId;
  url;
  fromdate;
  todate;
  userDetails: any;
  patientimagepath = this.global.paientImgPath;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public appointmentService: AppointmentlistService,
              public global: Global) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyDoctorsPage');
  }

  ngOnInit() {
    var datePipe = new DatePipe('en-US');
    var date = new Date();
    this.today = datePipe.transform(date, 'yyyy-MM-dd');
    console.log("this.today", this.today)
    this.userDetails = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.getPage(1, this.today, this.today);
  }

  getPage(page, fromdate, todate){
    this.appointmentService.appointmenListByUserIdList(this.userDetails.userId, page, this.config.itemsPerPage, '', '', this.fromdate, this.todate).subscribe(data => {
      /*console.log('appointmenListByUserIdList', data);*/
      if (data.length >= 1) {
        this.pagination = true;
        this.appointmentlist = data;
        console.log("appointmenListByUserIdList => " , data);
        this.config.currentPage = page;
        this.config.totalItems = this.appointmentlist[0].count;
      } else {
        this.pagination = true;
      }
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }

}
