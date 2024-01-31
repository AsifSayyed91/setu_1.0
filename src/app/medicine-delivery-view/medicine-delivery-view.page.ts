import { Component, OnInit } from '@angular/core';
import {MedicineDeliveryService} from "../medicine-delivery/medicine-delivery.service";
import {Global} from "../globalpath";
import {ModalpopupPage} from "../modalpopup/modalpopup.page";
import {ModalController, NavController, NavParams} from "@ionic/angular";
import {PaginationInstance} from "ngx-pagination";

@Component({
  selector: 'app-medicine-delivery-view',
  templateUrl: './medicine-delivery-view.page.html',
  styleUrls: ['./medicine-delivery-view.page.scss'],
})
export class MedicineDeliveryViewPage implements OnInit {

  medicineDeliveryId;
  medicineDeliveryList = [];
  medicineDeliveryReceipt: Array<any> = [];
  medicineDeliveryReceipts: Array<any> = [];
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
              public medicineDeliveryService: MedicineDeliveryService,
              public  viewCtrl: ModalController,
              public navParams: NavParams,
              public modalController: ModalController) {
    this.medicineDeliveryId = this.navParams.get('medicineDeliveryId');
    console.log("this.medicineDeliveryId", this.medicineDeliveryId)
  }

  ngOnInit() {
    this.medicineDeliveryService.getMedicineDeliveryListById(this.medicineDeliveryId).then(data => {
      this.medicineDeliveryReceipt = data;
      this.medicineDeliveryReceipts = data[0];
      console.log('homeHealthServiceId => ', this.medicineDeliveryId);
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicineDeliveryViewPage');
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
