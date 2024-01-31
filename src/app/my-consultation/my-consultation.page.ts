import { Component, OnInit } from '@angular/core';
import {PopoverPage} from "../popover/popover.page";
import {MyPrescriptionService} from "../my-prescription/my-prescription.service";
import {Global} from "../globalpath";
import {RatingService} from "../rating/rating.service";
import {ModalController, NavController, NavParams, PopoverController} from "@ionic/angular";
import {PaginationInstance} from "ngx-pagination";

@Component({
  selector: 'app-my-consultation',
  templateUrl: './my-consultation.page.html',
  styleUrls: ['./my-consultation.page.scss'],
})
export class MyConsultationPage implements OnInit {
  appointmentlist = [];
  loginUser;
  pagination: boolean = false;
  totalReviews;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  };

  constructor(public navCtrl: NavController,
              private ratingService: RatingService,
              public modalCtrl: ModalController,
              public global: Global,
              public myPrescriptionService: MyPrescriptionService,
              public navParams: NavParams,
              public popoverCtrl: PopoverController) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MyConsultationPage');
  }

  async popoverMenu(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: event,
    });
    return await popover.present();
  }


  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }

  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.getPage(1);
  }


  // openCaseReport(timelineId: any, userId: any, staffId: any, appointmentId: any, id: any) {
  //   if (id == true) {
  //     // let medication_view = this.modalCtrl.create(MyConsultationviewPage, {timelineId: timelineId});
  //     // medication_view.present();
  //
  //
  //   } else if (id == false) {
  //     this.ratingService.ratingGet(staffId).then(data => {
  //       this.totalReviews = data; this.navCtrl.navigateForward('/my-consultationview', {
  //         state: {
  //           timelineId: timelineId
  //         }});
  //       // let m_view = this.modalCtrl.create(RatingPage, {
  //       this.navCtrl.navigateForward('/rating',  {state: {
  //         timelineId: timelineId,
  //         userId: userId,
  //         staffId: staffId,
  //         appointmentId: appointmentId,
  //         Review: this.totalReviews
  //       }});
  //       // m_view.present();
  //     })
  //   }
  // }

  openCaseReport(timelineId: any, userId: any, staffId: any, appointmentId: any, id: any) {
    if (id == true) {
      this.navCtrl.navigateForward('/my-consultationview', {
        state: {
          timelineId: timelineId,

        }
      });
      // this.navCtrl.navigateForward('/my-consultationview')

    } else if (id == false) {
      this.ratingService.ratingGet(staffId).then(data => {
        this.totalReviews = data;
        this.navCtrl.navigateForward('/rating', {
          state: {
            timelineId: timelineId,
            userId: userId,
            staffId: staffId,
            appointmentId: appointmentId,
            Review: this.totalReviews
          }
        });
      });
    }
  }


  getPage(page) {
    this.config.currentPage = page;
    this.myPrescriptionService.closedAppointmenListByUserId(this.loginUser.userId, page, this.config.itemsPerPage, '', '').subscribe(data => {
      if (data.length >= 1) {
        this.pagination = true;
        this.appointmentlist = data;
        console.log("this.appointmentlist", this.appointmentlist);
        this.config.currentPage = page;
        this.config.totalItems = this.appointmentlist[0].count;
      } else {
        this.pagination = true;
      }
    });
  }

  logRatingChange(ev) {
    console.log("rating change", ev)
  }
}
