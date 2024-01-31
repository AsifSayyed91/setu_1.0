import { Component, OnInit } from '@angular/core';
import {PopoverPage} from "../popover/popover.page";
import {DatePipe} from "@angular/common";
import {Global} from "../globalpath";
import {NotificationsPage} from "../notifications/notifications.page";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";
import {LoadingController, ModalController, NavController, Platform, PopoverController} from "@ionic/angular";
import {PaginationInstance} from "ngx-pagination";

@Component({
  selector: 'app-appointmentlist',
  templateUrl: './appointmentlist.page.html',
  styleUrls: ['./appointmentlist.page.scss'],
})
export class AppointmentlistPage implements OnInit {
  userDetails: any;
  notifictionList: any = [];
  appointmentlist: Array<any> = [];
  docOriginalName: any;
  currentFile: any;
  reason: any;
  visitList: any = 0;
  toggleNotification: boolean = false;
  today;
  patientId;
  AppointmentId;
  EmiratesId;
  cardno;
  url;
  fromdate;
  todate;
  pagination: boolean = false;
  filtershow: boolean = false;
  displayPopup: Boolean = false;
  user: any;
  payment = this.global.payment;
  public config: PaginationInstance = {
    id: 'advanced', itemsPerPage: 10, currentPage: 1, totalItems: 1
  };
  // options: InAppBrowserOptions = {
  //   location: 'yes',//Or 'no'
  //   hidden: 'no', //Or  'yes'
  //   clearcache: 'yes',
  //   clearsessioncache: 'yes',
  //   zoom: 'yes',//Android only ,shows browser zoom controls
  //   hardwareback: 'yes',
  //   mediaPlaybackRequiresUserAction: 'no',
  //   shouldPauseOnSuspend: 'no', //Android only
  //   closebuttoncaption: 'Close', //iOS only
  //   disallowoverscroll: 'no', //iOS only
  //   toolbar: 'yes', //iOS only
  //   enableViewportScale: 'no', //iOS only
  //   allowInlineMediaPlayback: 'no',//iOS only
  //   presentationstyle: 'pagesheet',//iOS only
  //   fullscreen: 'yes',//Windows only
  // };

  constructor(public appointmentService: AppointmentlistService,
              public plt: Platform,
              public loadingCtrl: LoadingController,
              public popoverCtrl: PopoverController,
              private global: Global,
              public  modalCtrl: ModalController,
              public navCtrl: NavController,
              // private theInAppBrowser: InAppBrowser
  ) {
  }

  ngOnInit() {
    var datePipe = new DatePipe('en-US');
    var date = new Date();
    this.today = datePipe.transform(date, 'yyyy-MM-dd');
    console.log("this.today", this.today)
    this.userDetails = JSON.parse(localStorage.getItem('userDetails')|| '{}');

    if(this.userDetails.userNationalityId != undefined){
      this.EmiratesId = this.userDetails.userUid;
    }

    this.getPage(1, this.today, this.today);
    setInterval(() => this.getNotifications(this.visitList), 10000);
  }


