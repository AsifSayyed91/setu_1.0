import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RatingService} from "../rating/rating.service";
import {ModalController, NavController, NavParams} from "@ionic/angular";
import {MyConsultationviewPage} from "../my-consultationview/my-consultationview.page";
import {Router} from "@angular/router";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage implements OnInit {
  data: any = null;
  userId;
  staffId;
  appointmentId;
  rating: any;
  timelineId;
  ratingForm: FormGroup;
  totalReviews;

  constructor(public fb: FormBuilder,
              public modalCtrl: ModalController,
              public ratingService: RatingService,
              public navCtrl: NavController,
              private router: Router,
              public viewCtrl: ModalController,
              public navParams: NavParams) {
    this.data = this.router.getCurrentNavigation()?.extras?.state;
    this.userId = this.data.userId;
    this.staffId = this.data.staffId;
    this.appointmentId = this.data.appointmentId;
    this.timelineId = this.data.timelineId;
    this.totalReviews = this.data.Review;
    console.log("totalReviews", this.totalReviews);
    this.ratingForm = fb.group({
      'drUserId': [this.userId],
      'drStaffId': [this.staffId],
      'dRating': [null],
      'drRemark': [null],
      'appointmentId': [this.appointmentId]
    })
  }

  ngOnInit() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatingPage');
  }

  logRatingChange(ev) {
    this.ratingForm.get('dRating')?.setValue(ev);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

async  cancel() {
    this.viewCtrl.dismiss();
    let medication_view = await this.modalCtrl.create({
      component: MyConsultationviewPage,
      componentProps: {
        timelineId: this.timelineId
      },

});
  this.navCtrl.navigateForward('/my-consultationview');

  medication_view.present();
  }


  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: MyConsultationviewPage,
      handle: false,
      componentProps: {
        timelineId: this.timelineId
      },
    });
    await modal.present();
  }


  rate(newRating: number) {
    // Handle the rating change logic here
    this.rating = newRating;
    this.ratingForm.get('dRating')?.setValue(newRating);
    this.navCtrl.navigateForward('/my-consultationview');
    // this.navCtrl.navigateForward([ '/my-consultationview/', timelineId]);
  }



 // async Rating(model: any) {
 //    let obj = {};
 //    obj['dRating'] = model.dRating;
 //
 //    let staffId = {};
 //    staffId['staffId'] = model.drStaffId;
 //    obj['drStaffId'] = staffId;
 //
 //    let userId = {};
 //    userId['userId'] = model.drUserId;
 //    obj['drUserId'] = userId;
 //
 //    obj['drRemark'] = model.drRemark;
 //    obj['appointmentId'] = model.appointmentId;
 //
 //    this.ratingService.ratingadd(obj).subscribe(data => {
 //      console.log("rating added", data);
 //      if (data.msg == 'Added Successfully') {
 //         this.viewCtrl.dismiss();
 //         // this.presentModal();
 //       //  this.navCtrl.navigateForward('/my-consultationview');
 //      } else {
 //
 //      }
 //    })
 //
 //  }

  async Rating(model: any) {
    let obj = {};
    obj['dRating'] = model.dRating;

    let staffId = {};
    staffId['staffId'] = model.drStaffId;
    obj['drStaffId'] = staffId;

    let userId = {};
    userId['userId'] = model.drUserId;
    obj['drUserId'] = userId;

    obj['drRemark'] = model.drRemark;
    obj['appointmentId'] = model.appointmentId;

    try {
      const data = await this.ratingService.ratingadd(obj).toPromise();
      console.log("rating added", data);
      if (data.msg == 'Added Successfully') {
        this.viewCtrl.dismiss();
        this.presentModal();
        this.navCtrl.navigateForward('/my-consultationview');
      } else {
        // Handle other cases
      }
    } catch (error) {
      // Handle any errors that occur during the HTTP request
      console.error("Error adding rating", error);
    }
  }

}
