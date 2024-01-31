import { Component, OnInit } from '@angular/core';
import {Global} from "../globalpath";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";
import {ModalController, NavController, NavParams} from "@ionic/angular";
import {Router} from "@angular/router";
import {FileuploadformyradiologyPage} from "../fileuploadformyradiology/fileuploadformyradiology.page";

@Component({
  selector: 'app-previleges-card',
  templateUrl: './previleges-card.page.html',
  styleUrls: ['./previleges-card.page.scss'],
})
export class PrevilegesCardPage implements OnInit {

  cardno: any;
  userDetails: any;
  EmiratesId: any;
  appointment: any;
  emirateId: any = '';
  disabled: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public appointmentService: AppointmentlistService,
              public modalCtrl: ModalController,
              public global: Global,
              private router: Router) {
    this.appointment = this.router.getCurrentNavigation()?.extras?.state;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PrevilegesCardPage');
    console.log(this.appointment);
    this.userDetails = JSON.parse(localStorage.getItem('userDetails')|| '{}');

    if (this.userDetails.userNationalityId != undefined) {
      this.EmiratesId = this.userDetails.userUid;
    }
    // if(this.appointment.appointmentUserId.userNationalityId.nationalityId == 1 ) {
    this.emirateId = this.appointment.appointmentUserId.userUid;
    // }
    console.log("this.emirateId " + this.emirateId)
    // this.appointment = this.navCtrl.
  }

  appyPrevilegesCard() {
    console.log("this.cardno", this.cardno, "this.EmiratesId", this.EmiratesId, "this.appointment.appoinmentId", this.appointment.appointmentId);
    this.appointmentService.applyPrevilegesCardDiscount(this.cardno, this.EmiratesId, this.appointment.appointmentId).then(resp => {
      console.log("Apply Privilege Card : ", resp);
      let resp1 = JSON.stringify(resp);

      // this.navCtrl.setRoot(AppointmentlistPage);
      // let resp1 = JSON.parse(resp.toString());
      console.log("Resp : ", resp);
      console.log("Resp1 : ", resp1);
      let resp2 = JSON.parse(resp1);
      console.log("Resp2 : ", resp2);
      if (resp2.success == '1') {
        this.global.showToasts(resp2.msg, 1000, 'top');
        this.goBack();
      }
      else {
        this.global.showToasterror(resp2.msg, 1000, 'top');
        this.ionViewDidLoad();
      }
      // this.location.origin;

    });
  }

  checkCard(number: any){
    console.log(number);

    if(number == null || number == '' || this.cardno == null || this.cardno == ''){
      this.disabled = false;
    } else{
      this.disabled = true;
    }
  }

  goBack() {
    this.router.navigateByUrl('/appointmentlist');
  }

 async viewPrevilegesCardPAge() {
    let medication_view = await this.modalCtrl.create({
      component: FileuploadformyradiologyPage
    });
    medication_view.present();
  }

  ngOnInit(): void {
  }

}
