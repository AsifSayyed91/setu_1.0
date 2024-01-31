import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MyComplaintsViewPage} from "../my-complaints-view/my-complaints-view.page";
import {Global} from "../globalpath";
import {MyComplaintsService} from "../my-complaints/my-complaints.service";
import {ModalController, NavController, NavParams, ToastController} from "@ionic/angular";
import {PaginationInstance} from "ngx-pagination";

@Component({
  selector: 'app-my-complaints',
  templateUrl: './my-complaints.page.html',
  styleUrls: ['./my-complaints.page.scss'],
})
export class MyComplaintsPage implements OnInit {
  loginUser;
  myComplaintsList = [];
  patientId;
  pagination: boolean = false;
  temrDocumentUploadList = [];
  DocumentList = [];
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  };


  myComplaints: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fb: FormBuilder,
              private myComplaintsService: MyComplaintsService,
              public toastCtrl: ToastController,
              public global: Global,
              public modalCtrl: ModalController) {
    this.myComplaints = fb.group({
      'complaint': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.getPage(1);

    this.myComplaintsService.getDocumentList().then(resp => {
      console.log("doc", resp);

      this.DocumentList = resp;
      console.log("doc", resp);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyComplaintsPage');
  }

  onAddRecord(model: any) {
    console.log(model);
    model.patientId = {'patientId': this.patientId};
    this.myComplaintsService.addComplaints(model).then(resp => {
      console.log('response =>', resp);
      if (resp.success === '1') {
        this.global.showToast('Record Added Successfully', 3000, 'top');
        this.myComplaints.reset();
        this.ngOnInit();
      }
      else {
        this.global.showToasterror('Unable to save Record', 3000, 'top');
      }
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }

  getPage(page) {
    this.config.currentPage = page;
    this.myComplaintsService.patientIdByUserId(this.loginUser.userId).then(resp => {
      this.patientId = resp.patientId;
      this.myComplaintsService.getComplaitsListsByPatientId(this.patientId).then(data => {
        if (data) {
          this.pagination = true;
          this.myComplaintsList = data;
          this.config.currentPage = page;
          this.config.totalItems = data.totalElements;
        } else {
          this.pagination = true;
        }
      })
    })
  }


  /* complaints_view(id) {
     let medication_view = this.modalCtrl.create(MyComplaintsViewPage, {myComplaintsId: id});
     medication_view.present();
   }*/

  complaints_view(id ) {
    console.log('going to mycomplainnts Page with id =>',id);
    this.navCtrl.navigateForward('/my-complaints-view',  {state: id});
  }


}
