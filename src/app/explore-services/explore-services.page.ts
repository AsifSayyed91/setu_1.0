import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExploreService} from "../explore-services/explore-services.service";
import {Global} from "../globalpath";
import {LoadingController, NavController, NavParams, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-explore-services',
  templateUrl: './explore-services.page.html',
  styleUrls: ['./explore-services.page.scss'],
})
export class ExploreServicesPage implements OnInit {
  // @ViewChild(Nav) nav: Nav;
  myForm!: FormGroup;
  explore: FormGroup;
  emailPattern = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  tab = '1';
  serviceslist: Array<any> = [];
  servicesDatalist: Array<any> = [];
  serviceIcon = this.globals.serviceIconimage;
  servicesData;
  loginUser: any;
  username: string = "";
  imagepath: any;
  selectedfile: any;
  base64: any;
  imagebrows: any;
  unitData: Array<any> = [];
  filterUnitId: any;
  detailForm: FormGroup;
  unitId: any;
  serviceList: Array<any> = [];
  today;
  maxDate: Date = new Date();
  disable: Boolean = true;
  time;
  doctorRating;
  doctorReview;
  insurance: Boolean = false;
  public options: any = {
    locale: {format: 'yyyy-MM-DD'},
    alwaysShowCalendars: false,
    singleDatePicker: true,
    showDropdowns: true,
    minDate: this.maxDate,
  };

  filtersId: any;
  cityList: Array<any> = [];
  specailtyList: Array<any> = [];

  constructor(public fb: FormBuilder,
              public navCtrl: NavController,
              private router: Router,
              public navParams: NavParams,
              public globals: Global,
              public loadingCtrl: LoadingController,
              public exploreservicesService: ExploreService,
              public toast: ToastController) {
    this.detailForm = fb.group({
      'spId': [null],
      'docspId': [null]
    });
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExploreServicesPage');
  }

  medicine() {
    this.router.navigateByUrl('/medicine-delivery');
  }

  diagnostics() {
    this.router.navigateByUrl('/diagnostics-labs');
  }

  homehealth() {
    this.router.navigateByUrl('/home-health');
  }

  /*  chronicPatientManagment() {
      this.navCtrl.setRoot(ChronicPatientManagementPage);
    }*/

  chronicPatientManagment() {
    // this.navCtrl.setRoot(ChronicPatientManagementPage);
    this.router.navigateByUrl('/chronic-patient-management');
  }

  medicalTourism() {
    this.router.navigateByUrl('/medical-tourism');
  }

  /*diagnostics1() {
    this.navCtrl.setRoot(MyRefferalsPage);
  }*/

  diagnostics1() {
    this.router.navigateByUrl('/diagnostics');
  }


  Lab() {
    this.router.navigateByUrl('/labs');
  }

  Physiotherapy() {
    this.router.navigateByUrl('/physiotherapy');
  }


  Aesthetics() {
    this.router.navigateByUrl('/aesthetics');
  }


  remote() {
    this.router.navigateByUrl('/remote-patient');
  }

  ngOnInit(): void {

    this.exploreservicesService.getServiceslist().then(data => {
      this.serviceslist = data;
    });
    this.loginUser = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.explore.get('userid')?.setValue(this.loginUser.userId);
    var date = new Date();
    this.explore.get('createdate')?.setValue(date);
    this.exploreservicesService.getSpecalityList().subscribe((data: any) => {
      this.specailtyList = data;

      this.exploreservicesService.getCityList().subscribe((data: any) => {
        this.cityList = data;
      });

    });
  }

  getServiceData(id) {
    this.tab = '2';
    this.exploreservicesService.getDataListByServiceId(id).then(data => {
      this.servicesDatalist = data;
      console.log("aaaaaaaaaaaaaaaaaa", this.servicesDatalist)
    });
  }

  fileChangePicIcon(event) {
    this.selectedfile = event.target.files[0];
    let form = new FormData();
    form.append('file', this.selectedfile);
    this.exploreservicesService.addfile(form).then(resp => {
      this.imagepath = this.serviceIcon + resp;
      this.imagebrows = 5;
      this.base64 = resp;
      this.explore.get('uploadfile')?.setValue(resp);
    });
  }

  getServiceSummary(id) {
    this.tab = '3';
    this.explore.get('mstExpoService')?.get('id')?.setValue(id);
    this.exploreservicesService.getDataByServiceId(id).then(data => {
      this.servicesData = data;
    });

    this.exploreservicesService.getUnitList().then(data => {
      console.log('lists', data);
      this.unitData = data;
    });
  }

  query() {
    this.tab = '4';
  }

  viewData(id) {
    if (id == 1) {
      this.tab = '2';
    }
    else if (id == 2) {
      this.tab = '3';
    }
    else if (id == 3) {
      this.tab = '4';
    }
    else {
      this.navCtrl.navigateRoot('/dashboard');
    }
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

  selectSpecailty(sId) {
    this.filtersId = sId;
  }

  selectedUnitValue(unitId) {
    this.filterUnitId = unitId;
  }


  goBack() {
    console.log("Going back");
    this.navCtrl.navigateRoot('/dashboard');
  }


}
