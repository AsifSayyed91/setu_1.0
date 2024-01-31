import { Component, OnInit } from '@angular/core';
import {PaymentviewPage} from "../paymentview/paymentview.page";
import {ModalController, NavController, NavParams} from "@ionic/angular";
import {MyPrescriptionService} from "../my-prescription/my-prescription.service";
import {Router} from "@angular/router";
import {PaginationInstance} from "ngx-pagination";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {
  loginUser;
  patientId;
  pagination: boolean = false;
  paginations: boolean = false;
  paymenntlist = [];
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  };

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public navParams: NavParams,
              private router: Router,
              public myPrescriptionService: MyPrescriptionService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentsPage');
  }

  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.getPage(1);
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }

  getPage(page) {
    this.myPrescriptionService.patientIdByUserId(this.loginUser.userId).then(resp => {
      this.patientId = resp.patientId;
      this.myPrescriptionService.getPaymentDetailsByPatientId(this.patientId, page, this.config.itemsPerPage, '', '').then(data => {
        if (data.content.length >= 1) {
          this.pagination = true;
          this.paginations = true;
          this.paymenntlist = data.content;
          console.log("paymenntlist", this.paymenntlist.length);
          this.config.currentPage = page;
          this.config.totalItems = data.totalElements;
        } else {
          this.pagination = true;
        }
      })
    })
  }

  /* payment_view(id) {
     let medication_view = this.modalCtrl.create(PaymentviewPage, {billId: id});
     medication_view.present();
   }*/

  payment_view(id) {
    console.log('going to mySickLeaves Page with id :',id);

    this.navCtrl.navigateForward('/paymentview', {state: id});
  }

}
