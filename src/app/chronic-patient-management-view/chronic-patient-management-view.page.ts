import { Component, OnInit } from '@angular/core';
import {ChronicPatinetManagementService} from "../chronic-patient-management/chronic-patinet-management.service";
import {Global} from "../globalpath";
import {ModalController, NavController, NavParams} from "@ionic/angular";
import {PaginationInstance} from "ngx-pagination";

@Component({
  selector: 'app-chronic-patient-management-view',
  templateUrl: './chronic-patient-management-view.page.html',
  styleUrls: ['./chronic-patient-management-view.page.scss'],
})
export class ChronicPatientManagementViewPage implements OnInit {

  vpId;
  chronicPatientId;
  chronicPatientList = [];
  chronicPatientReceipt: Array<any> = [];
  chronicPatientReceipts: Array<any> = [];
  patientId;
  pagination: boolean = false;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  };

  constructor(public navCtrl: NavController,
              public global: Global,
              public chronicPatinetManagementService: ChronicPatinetManagementService,
              public  viewCtrl: ModalController,
              public navParams: NavParams,
              public modalController: ModalController) {
    this.chronicPatientId = this.navParams.get('chronicPatientId');
    console.log("this.chronicPatientId", this.chronicPatientId)
  }

  ngOnInit() {
    this.chronicPatinetManagementService.getChronicPatientListById(this.chronicPatientId).then(data => {
      this.chronicPatientList = data.content;
      console.log("chronicPatientId", this.chronicPatientId);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChronicPatientMangementViewPage');
  }

  OpenModal(){

  }

  sendToOthers(){

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}

