import { Component, OnInit } from '@angular/core';
import {MyPrescriptionService} from "../my-prescription/my-prescription.service";
import {Global} from "../globalpath";
import {ModalController, NavController, NavParams} from "@ionic/angular";
import {PaginationInstance} from "ngx-pagination";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-prescriptionview',
  templateUrl: './my-prescriptionview.page.html',
  styleUrls: ['./my-prescriptionview.page.scss'],
})
export class MyPrescriptionviewPage implements OnInit {
  patientId;
  pharmacyId;
  loginUser;
  vpId;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  };
  loading: boolean = false;
  prescriptionReceipt: any ={};
  prescriptionReceipts: any ={};
  usersign_url = this.global.paientImgPath;
  patientimagepath = this.global.paientImgPath;
  Prescriptionlist = [];
  pharmacyToken:any;

  constructor(public navCtrl: NavController,
              public global: Global,
              public  myPrescriptionService: MyPrescriptionService,
              public  viewCtrl: ModalController,
              public navParams: NavParams,
              private router: Router,
              public modalController: ModalController) {
    this.vpId = this.router.getCurrentNavigation()?.extras?.state;
    console.log("this.vpId", this.vpId)
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentviewPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ngOnInit() {
    this.myPrescriptionService.getPrescriptionById(this.vpId).subscribe(data => {
      this.prescriptionReceipt = data;
      console.log("prescriptionReceipts", data)
    });
    this.loginUser = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.getPage(1);
  }

  getPage(page) {
    this.config.currentPage = page;
    this.myPrescriptionService.patientIdByUserId(this.loginUser.userId)
      .then(resp => {
        this.patientId = resp.patientId;
        console.log('patient id => ', this.patientId);
      });
    this.myPrescriptionService.patientIdByUserId(this.loginUser.userId).then(resp => {
      this.patientId = resp.patientId;
      this.myPrescriptionService.getPrescriptionlist(this.patientId, page, this.config.itemsPerPage, '', '').then(data => {
        this.Prescriptionlist = data.content;
        console.log('prescription list by id dipak => ', this.Prescriptionlist);
      })
    })
  }


  sendToPharmacy(patientId, vpId) {
    let user = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    console.log(JSON.stringify(user));
    console.log('patient Id => ', this.patientId);
    console.log('vpId Id => ', this.vpId);


  // this.myPrescriptionService.generate800PharmacyToken()
  //     .then(token => {
  //       console.log(token);
  //       localStorage.setItem("pharmacy_token", token.toString());
  //       this.pharmacyToken=token;
  //     });
    this.myPrescriptionService.sendToPharmacy(this.patientId, this.vpId)
      .then(data => {
        if (data.status === "1") {
          this.global.showToast('Send To Pharmacy successfully', 2000, 'top');
        } else {
          this.global.showToastwaring('Send To Pharmacy Fail', 2000, 'top');
        }
      });

    this.orderToPharmacy();
  }

  orderToPharmacy() {
    let user = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    console.log(JSON.stringify(user));
    this.myPrescriptionService.orderToPharmacy(this.vpId, user.userId).subscribe(data => {
      if (data.status === 'true') {
        this.global.showToastwaring('Order to pharmacy successfully', 2000, 'top');
      } else {
        this.global.showToastwaring('Order to phamracy fail', 2000, 'top');
      }
    })
  }

}
