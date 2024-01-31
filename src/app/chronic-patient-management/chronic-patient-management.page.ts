import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChronicPatinetManagementService} from "../chronic-patient-management/chronic-patinet-management.service";
import {Global} from "../globalpath";
import {ChronicPatientManagementViewPage} from "../chronic-patient-management-view/chronic-patient-management-view.page";
import {ModalController, NavController, NavParams, Platform, PopoverController, ToastController} from "@ionic/angular";
import {PaginationInstance} from "ngx-pagination";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chronic-patient-management',
  templateUrl: './chronic-patient-management.page.html',
  styleUrls: ['./chronic-patient-management.page.scss'],
})
export class ChronicPatientManagementPage implements OnInit {
  chronicPatientList = [];
  DocumentList = [];
  chronicDeasisList =[];
  patientId;
  chronicDeasisId;
  chronicPatientId;
  pagination: boolean = false;
  loginUser;
  isIOS: boolean = false;
  isAndroid: boolean= false;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  };

  chronicPatient: FormGroup;
  // @ViewChild(Nav) nav: Nav;
  constructor(public navCtrl: NavController,
              public viewCtrl: ModalController,
              public navParams: NavParams,
              public fb: FormBuilder,
              public toastCtrl: ToastController,
              public global: Global,
              private router: Router,
              public chronicPatientManagementService: ChronicPatinetManagementService,
              public toastController: ToastController,
              public modalCtrl: ModalController,
              public popoverCtrl: PopoverController) {
    this.chronicPatient = fb.group({
      'enquiry': [null, Validators.required],
      // 'chronicDeasis': [null, Validators.required],
      'chronicDiseasId': fb.group({
        'chronicDiseasId': [null, Validators.required]
      })
    });
  }


  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.getPage(1);

    this.chronicPatientManagementService.getDocumentList().then(resp => {
      console.log("doc", resp);
    });
    this.chronicPatientManagementService.getChronicDeasiseList().then(resp =>{
      this.chronicDeasisList = resp;
      console.log("ChronicDeasisList => ", this.chronicDeasisList)
    })
  }
  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }


  getPage(page) {
    this.config.currentPage = page;
    this.chronicPatientManagementService.patientIdByUserId(this.loginUser.userId).then(resp => {
      this.patientId = resp.patientId;
      this.chronicPatientManagementService.getChronicDeasiseList().then(data => {
        this.pagination = true;
        this.chronicPatientList = data.content;
        this.config.currentPage = page;
        this.config.totalItems = data.totalElements;
      })
    })
  }

  onAddRecord(model: any) {
    const nestedControl = this.chronicPatient.get('chronicDiseasId.chronicDiseasId');

    console.log('this.patientId => ',this.patientId)
    model.patientId = {'patientId': this.patientId};
    model.chronicDeasisId = {'chronicDeasisId': this.chronicDeasisId};
    this.chronicPatientManagementService.addChronicPatiet(model).then(resp => {
      console.log('response =>', resp);
      if (resp.success === '1') {
        this.global.showToast('Record Added Successfully', 3000, 'top');
        this.ngOnInit();
        this.chronicPatient.reset();
      }
      else {
        this.global.showToasterror('Unable to save Record', 3000, 'top');
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChronicPatientManagementPage');
  }

  async chronicPatinet_view(id) {
    const modal = await this.modalCtrl.create({
      component: ChronicPatientManagementViewPage,
      componentProps: {
        id
      }
    });
  }


  goBack() {
    console.log("Going back");
    this.router.navigateByUrl('/explore-services');
  }



}
