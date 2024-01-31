import { Component, OnInit } from '@angular/core';
import {MySickLeavesService} from "../my-sick-leaves/my-sick-leaves.service";
import {ModalController, NavController, NavParams} from "@ionic/angular";
import {PaginationInstance} from "ngx-pagination";
import {FileuploadforsickleavesPage} from "../fileuploadforsickleaves/fileuploadforsickleaves.page";
import {FileuploadforefferalPage} from "../fileuploadforefferal/fileuploadforefferal.page";
import {ModalpopupPage} from "../modalpopup/modalpopup.page";

@Component({
  selector: 'app-my-sick-leaves',
  templateUrl: './my-sick-leaves.page.html',
  styleUrls: ['./my-sick-leaves.page.scss'],
})
export class MySickLeavesPage implements OnInit {
  loginUser;
  mySickLeavesList = [];
  patientId;
  pagination: boolean = false;

  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public mySickLeavesService: MySickLeavesService) {
  }

  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.getPage(1);
  }


  /*sickLeaves_view(id) {
    let medication_view = this.modalCtrl.create(MysickleavesviewPage, {mySickLeavesId: id});
    medication_view.present();
  }*/


  sickLeaves_view(sickLeaves) {
    this.navCtrl.navigateForward('/mysickleavesview', {state: sickLeaves});
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }


  async ViewImage(imgp, name) {
    let medication_view = await  this.modalCtrl.create({
      component: FileuploadforefferalPage,
      componentProps:{imagepath: imgp, name: name}
    });
    medication_view.present();
  }

  async takephoto(id) {
    let medication_view = await this.modalCtrl.create({
      component: FileuploadforsickleavesPage,
      componentProps:  {
        appId: id
      }
    });
    medication_view.present();
  }

  getPage(page) {
    this.config.currentPage = page;
    this.mySickLeavesService.patientIdByUserId(this.loginUser.userId).then(resp => {
      this.patientId = resp.patientId;
      this.mySickLeavesService.getSickleavesListByPatient(this.patientId).then(data => {
        if (data) {
          this.pagination = true;
          this.mySickLeavesList = data;
          console.log('this.mySickLeavesList=>', data);
          console.table(data);
          this.config.currentPage = page;
          this.config.totalItems = data.totalElements;
        } else {
          this.pagination = true;
        }
      })
    })
  }
}
