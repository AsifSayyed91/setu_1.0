import { Component, OnInit } from '@angular/core';
import {MyRefferalsService} from "../my-refferals/my-refferals.service";
import {ModalController, NavController, NavParams} from "@ionic/angular";

@Component({
  selector: 'app-explorewise-partners',
  templateUrl: './explorewise-partners.page.html',
  styleUrls: ['./explorewise-partners.page.scss'],
})
export class ExplorewisePartnersPage implements OnInit {
  tab = '1';
  partnerType;
  partnerListByCondition: Array<any> = [];
  imageForCDM;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public myRefferalsService: MyRefferalsService,
              public  viewCtrl: ModalController,
              public modalCtrl: ModalController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExplorewisePartnersPage');
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

  ngOnInit() {
  }

  chronicPatientManagment() {
    this.navCtrl.navigateForward('/partners',{state:{partnerTypeCDM:'CDM'}});
  }


  Aesthetics(){
    this.navCtrl.navigateForward('/partners',{state:{partnerTypeAesthetics:'aesthetics'}});
  }



  pharmacy() {
    this.navCtrl.navigateForward('/partners',{state:{partnerTypepharmacy:'pharmacy'}});
  }

  homehealth() {
    this.navCtrl.navigateForward('/partners',{state:{partnerTypeHH:'HH'}});
  }

  medicalTourism(){
    this.navCtrl.navigateForward('/partners',{state:{partnerTypeMT:'MT'}});
  }

  radiology(){
    this.navCtrl.navigateForward('/partners',{state:{partnerTypeRadiology:'Radiology'}});
  }

  Lab(){
    this.navCtrl.navigateForward('/partners',{state:{partnerTypeLab:'Lab'}});
  }


  Hospitals(){
    this.navCtrl.navigateForward('/partners',{state:{partnerTypeHospital:'hospital'}});
  }


  Physiotherapy(){
    this.navCtrl.navigateForward('/partners',{state:{partnerTypePhysiotherapy:'physiotherapy'}});
  }


  /*Lab() {
     this.navCtrl.setRoot(PartnersPage);
   }*/

  /*  diagnostics() {
      this.navCtrl.setRoot(PartnersPage);
    }*/

  /*homehealth() {
    this.navCtrl.setRoot(PartnersPage);
  }*/

  /*medicalTourism() {
    this.navCtrl.setRoot(PartnersPage);
  }*/

  /*diagnostics1() {
    this.navCtrl.setRoot(PartnersPage);
  }
*/

}
