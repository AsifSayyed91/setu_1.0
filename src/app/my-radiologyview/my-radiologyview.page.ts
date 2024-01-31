import { Component, OnInit } from '@angular/core';
import {Global} from "../globalpath";
import {MyRadiologyService} from "../my-radiology/my-radiology.service";
import {ModalController, NavController, NavParams} from "@ionic/angular";
import {PaginationInstance} from "ngx-pagination";
import {Router} from "@angular/router";
import {ModalpopupPage} from "../modalpopup/modalpopup.page";
import {FileuploadformyradiologyPage} from "../fileuploadformyradiology/fileuploadformyradiology.page";

@Component({
  selector: 'app-my-radiologyview',
  templateUrl: './my-radiologyview.page.html',
  styleUrls: ['./my-radiologyview.page.scss'],
})
export class MyRadiologyviewPage implements OnInit {
  loginUser;
  vpId;
  myRadiologyId;
  radiologyList = [];
  radiologyReceipt: Array<any> = [];
  radiologyReceipts: Array<any> = [];
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
              public myRadiologyService: MyRadiologyService,
              public  viewCtrl: ModalController,
              public navParams: NavParams,
              private router: Router,
              public modalController: ModalController) {
    this.myRadiologyId = this.router.getCurrentNavigation()?.extras?.state;
    console.log("this.myRadiologyId", this.myRadiologyId)
  }

  ngOnInit() {
    this.myRadiologyService.getRadiologyListById(this.myRadiologyId).then(data => {
      this.radiologyList = data.content;
      console.log("myRadiologyId", this.myRadiologyId);
    });
    this.loginUser = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.getPage(1);
  }

  getPage(page) {
    this.config.currentPage = page;
    this.myRadiologyService.patientIdByUserId(this.loginUser.userId)
      .then(resp => {
        this.patientId = resp.patientId;
        console.log('patient id => ' , this.patientId);
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyRefferalsviewPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


  async OpenModal(id) {
    let modal = await  this.modalController.create({
      component: ModalpopupPage,
      componentProps:id
    });
    modal.present();
  }

  sendToLab(patientId, myRefferalsId) {
    let user = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    console.log(JSON.stringify(user));
    console.log('patient Id => ' ,this.patientId);
    console.log('myRadiology Id => ' ,this.myRadiologyId);
    this.myRadiologyService.sendLab(this.myRadiologyId)
      .then(data => {
        if (data.success === "1") {
          this.global.showToast('Send To Lab successfully', 2000, 'top');
        } else {
          this.global.showToastwaring('Send To Lab Fail', 2000, 'top');
        }
      })
  }

}
