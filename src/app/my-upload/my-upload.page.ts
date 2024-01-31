import { Component, OnInit } from '@angular/core';
import {MyPrescriptionService} from "../my-prescription/my-prescription.service";
import {MyUploadviewPage} from "../my-uploadview/my-uploadview.page";
import {UpPhotoApplistPage} from "../up-photo-applist/up-photo-applist.page";
import {ModalController, NavController, NavParams} from "@ionic/angular";
import {PaginationInstance} from "ngx-pagination";
import {FileuploadforefferalPage} from "../fileuploadforefferal/fileuploadforefferal.page";
import {FileuploadforsickleavesPage} from "../fileuploadforsickleaves/fileuploadforsickleaves.page";

@Component({
  selector: 'app-my-upload',
  templateUrl: './my-upload.page.html',
  styleUrls: ['./my-upload.page.scss'],
})
export class MyUploadPage implements OnInit {
  loginUser;
  patientId;
  pagination: boolean = false;
  temrDocumentUploadList = [];
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public myPrescriptionService: MyPrescriptionService,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyUploadPage');
  }

  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.getPage(1);
  }

  async ViewImage(imgp, name) {
    let medication_view = await  this.modalCtrl.create({
      component: MyUploadviewPage,
      componentProps:{
        imagepath: imgp,
        name: name
      }
    });
    medication_view.present();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }

  getPage(page) {
    this.config.currentPage = page;
    this.myPrescriptionService.patientIdByUserId(this.loginUser.userId).then(resp => {
      this.patientId = resp.patientId;
      this.myPrescriptionService.getByVisitIdRecordService(page, this.config.itemsPerPage, this.patientId, '', '').then(data => {
        if (data.content.length >= 1) {
          this.pagination = true;
          this.temrDocumentUploadList = data.content;
          this.ngOnInit();
          this.config.currentPage = page;
          this.config.totalItems = data.totalElements;
        } else {
          this.pagination = true;
        }
      });
    });
  }

  async takephoto() {
    let medication_view = await this.modalCtrl.create({
      component: UpPhotoApplistPage,
    });
    medication_view.present();
  }

}
