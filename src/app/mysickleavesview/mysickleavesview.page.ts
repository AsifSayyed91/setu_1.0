import { Component, OnInit } from '@angular/core';
import {Global} from "../globalpath";
import {ModalController, NavController, NavParams} from "@ionic/angular";
import {MySickLeavesService} from "../my-sick-leaves/my-sick-leaves.service";
import {PaginationInstance} from "ngx-pagination";
import {ModalpopupPage} from "../modalpopup/modalpopup.page";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mysickleavesview',
  templateUrl: './mysickleavesview.page.html',
  styleUrls: ['./mysickleavesview.page.scss'],
})
export class MysickleavesviewPage implements OnInit {
  vpId;
  loginUser;
  mySickLeavesId;
  sickLeaves:any = [];
  sickLeavesReceipt: Array<any> = [];
  sickLeavesReceipts: Array<any> = [];
  patientId;
  pagination: boolean = false;
  patientimagepath = this.global.paientImgPath;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  };

  constructor(public navCtrl: NavController,
              public global: Global,
              public mySickLeavesService: MySickLeavesService,
              public  viewCtrl: ModalController,
              public navParams: NavParams,
              private router: Router,
              public modalController: ModalController) {
    this.sickLeaves = this.router.getCurrentNavigation()?.extras?.state;
    console.log("this.mySickLeavesId", this.sickLeaves)
  }

  ngOnInit() {

    this.loginUser = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.getPage(1);
  }

  getPage(page) {
    this.config.currentPage = page;
    this.mySickLeavesService.patientIdByUserId(this.loginUser.userId).then(resp => {
      this.patientId = resp.patientId;
      /*this.mySickLeavesService.getSickleavesListByPatient(this.patientId).then(data => {
        if (data) {
          this.pagination = true;
          this.sickLeavesList = data;
          console.log('sick leaves => ', data);
          this.config.currentPage = page;
          this.config.totalItems = data.totalElements;
        } else {
          this.pagination = true;
        }
      })*/
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MySickLeavesViewPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  async  OpenModal(id) {
    let modal = await this.modalController.create({
      component: ModalpopupPage,
      componentProps: id
    });
    modal.present();
  }

  sendToOthers() {
    let user = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    console.log(JSON.stringify(user));
    this.mySickLeavesService.sendToOthers(this.vpId, user.userId).subscribe(data => {
      if (data.status === 'true') {
        this.global.showToastwaring('send to others successfully', 2000, 'top');
      } else {
        this.global.showToastwaring('send to others fail', 2000, 'top');
      }
    })
  }

}
