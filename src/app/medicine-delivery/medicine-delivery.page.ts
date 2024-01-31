import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PopoverPage} from "../popover/popover.page";
import {MedicineDeliveryService} from "../medicine-delivery/medicine-delivery.service";
import {Global} from "../globalpath";
import {MedicineDeliveryViewPage} from "../medicine-delivery-view/medicine-delivery-view.page";
import {ModalController, NavController, NavParams, PopoverController} from "@ionic/angular";
import {ExploreService} from "../explore-services/explore-services.service";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";
import {Router} from "@angular/router";
import {PaginationInstance} from "ngx-pagination";
import {MedicalTourismViewPage} from "../medical-tourism-view/medical-tourism-view.page";

@Component({
  selector: 'app-medicine-delivery',
  templateUrl: './medicine-delivery.page.html',
  styleUrls: ['./medicine-delivery.page.scss'],
})
export class MedicineDeliveryPage implements OnInit {
  appId;
  image_path;
  docOriginalName;
  currentFile;
  uploadedURL: any = {};
  Category: Array<any> = [];
  userDetails;
  imageFileName;
  myLabReportsId;
  loginUser;
  myLabReportsList = [];
  DocumentList = [];
  medicineDeliveryList = [];
  patientId;
  pagination: boolean = false;
  temrDocumentUploadList = [];
  /*  countryList: Array<any> = [];
    hospitalList: any = {};
    departmentList: any = {};*/
  filtersId: any;
  Hospital: any;
  genderList;
  department: any;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  };

  tab = '1';
  emailPattern = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  // tab = '1';
  explore!: FormGroup;
  medicineDelivery: FormGroup;
  patientimagepath = this.global.paientImgPath;
  partnerListByCondition: Array<any> = [];


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fb: FormBuilder,
              public exploreservicesService: ExploreService,
              public medicineDeliveryService: MedicineDeliveryService,
              public modalCtrl: ModalController,
              public global: Global,
              public appointmentService: AppointmentlistService,
              public viewCtrl: ModalController,
              private router: Router,
              public popoverCtrl: PopoverController,) {
    this.medicineDelivery = fb.group({
      enquiry: [null, Validators.required],
      createdDate: [null, Validators.required],
      doc_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    })

  }

  ngOnInit() {
    this.medicineDeliveryService.getPartnersByPharmacy().then(data => {
      this.partnerListByCondition = data;
      console.log(" conditionally partnerListByPharmacy => ", this.partnerListByCondition);
    });

    this.loginUser = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.getPage(1);

    this.medicineDeliveryService.getDocumentList().then(resp => {
      // console.log("doc", resp);

      this.DocumentList = resp;
      // console.log("doc", resp);
    });
  }

  onAddRecord(model: any) {
    console.log(model);
    this.medicineDeliveryService.addMEdicineDelivery(model).then(resp => {
      console.log('response =>', resp);
      if (resp.success === '1') {
        this.global.showToast('Record Added Successfully', 3000, 'top');
        this.ngOnInit();
      }
      else {
        this.global.showToasterror('Unable to save Record', 3000, 'top');
      }
    });
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


  getPage(page) {
    this.config.currentPage = page;
    this.medicineDeliveryService.patientIdByUserId(this.loginUser.userId).then(resp => {
      this.patientId = resp.patientId;
      this.medicineDeliveryService.getMedicineDeliveryList().then(data => {
        if (data.content.length >= 1) {
          this.pagination = true;
          this.medicineDeliveryList = data.content;
          this.config.currentPage = page;
          this.config.totalItems = data.totalElements;
        } else {
          this.pagination = true;
        }
      })
    })
  }


  async medicineDelivery_view(id) {
    let medication_view = await  this.modalCtrl.create({
      component: MedicineDeliveryViewPage,
        componentProps: {
        medicineDeliveryId: id
      },
    });
    medication_view.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicineDeliveryvIEWPage');
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }

  query() {
    this.tab = '2';
  }

  sub() {
    this.router.navigateByUrl('/dashboard');
  }

  addFile(form: any) {
    console.log("form ", this.medicineDelivery.controls['enquiry'].value);
    if (form.file != 0) {
      const formData: FormData = new FormData();
      const model: any = {};
      formData.append('file', this.currentFile, this.currentFile.name);
      this.appointmentService.addFileUplaodService(formData).then(resp => {
        this.uploadedURL = resp;
        model.duPath = this.uploadedURL;
        model.patientId = {'patientId': parseInt(this.patientId)};
        model.duName = form.name;
        model.duFileName = this.uploadedURL;
        model.enquiry = this.medicineDelivery.controls['enquiry'].value;
        /*  model.createdDate = this.medicineDelivery.controls.createdDate.value;*/
        this.appointmentService.addRecordForMedicineDelivery(model).then(data => {
          console.log(data);
          this.ngOnInit();
          if (data.success == '1') {
            this.global.showToast(data.msg, 1000, 'top');
            this.viewCtrl.dismiss();
          } else {
            this.medicineDelivery.reset();
            this.global.showToast(data.msg, 1000, 'top');
          }
        });
      });
    } else {
      this.global.showToastwaring('Please Enter Details', 1000, 'top');
    }
  }


  onFileChange(event) {
    this.currentFile = event.target.files[0];
    this.docOriginalName = this.currentFile.name;
  }

  onSubmitquery(exploreData) {
    this.explore.reset();
    this.exploreservicesService.queryLead(exploreData).subscribe(resp => {
      if (resp.status == 'success') {
        this.router.navigateByUrl('/dashboard');
        this.global.showToast('Mulk E Health Support team Connect with You!', 1000, 'top');
      }
    });
  }

  goBack() {
    console.log("Going back");
    this.router.navigateByUrl('/explore-services');
  }

}
