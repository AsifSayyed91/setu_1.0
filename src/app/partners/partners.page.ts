import { Component, OnInit } from '@angular/core';
import {PopoverPage} from "../popover/popover.page";
import {PartnerService} from "../partners/partner.service";
import {Global} from "../globalpath";
import {ModalController, NavController, NavParams, PopoverController} from "@ionic/angular";
import {MyRefferalsService} from "../my-refferals/my-refferals.service";
import {PaginationInstance} from "ngx-pagination";
import {Router} from "@angular/router";

@Component({
  selector: 'app-partners',
  templateUrl: './partners.page.html',
  styleUrls: ['./partners.page.scss'],
})
export class PartnersPage implements OnInit {
  data: any=null;
  chronicPatientManagment;
  partnerType:any;
  aesthetics;
  CDM;
  MD;
  HH;
  Lab;
  hospital;
  MT;
  Radiology;
  physiotherapy;
  pharmacy;
  chronicPatientId;
  partnerList = [];
  myPartnerListByRadiology = [];
  myPartnerListByLab = [];
  myPartnerListByHH = [];
  myPartnerListByCDM = [];
  myPartnerListByAesthetics = [];
  partnerListByCondition = [];
  myPartnerListByMedicineDelivery = [];
  myPartnerListByMT = [];
  myPartnerListByParnterManagement = [];
  myPartnerListByPharmacy = [];
  partnerReceipt: Array<any> = [];
  partnerReceipts: Array<any> = [];

