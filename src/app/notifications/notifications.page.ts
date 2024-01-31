import {Component, Input, OnInit} from '@angular/core';
import {Global} from "../globalpath";
import { ModalController, NavController, NavParams, Platform, PopoverController} from "@ionic/angular";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";
import {EventsService} from "../services/events.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  @Input() data: any;
  appoitmentList: any;
  notifictionList: any;

  constructor(
              public navCtrl: NavController,
              public appointmentService: AppointmentlistService,
              public plt: Platform,
              private global: Global,
              public events: EventsService,
              public cache: Storage,
              public navParams: NavParams,
              private router: Router,
              public viewCtrl: ModalController,
              public popoverCtrl: PopoverController) {
    this.events.subscribe('user:created', (data: any) => {
      console.log('Welcome', data.user, 'at', data.time);
    });
  }

  ngOnInit(): void {
    console.log("A ", this.data);
  }

  ionViewDidLoad() {
    this.data =  Array(localStorage.getItem('data'));
    this.appoitmentList =  Array(localStorage.getItem('appoitmentList'));
    console.log("B ", this.data);

    this.appointmentService.getJoinCallNotification(this.appoitmentList).subscribe(
      response => {
        console.log('getJoinCallNotification called');
        // console.log(response);
        this.notifictionList = response;
        // for (let i = 0; i < this.notifictionList.length; i++) {
        //   for (let j = 0; j < this.patientlistqueue.length; j++) {
        //     if (this.patientlistqueue[j][0] == this.notifictionList[i][0]) {
        //       this.patientlistqueue[j].callJoin = true;
        //     }
        //   }
        // }
      });

  }

 async joinCall(meetingId) {
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
      window.open(this.global.vc_globallink + meetingId, '_system', 'location=yes,mediaPlaybackRequiresUserAction=yes');
    } else {
      let pipMode = false;
      let plugins;

      // const result = await Jitsi.joinConference({
      //   // required parameters
      //   roomName: 'room1', // room identifier for the conference
      //   url: this.global.vc_globallink + meetingId,  // endpoint of the Jitsi Meet video bridge
      //
      //   // recommended settings for production build. see full list of featureFlags in the official Jitsi Meet SDK documentation
      //   featureFlags: {
      //     'prejoinpage.enabled': false, // go straight to the meeting and do not show the pre-join page
      //     'recording.enabled': false, // disable as it requires Dropbox integration
      //     'live-streaming.enabled': false, // 'sign in on Google' button not yet functional
      //     'android.screensharing.enabled': false, // experimental feature, not fully production ready
      //   },
      //   configOverrides: { 'p2p.enabled': false }, // see list of config overrides in the official Jitsi Meet SDK documentation
      // });
      // console.log(result) ;// { success: true }

      window.addEventListener('onConferenceJoined', () => {
        // do things here
      });
      window.addEventListener('onConferenceTerminated', () => {
        // do things here
      });
      window.addEventListener('onConferenceLeft', () => {
        // do things here
      });


      // JitsiMeetPlugin.loadURL(this.global.vc_globallink + meetingId, pipMode, function (data) {
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

  Changepassword() {
    this.viewCtrl.dismiss();
    this.router.navigateByUrl('/changepassword');
  }

  Profile() {
    this.viewCtrl.dismiss();
    this.router.navigateByUrl('/profile');
  }

  Logout() {
    this.cache.clear();
    localStorage.removeItem("userDetails");
    localStorage.clear();
    this.viewCtrl.dismiss();
    this.router.navigateByUrl('/login');
  }
}
