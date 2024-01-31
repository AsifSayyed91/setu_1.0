import { Component, OnInit } from '@angular/core';
import {Global} from "../globalpath";
import {MyLabreportsService} from "../my-labreports/my-labreports.service";
import {ModalController, NavController, NavParams} from "@ionic/angular";
import {PaginationInstance} from "ngx-pagination";
import {Router} from "@angular/router";
import {ModalpopupPage} from "../modalpopup/modalpopup.page";
import {FileuploadformylabreportsPage} from "../fileuploadformylabreports/fileuploadformylabreports.page";

@Component({
  selector: 'app-my-labreportsview',
  templateUrl: './my-labreportsview.page.html',
  styleUrls: ['./my-labreportsview.page.scss'],
})
export class MyLabreportsviewPage implements OnInit {
  vpId;
  myLabReportsId;
  labReportsList = [];
  patientId;
  pagination: boolean = false;
  selectedSpecialityObject: any;
  patientimagepath = this.global.paientImgPath;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  };

  constructor(public navCtrl: NavController,
              public global: Global,
              public myLabReportsService: MyLabreportsService,
              public  viewCtrl: ModalController,
              public navParams: NavParams,
              private router: Router,
              public modalController: ModalController) {
    this.myLabReportsId = this.router.getCurrentNavigation()?.extras?.state;
    console.log("this.myLabReportsId", this.myLabReportsId);
  }

  ngOnInit() {
    console.log('this.patientId 3 => ', this.patientId);
    this.myLabReportsService.getMyLabReportsById(this.myLabReportsId).then(data => {
      this.labReportsList = data.content;
      console.log("labreportsId dipak=>", this.myLabReportsId);
      console.log("labReportsList dipak=>", data);
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  async  OpenModal(id) {
    let modal = await  this.modalController.create({
      component : ModalpopupPage,
      componentProps: id
    } );
    modal.present();
  }

  sendToOthers() {
    let user = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    console.log(JSON.stringify(user));
    this.myLabReportsService.sendToOthers(this.vpId, user.userId).subscribe(data => {
      if (data.status === 'true') {
        this.global.showToastwaring('send to others successfully', 2000, 'top');
      } else {
        this.global.showToastwaring('send to others fail', 2000, 'top');
      }
    })
  }

  sentToLab(patientId, vpId){
    this.myLabReportsService.sentToLab(this.myLabReportsId)
      .then(data => {
        if (data.success === "1") {
          this.global.showToast('Send To Lab successfully', 2000, 'top');
        } else {
          this.global.showToastwaring('Send To Lab Fail', 2000, 'top');
        }
      })
  }
}
