import { Component, OnInit } from '@angular/core';
import {Global} from "../globalpath";
import {MedicalTourismService} from "../medical-tourism/medical-tourism.service";
import {ModalpopupPage} from "../modalpopup/modalpopup.page";
import {ModalController, NavController, NavParams} from "@ionic/angular";
import {PaginationInstance} from "ngx-pagination";

@Component({
  selector: 'app-medical-tourism-view',
  templateUrl: './medical-tourism-view.page.html',
  styleUrls: ['./medical-tourism-view.page.scss'],
})
export class MedicalTourismViewPage implements OnInit {

  medicalTourismId;
  medicalTourismList = [];
  medicalTourismReceipts: Array<any> = [];
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
              public medicalTourismService: MedicalTourismService,
              public  viewCtrl: ModalController,
              public navParams: NavParams,
              public modalController: ModalController) {
    this.medicalTourismId = this.navParams.get('medicalTourismId');
    console.log("this.medicalTourismId", this.medicalTourismId)
  }

  ngOnInit() {
    this.medicalTourismService.getMedicalTourismListById(this.medicalTourismId).then(data => {
      this.medicalTourismList = data;
      this.medicalTourismReceipts = data[0];
      console.log('medicalTourismId => ', this.medicalTourismId);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicalTourismViewPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

 async OpenModal(id) {
    let medication_view = await  this.modalController.create({
      component: ModalpopupPage,
      componentProps: id
    });
    medication_view.present();
  }
}
