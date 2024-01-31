import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PopoverPage} from "../popover/popover.page";
import {HomeHealthService} from "../home-health/home-health.service";
import {Global} from "../globalpath";
import {HomeServiceViewPage} from "../home-service-view/home-service-view.page";
import {ModalController, NavController, NavParams, PopoverController} from "@ionic/angular";
import {ExploreService} from "../explore-services/explore-services.service";
import {PaginationInstance} from "ngx-pagination";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-health',
  templateUrl: './home-health.page.html',
  styleUrls: ['./home-health.page.scss'],
})
export class HomeHealthPage implements OnInit {
  emailPattern = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  tab = '1';
  explore: FormGroup;
  queries: FormGroup;

  loginUser;
  queryList = [];
  patientId;
  pagination: boolean = false;
  DocumentList = [];
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  };

  constructor(public navCtrl: NavController,
              public fb: FormBuilder,
              public navParams: NavParams,
              public exploreservicesService: ExploreService,
              public globals: Global,
              public popoverCtrl: PopoverController,
              public homeHealthService: HomeHealthService,
              public modalCtrl: ModalController,
              private router: Router,
              public global: Global) {
    this.explore = fb.group({
      'name': [null, Validators.required],
      'age': [null],
      'mobileno': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
      'uploadfile': [null],
      'medicalProblem': [null],
      'mstExpoService': fb.group({
        'id': [null]
      }),
      'userid': [],
      'createdate': [],
    });

    {
      this.queries = fb.group({
        'query': [null, Validators.required]
      });
    }
  }

  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.getPage(1);

    this.homeHealthService.getDocumentList().then(resp => {
      console.log("doc", resp);

      this.DocumentList = resp;
      console.log("doc", resp);
    });
  }

  getPage(page) {
    this.config.currentPage = page;
    this.homeHealthService.patientIdByUserId(this.loginUser.userId).then(resp => {
      this.patientId = resp.patientId;
      this.homeHealthService.getQueryLists().then(data => {
        if (data.content.length >= 1) {
          this.pagination = true;
          this.queryList = data.content;
          this.config.currentPage = page;
          this.config.totalItems = data.totalElements;
        } else {
          this.pagination = true;
        }
      })
    })
  }


  onAddRecord(model: any) {
    console.log('this.patientId => ',this.patientId);
    model.patientId = {'patientId': this.patientId};

    this.homeHealthService.addQueries(model).then(resp => {
      console.log('response =>', resp);
      if (resp.success === '1') {
        this.global.showToast('Record Added Successfully', 3000, 'top');
        this.queries.reset();
        this.ngOnInit();

      }
      else {
        this.global.showToasterror('Unable to save Record', 3000, 'top');
      }
    });
  }

 async homeService_view(id) {
    let medication_view = await this.modalCtrl.create({
      component: HomeServiceViewPage,
      componentProps: {
        homeHealthServiceId:id
      },
 });
    medication_view.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeHealthPage');
  }

  query() {
    this.tab = '2';
  }

  sub() {
    this.navCtrl.navigateRoot('/dashboard');
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


  onSubmitquery(exploreData) {
    this.explore.reset();
    this.exploreservicesService.queryLead(exploreData).subscribe(resp => {
      if (resp.status == 'success') {
        this.navCtrl.navigateRoot('/dashboard');
        this.globals.showToast('Mulk E Health Support team Connect with You!', 1000, 'top');
      }
    });
  }

  goBack() {
    console.log("Going back");
    this.router.navigateByUrl('/explore-services');
  }
}