  async showNotificationsPanel(event: Event) {
    console.log(event);
    console.log("Amol ", this.notifictionList);
    localStorage.setItem("appoitmentList", this.visitList);
    const popover = await this.popoverCtrl.create({
      component: NotificationsPage,
      componentProps: this.notifictionList,
      event: event,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

  // async showNotificationsPanel(event: Event) {
  //    console.log(event);
  //    console.log("Amol ", this.notifictionList);
  //    localStorage.setItem("appoitmentList", this.visitList);
  //    const notifications = await this.popoverCtrl.create(NotificationsPage, {data: this.notifictionList});
  //   await  notifications.present({ev: event});
  //
  //    const popover =await this.popoverCtrl.create({NotificationsPage});
  //   await popover.present({ev: event});
  //
  //  }

  getNotifications(vistitList: any) {
    this.appointmentService.getJoinCallNotification(vistitList).subscribe(
      response => {
        console.log('getJoinCallNotification called');
        // console.log(response);
        this.notifictionList = response;
        console.log("Notification list : ", this.notifictionList);
        // for (let i = 0; i < this.notifictionList.length; i++) {
        //   for (let j = 0; j < this.patientlistqueue.length; j++) {
        //     if (this.patientlistqueue[j][0] == this.notifictionList[i][0]) {
        //       this.patientlistqueue[j].callJoin = true;
        //     }
        //   }
        // }
      });
  }

  Reset() {
    this.filtershow = false;
    this.appointmentlist = [];
    this.ngOnInit();
  }

  Search() {
    this.filtershow = false;
    this.appointmentlist = [];
    this.getPage(1, this.fromdate, this.todate);
  }


  onSelectCategory(id) {
    console.log('categaryid', id);
  }

  onFileChange(event) {
    this.currentFile = event.target.files[0];
    this.docOriginalName = this.currentFile.name;
  }

  onCancelAppointment(app_id) {
    this.reason = 'cancel';
    this.appointmentService.appointmentCancel(app_id, this.reason).subscribe(resp => {
      if (resp.success === '1') {
        this.global.showToast(resp.msg, 1000, 'top');
        this.ngOnInit();
      } else {
        this.global.showToast(resp.msg, 1000, 'top');
      }
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }


  appointmentPay(user) {
    this.displayPopup = true;
    this.user = user;
    console.log(user);
    console.log('appointmentPay callled...');
    this.url = this.global.paymentLink + "?appointmentId=" + user.appointmentId;
    console.log('Payment URL link : ', this.url);
    window.open(this.url, '_blank', 'location=no,footer=yes,footercolor=#CC000000,closebuttoncaption=Done,closebuttoncolor=#00FFFF');
    // var ref = cordova.InAppBrowser.open(this.url, '_blank', 'location=no,footer=yes,footercolor=#CC000000,closebuttoncaption=Done,closebuttoncolor=#00FFFF')
    // ref.addEventListener('exit', function (event) {
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
    //   loading.present();
    //   setTimeout(() => {
    //     this.getPage(1);
    //     loading.dismiss();
    //   }, 18000);
    // });
  }

  async popoverMenu(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: event,
      animated: true,
      showBackdrop: true
    });
  }

  /*joinCall(user) {
    console.log('joinCall called.!');

    if (this.plt.is('ios')) {
      // jitsiplugin.loadURL('https://meet.jit.si/' + 10, 10, false, function (data) {
      //   if (data === "CONFERENCE_WILL_LEAVE") {
      //     jitsiplugin.destroy(function (data) {
      //       // call finished
      //     }, function (err) {
      //       console.log(err);
      //     });
      //   }
      // }, function (err) {
      //   console.log(err);
      // });
      // window.open(this.global.vc_globallink + user.meetingId, '_system', 'location=yes,mediaPlaybackRequiresUserAction=no');
      // window.open(this.global.vc_globallink, '_system', 'location=yes,mediaPlaybackRequiresUserAction=yes');

      this.theInAppBrowser.create(this.global.vc_globallink + user.meetingId, '_self', this.options);

    } else {

      // const browser = this.theInAppBrowser.create(this.global.vc_globallink + user.meetingId, '_blank', {location: 'no', zoom: 'no'});
      // browser.show();
      this.theInAppBrowser.create(this.global.vc_globallink + user.meetingId, '_self', this.options);
      // window.open(this.global.vc_globallink, '_system', 'location=yes,mediaPlaybackRequiresUserAction=no');

      // let pipMode = false;
      // let plugins;
      // JitsiMeetPlugin.loadURL(this.global.vc_globallink + user.meetingId, pipMode, function (data) {
      //   if (data === "CONFERENCE_WILL_LEAVE") {
      //     plugins.JitsiPlugin.destroy(function (data) {
      //       // on Destroy
      //       console.log("Destroy");
      //     }, function (err) {
      //       // on Error
      //       console.log("Error");
      //     });
      //   }
      // }, function (err) {
      //   // on load url was not work
      //   console.log("Error : ", err);
      // });
    }
  }*/


  joinCall(user) {
    console.log('joinCall called.!');
    console.log(user);
    const jwtToken='?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZXh0Ijp7InVzZXIiOnsiYXZhdGFyIjoiaHR0cHM6Ly9lbi5ncmF2YXRhci5jb20vdXNlcmltYWdlLzQ2MzE5MDY1LzA0MGEzOGVjMzI2YzZlZTJjY2JiOTFkMGM5ZWY3NjRkLnBuZz9zaXplPTQwMCIsIm5hbWUiOiJNZWV0cml4IiwiZW1haWwiOiJoZWxsb0BtZWV0cml4LmlvIn19LCJtb2RlcmF0b3IiOmZhbHNlLCJhdWQiOiJqaXRzaSIsImlzcyI6Im11bGtfYXBwX2lkIiwic3ViIjoidmMubXVsa21lZC5jb20iLCJyb29tIjoiKiIsImV4cCI6MTc1MzQ5ODgxNSwibmJmIjoxNjM2MTE3MjExfQ.qV-O5v8_e96kzUt8eEmK4uk_cy0qxC-bhDz-ffyUq6Q';

    // let userData = '#jitsi_meet_external_api_id=0&userInfo.displayName=' + user.appointmentPatientId.patientUserId.userFullname + '&appData.localStorageContent=' + null + '&TRUST_BWE=false';
    if (this.plt.is('ios') || 1 == 1) {
      // jitsiplugin.loadURL('https://meet.jit.si/' + 10, 10, false, function (data) {
      //   if (data === "CONFERENCE_WILL_LEAVE") {
      //     jitsiplugin.destroy(function (data) {
      //       // call finished
      //     }, function (err) {
      //       console.log(err);
      //     });
      //   }
      // }, function (err) {
      //   console.log(err);
      // });

    //  https://vc.mulkmed.com/testroom?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZXh0Ijp7InVzZXIiOnsiYXZhdGFyIjoiaHR0cHM6Ly9lbi5ncmF2YXRhci5jb20vdXNlcmltYWdlLzQ2MzE5MDY1LzA0MGEzOGVjMzI2YzZlZTJjY2JiOTFkMGM5ZWY3NjRkLnBuZz9zaXplPTQwMCIsIm5hbWUiOiJNZWV0cml4IiwiZW1haWwiOiJoZWxsb0BtZWV0cml4LmlvIn19LCJtb2RlcmF0b3IiOnRydWUsImF1ZCI6ImppdHNpIiwiaXNzIjoibXVsa19hcHBfaWQiLCJzdWIiOiJ2Yy5tdWxrbWVkLmNvbSIsInJvb20iOiIqIiwiZXhwIjoxNzUzNDk4ODE1LCJuYmYiOjE2MzYxMTcyMTF9.gTvVGCANsNwge6YDuCExgEIAUxsUCey3qzoG11L1O_I








            console.log("Link : ", this.global.vc_globallink + user.meetingId+jwtToken );
      window.open(this.global.vc_globallink + user.meetingId+jwtToken, '_system', 'location=yes,mediaPlaybackRequiresUserAction=yes');


    } else {
      // let pipMode = false;
      // let plugins;
      console.log('In else block : ');
      console.log("Jitsi Link : ", this.global.vc_globallink + user.meetingId+jwtToken);

      window.open(this.global.vc_globallink + user.meetingId+jwtToken, '_system', 'location=yes,mediaPlaybackRequiresUserAction=yes');

      // JitsiMeetPlugin.loadURL(this.global.vc_globallink + user.meetingId, pipMode, function (data) {
      //   if (data === "CONFERENCE_WILL_LEAVE") {
      //     plugins.JitsiPlugin.destroy(function (data) {
      //       // on Destroy
      //       console.log("Destroy");
      //     }, function (err) {
      //       // on Error
      //       console.log("Error");
      //     });
      //   }
      // }, function (err) {
      //   // on load url was not work
      //   console.log("Error : ", err);
      // });
    }
  }


  // onViewCasePaper(id) {
  //   window.open(this.global.casepaper_globallink + id, '_blank');
  // }

  FilterSearch() {
    this.filtershow = true;
  }

  onSelectedfromDate(ev) {
    var datePipe = new DatePipe('en-US');
    this.fromdate = datePipe.transform(ev.target.value, 'yyyy-MM-dd');
    console.log("fromdate", this.fromdate)
  }

  onSelectedtoDate(ev) {
    var datePipe = new DatePipe('en-US');
    this.todate = datePipe.transform(ev.target.value, 'yyyy-MM-dd');
    // this.todate =ev.target.value.format('YYYY-MM-DD');
    console.log("todate", this.todate)
  }

  getPage(page, fromdate, todate) {
    if (fromdate == undefined) {
      this.fromdate = this.today;
    } else {
      this.fromdate = fromdate;
    }
    if (todate == undefined) {
      this.todate = this.today;
    } else {
      this.todate = todate;
    }
    this.appointmentService.appointmenListByUserIdList(this.userDetails.userId, page, this.config.itemsPerPage, '', '', this.fromdate, this.todate).subscribe(data => {
      console.log('appointmenListByUserIdList', data);
      if (data.length >= 1) {
        this.pagination = true;
        this.appointmentlist = data;
        console.log("appointmenListByUserIdList => ", data);
        this.config.currentPage = page;
        this.config.totalItems = this.appointmentlist[0].count;
        let len = data.length;
        console.log("Length : ", len);
        for (let i = 0; i < len; i++) {
          console.log("appointmentId : ", data[i].appointmentId);
          this.visitList += data[i].appointmentId;
          console.log("visitList : ", this.visitList);
          if (i != len - 1) {
            this.visitList += ",";
          }
        }
        this.getNotifications(this.visitList);
      } else {
        this.pagination = true;
      }
    });
  }

  // openCaseReport(timelineId: any) {
  //   console.log('timelineId', timelineId);
  //   window.open(this.global.casepaper_globallink + timelineId, '_blank');
  // }

  upload(appointmentId) {
    console.log('upload called...');
    this.AppointmentId = appointmentId;
  }

  /* takephoto(id) {
     console.log('takePhoto click...!');
     let medication_view = this.modalCtrl.create(UpPhotoApplistPage, {appId: id});
     medication_view.present();
   }
 */

  takephoto(id) {
    console.log('going to upPhotoApplistPage with id => ', id);
    this.navCtrl.navigateForward('/up-photo-applist', {state: id});
  }

  Vitals(id) {
    console.log('going to VitalsPage with id => ', id);
    // let vital_view = this.modalCtrl.create(VitalsPage, {viId: id});
    this.navCtrl.navigateForward('/vitals', {state: id});
    // vital_view.present();
  }

  appyPrevilegesCard(appoinment: any){
    console.log("user : ", appoinment);
    this.navCtrl.navigateForward('/previleges-card', {state:appoinment});
  }
}