  /*myPartnerList=[];*/
  patientimagepath = this.global.paientImgPath;
  pagination: boolean = false;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  };
  dataComing: any;

  constructor(public navCtrl: NavController,
              public nnavParams: NavParams,
              public popoverCtrl: PopoverController,
              public myRefferalsService: MyRefferalsService,
              public global: Global,
              private router: Router,
              public partnerService: PartnerService,
              public viewCtrl: ModalController,) {
    this.data = this.router.getCurrentNavigation()?.extras?.state;
    this.CDM = this.data.partnerTypeCDM;
    this.chronicPatientId = this.data.chronicPatientId;
    this.aesthetics = this.data.partnerTypeAesthetics;
    this.pharmacy = this.data.partnerTypepharmacy;
    this.HH = this.data.partnerTypeHH;
    this.MT = this.data.partnerTypeMT;
    this.Radiology = this.data.partnerTypeRadiology;
    this.Lab = this.data.partnerTypeLab;
    this.hospital = this.data.partnerTypeHospital;
    this.physiotherapy = this.data.partnerTypePhysiotherapy;
    console.log("physiotherapy => " , this.physiotherapy);
    console.log("pharmacy => " , this.pharmacy);
    console.log("this.CDM" , this.CDM);
    console.log("this.MD" , this.MD);
    console.log("this.HH" , this.HH);
    console.log("this.MT" , this.MT);
    console.log("this.Radiology " , this.Radiology);
    console.log("this.Lab" , this.Lab);
    console.log("this.aesthetics" , this.aesthetics);
  }

  async popoverMenu(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: event,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

  ngOnInit(): void {
    this.data = this.router.getCurrentNavigation()?.extras?.state;
    this.partnerType = this.data.partnerTypeCDM;

    this.getPage(1);

    this.partnerListByCondition = [];

    console.log(this.partnerType);
    console.log("here");
    console.log(this.data.partnerTypeCDM);

    if (this.CDM == "CDM") {
      console.log(this.data.partnerTypeCDM);
      this.partnerService.getPartnerListByCDM().then(data => {
        this.partnerListByCondition = data;
        console.log(" conditionally partnerListByCDM => ", data);
      })
    }

    if (this.MD == "MD") {
      console.log(this.data.partnerTypeCDM);
      this.partnerService.getPartnerListByMedicineDelivery().then(data => {
        this.partnerListByCondition = data;
        console.log(" conditionally partnerListByMD => ", this.partnerListByCondition);
      })
    }

    if (this.HH == "HH") {
      console.log(this.data.partnerTypeHH);
      this.partnerService.getPartnerListByHH().then(data => {
        this.partnerListByCondition = data;
        console.log(" conditionally partnerListByHH => ", this.partnerListByCondition);
      })
    }

    if (this.MT == "MT") {
      console.log(this.data.partnerTypeMT);
      this.partnerService.getPartnerListByMT().then(data => {
        this.partnerListByCondition = data;
        console.log(" conditionally partnerListByMT=> ", this.partnerListByCondition);
      })
    }

    if (this.Radiology == "Radiology") {
      console.log(this.data.partnerTypeRadiology);
      this.partnerService.getPartnerListByRardiology().then(data => {
        this.partnerListByCondition = data;
        console.log(" conditionally partnerListByRadiology=> ", this.partnerListByCondition);
      })
    }

    if (this.Lab == "Lab") {
      console.log(this.data.partnerTypeLab);
      this.partnerService.getPartnerListByLab().then(data => {
        this.partnerListByCondition = data;
        console.log(" conditionally partnerListByLab => ", this.partnerListByCondition);
      })
    }

    if (this.physiotherapy == "physiotherapy") {
      console.log(this.data.partnerTypePhysiotherapy);
      this.partnerService.getPartnerListByPhysiotheraphy().then(data => {
        this.partnerListByCondition = data;
        console.log(" conditionally partnerListByPhysiotherapy => ", this.partnerListByCondition);
      })
    }

    if (this.aesthetics == "aesthetics") {
      console.log(this.data.partnerTypeAesthetics);
      this.partnerService.getPartnerListByAesthetics().then(data => {
        this.partnerListByCondition = data;
        console.log(" conditionally partnerListByAesthetics => ", this.partnerListByCondition);
      })
    }

    if (this.pharmacy == "pharmacy") {
      console.log(this.data.partnerTypepharmacy);
      this.partnerService.getPartnerListByPharmacy().then(data => {
        this.partnerListByCondition = data;
        console.log(" conditionally partnerList by Pharmacy => ", this.partnerListByCondition);
      })
    }

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }

  getPage(page) {
    this.config.currentPage = page;
    /* this.partnerService.getPartnerList().then(data => {
       if (data.content.length >= 1) {
         this.pagination = true;
         this.partnerList = data.content;
         console.log("partnerList =>", data);
         this.config.currentPage = page;
         this.config.totalItems = data.totalElements;
       } else {
         this.pagination = true;
       }
     })

     this.partnerService.getPartnerListByRardiology().then(data => {
       this.myPartnerListByRadiology = data;
       console.log('myPartnerListByRadiology => ', data);
       this.config.currentPage = page;
       this.config.totalItems = data.totalElements;
     })

     this.partnerService.getPartnerListByLab().then(data => {
       this.myPartnerListByLab = data;
       console.log('myPartnerListByLab => ', data);
       this.config.currentPage = page;
       this.config.totalItems = data.totalElements;
     })

     this.partnerService.getPartnerListByHH().then(data => {
       this.myPartnerListByHH = data;
       console.log('myPartnerListByHH=> ', data);
       this.config.currentPage = page;
       this.config.totalItems = data.totalElements;
     })

     this.partnerService.getPartnerListByCDM().then(data => {
       this.myPartnerListByCDM = data;
       console.log('myPartnerListByCDM=> ', data);
       this.config.currentPage = page;
       this.config.totalItems = data.totalElements;
     })

     this.partnerService.getPartnerListByMedicineDelivery().then(data => {
       this.myPartnerListByMedicineDelivery = data;
       console.log('myPartnerListByMedicineDelivery=> ', data);
       this.config.currentPage = page;
       this.config.totalItems = data.totalElements;
     })

     this.partnerService.getPartnerListByMT().then(data => {
       this.myPartnerListByMT = data;
       console.log('myPartnerListByMT=> ', data);
       this.config.currentPage = page;
       this.config.totalItems = data.totalElements;
     })

     this.partnerService.getPartnerListByParnternManagement().then(data => {
       this.myPartnerListByParnterManagement = data;
       console.log('myPartnerListByParnterManagement=> ', data);
       this.config.currentPage = page;
       this.config.totalItems = data.totalElements;

     })

     this.partnerService.getPartnerListByPharmacy().then(data => {
       this.myPartnerListByPharmacy = data;
       console.log('myPartnerListByPharmacy=> ', data);
       this.config.currentPage = page;
       this.config.totalItems = data.totalElements;
     })*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartnersPage');
  }

}
