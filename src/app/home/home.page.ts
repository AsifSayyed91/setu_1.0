import {Component, OnInit, ViewChild} from '@angular/core';
import {InquiriesPage} from "../inquiries/inquiries.page";
import {Global} from "../globalpath";
import {
  AlertController,
  IonRouterOutlet, ModalController,
  NavController,
  NavParams,
  Platform,
  PopoverController,
  ToastController
} from "@ionic/angular";
import {DashboardPage} from "../dashboard/dashboard.page";
import {EventsService} from "../services/events.service";
import {Router} from "@angular/router";
import { Location } from '@angular/common';
import {PopoverPage} from "../popover/popover.page";
import {MyComplaintsPage} from "../my-complaints/my-complaints.page";
import {ExplorewisePartnersPage} from "../explorewise-partners/explorewise-partners.page";
import * as Events from "events";
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage  {
  @ViewChild(IonRouterOutlet, { static : true }) routerOutlet!: IonRouterOutlet;

  // @ViewChild(Nav) nav: Nav;
  // public rootPage = BookAppointmentPage;
  public rootPage = DashboardPage;
  pages: Array<{ icon: string, title: string, component: any }> = [];
  backButtonPressedOnceToExit = false;
  user1: any;
  userImage;
  user;
  viba: boolean = false;
  constructor(private platform: Platform,
              public navParams: NavParams,
              public navCtrl: NavController,
              public toastCtrl: ToastController,
              public global: Global,
              public viewCtrl: ModalController,
              public popoverCtrl: PopoverController,
              public alertController: AlertController,
              private _location: Location,
              private router: Router,
              private cache: Storage,
              public event: EventsService) {
  }

  ngOnInit(): void {
    this.user1 = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.user = JSON.parse(localStorage.getItem('profileuserImage') || '{}');
    this.userImage = this.global.paientImgPath + this.user;
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
        console.log('Back press handler!');
        if (this._location.isCurrentPathEqualTo('/home')) {

          // Show Exit Alert!
          console.log('Show Exit Alert!');
          this.showExitConfirm();
          processNextHandler();
        } else {

          // Navigate to back page
          console.log('Navigate to back page');
          this._location.back();

        }

      });

      this.platform.backButton.subscribeWithPriority(5, () => {
        console.log('Handler called to force close!');
        this.alertController.getTop().then(r => {
          if (r) {
            navigator['app'].exitApp();
          }
        }).catch(e => {
          console.log(e);
        })
      });
    });


    // this.platform.ready().then(() => {
    //   this.platform.registerBackButtonAction(() => {
    //     if (this.backButtonPressedOnceToExit) {
    //       this.platform.exitApp();
    //     } else if (this.routerOutlet.canGoBack()) {
    //       // this.platform.exitApp();
    //       this.navCtrl.pop();
    //     } else {
    //       this.showToast();
    //       this.backButtonPressedOnceToExit = true;
    //       setTimeout(() => {
    //         this.backButtonPressedOnceToExit = false;
    //       }, 2000);
    //     }
    //   });
    // })
  }

  showExitConfirm() {
    this.alertController.create({
      header: 'App termination',
      message: 'Do you want to close the app?',
      backdropDismiss: false,
      buttons: [{
        text: 'Stay',
        role: 'cancel',
        handler: () => {
          console.log('Application exit prevented!');
        }
      }, {
        text: 'Exit',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }

  async  showToast() {
    let toast = await this.toastCtrl.create({
      message: 'Press Again to exit', duration: 1000, position: 'bottom'
    });
    await toast.onDidDismiss();
    await toast.present();
  }

  Dashboard() {
    this.navCtrl.navigateRoot('/contact-details');
  }

  // BookanAppointment() {
  //   this.nav.setRoot(BookAppointmentPage);
  // }

  BookanAppointmentFilter() {
    this.router.navigateByUrl('/book-appointment-filter');
  }

  MyAppointment() {
    this.router.navigateByUrl('/appointmentlist');
  }

  MyConsultation() {
    this.router.navigateByUrl('/my-consultation');
  }


  LabReports() {
    this.router.navigateByUrl('/my-labreports');
  }

  MyPrescription() {
    this.router.navigateByUrl('/my-prescription');
  }

  Payment() {
    this.router.navigateByUrl('/payments');
  }

  Upload() {
    this.router.navigateByUrl('/my-upload');
  }

  Radiology() {
    this.router.navigateByUrl('/my-radiology');
  }

  MySickLeaves() {
    this.router.navigateByUrl('/my-sick-leaves');
  }

  Explore() {
    this.router.navigateByUrl('/explore-services');
  }

  Doctor() {
    this.router.navigateByUrl('/my-doctors');
    // this.nav.setRoot(NewBookAppointmentPage);
  }


  Partner(){
    this.router.navigateByUrl('/explorewise-partners');
  }

  Employees(){
    this.navCtrl.navigateRoot('/our-employees');
  }

  Refferal() {
    this.router.navigateByUrl('/my-refferals');
  }

  MyComplaints() {
    this.router.navigateByUrl('/my-complaints');
  }
  MulkMedPrivilegeCard(){
    window.open("https://www.mulkmed.com/privilege-card.aspx",'_blank', 'location=no');
  }
  Inquiry(){
    this.router.navigateByUrl('/inquiries');
  }

  Inquiry1(){
    this.router.navigateByUrl('/medicine-delivery');
  }
  physuitherpy(){
    this.router.navigateByUrl('/physiotherapy')
  }
  complaint(){
    this.router.navigateByUrl('/profile')
  }

  complaint1(){
    this.router.navigateByUrl('/rating')
  }
  goToCallDialLiveDocCons(){
    window.open("tel:00971569337544",'_system', 'location=yes');
  }


  goToCallDialLiveDocCons_(){
    window.open("tel:00 971 42434555",'_system', 'location=yes');
  }
  supportMail(){
    window.open("mailto:support@mulkmed.com",'_system', 'location=yes');
  }

  GoToMulkMed(){
    window.open("https://www.mulkmed.com/",'_blank', 'location=no');
  }

  // async popoverMenu(event: Event) {
  //   const popover = await this.popoverCtrl.create({
  //     component: PopoverPage,
  //     event: event,
  //     animated: true,
  //     showBackdrop: true
  //   });
  // }

  async popoverMenu(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: event,
      animated: true,
      showBackdrop: true,
    });

    await popover.present(); // Present the popover to the user
  }
  Profile() {
    this.viewCtrl.dismiss();
    this.router.navigateByUrl('/profile');

  }


  Changepassword() {
    this.viewCtrl.dismiss();
    this.router.navigateByUrl('/changepassword');

  }

  Logout() {
    // this.cache.clear();
    localStorage.removeItem("userDetails");
    localStorage.clear();
    this.viewCtrl.dismiss();
    this.router.navigateByUrl('/login');

  }
}
