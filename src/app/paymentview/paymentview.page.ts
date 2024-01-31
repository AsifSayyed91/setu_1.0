import { Component, OnInit } from '@angular/core';
import {Global} from "../globalpath";
import {ModalController, NavController, NavParams} from "@ionic/angular";
import {MyPrescriptionService} from "../my-prescription/my-prescription.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-paymentview',
  templateUrl: './paymentview.page.html',
  styleUrls: ['./paymentview.page.scss'],
})
export class PaymentviewPage implements OnInit {
  billId: any = null;
  PaymentReceipt = [];
  payment;
  usersign_url = this.global.paientImgPath;

  constructor(public navCtrl: NavController,
              public global: Global,
              public viewCtrl: ModalController,
              private router: Router,
              public navParams: NavParams,
              public  myPrescriptionService: MyPrescriptionService) {
    this.billId = this.router.getCurrentNavigation()?.extras?.state;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentviewPage');
  }

  ngOnInit() {
    this.myPrescriptionService.getPaymentReceiptByBillId(this.billId).subscribe(data => {
      this.PaymentReceipt = data;
      this.payment = data[0];
      console.log(" this.PaymentReceipt", this.PaymentReceipt);
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
