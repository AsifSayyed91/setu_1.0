import { Component, OnInit } from '@angular/core';
import {PopoverPage} from "../popover/popover.page";
import {MyPrescriptionService} from "../my-prescription/my-prescription.service";
import {Global} from "../globalpath";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";
import {ModalController, NavController, PopoverController} from "@ionic/angular";
// import {EventsService} from "../services/events.service";
import { Router} from "@angular/router";
import {EventsService} from "../services/events.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  userDetails: any;
  appointmentlist: Array<any> = [];
  count: any;
  count1: any;
  count2: any;
  patientId;
  vitals = [];
  show: boolean = false;

  constructor(public appointmentService: AppointmentlistService,

              public events: EventsService,
              public global: Global,
              public navCtrl: NavController,
              public viewCtrl: ModalController,
              private router: Router,
              public myPrescriptionService: MyPrescriptionService,
              public popoverCtrl: PopoverController) {
    this.events.subscribe('user:created', (data: any) => {
      console.log('Welcome', data.user, 'at', data.time);
    });
  }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails')|| '{}');

    this.appointmentService.appointmenListByUserId(this.userDetails.userId).subscribe(data => {
      if (data.AppointmentCountByPatient[0] > 0) {
        this.count = data.AppointmentCountByPatient[0];
      } else {
        this.count = '0';
      }
    });

    this.appointmentService.upcomingAppointmenByUserId(this.userDetails.userId).subscribe(data => {
      if (data.UpcomingAppointmentCountByPatient[0] > 0) {
        this.count1 = data.UpcomingAppointmentCountByPatient[0];
      } else {
        this.count1 = '0';
      }
    });

    this.appointmentService.closedAppointmenByUserId(this.userDetails.userId).subscribe(data => {
      if (data.ClosedAppointmentCountByPatient[0] > 0) {
        this.count2 = data.ClosedAppointmentCountByPatient[0];
      } else {
        this.count2 = 0;
      }
    });

    // this.myPrescriptionService.patientIdByUserId(this.userDetails.userId).then(resp => {
    //   this.patientId = resp.patientId;
    //   this.appointmentService.vitalListByPatientId(this.patientId).subscribe(data => {
    //     if (data.length > 0) {
    //       this.show = true;
    //       this.vitals = data;
    //     }
    //   });
    // });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }

  BookanAppointment() {
    this.router.navigateByUrl('/book-appointment-filter');
  }

  MyPrescription() {
    this.router.navigateByUrl('/my-prescription');
  }

  Payment() {
    this.router.navigateByUrl('/payments');
  }

  Upcomeing() {
    this.router.navigateByUrl('/appointmentlist');
  }

  ClosedApp() {
    this.router.navigateByUrl('/my-consultation');
  }

  async popoverMenu(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: event,
      animated: true,
      showBackdrop: true
    });
  }

  Menu() {
    this.router.navigateByUrl('/home');
  }

  Specialities() {
    this.router.navigateByUrl('/specialities');
  }

  Hospital() {
    this.router.navigateByUrl('/hospital');
  }

  Insurance() {
    this.router.navigateByUrl('/insurance');
  }

  Symptoms() {
    this.router.navigateByUrl('/symptoms');
  }

  /*Explore() {
    this.navCtrl.setRoot(ExploreServicesPage);
  }*/

  Explore(){
    this.router.navigateByUrl('/explore-services');
  }
  GoToMulkMed(){
    window.open("https://www.mulkmed.com/",'_blank', 'location=no');
  }

  goToCallDial(){
    window.open("tel:00971569337544",'_system', 'location=yes');
  }
  goToCallDialLiveDocCons(){
    window.open("tel:00971569337544",'_system', 'location=yes');
  }
  goToWhatsApp(){
    window.open("https://wa.me/971569337544",'_system', 'location=yes');
  }

  menuToggle() {
    // this.router.navigateByUrl('/popver'); // Toggle the menu
  }



}
