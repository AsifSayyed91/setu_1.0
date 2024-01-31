import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PopoverPage} from "../popover/popover.page";
import {MedicalTourismViewPage} from "../medical-tourism-view/medical-tourism-view.page";
import {MedicalTourismService} from "../medical-tourism/medical-tourism.service";
import {Global} from "../globalpath";
import {ModalController, NavController, NavParams, PopoverController, ToastController} from "@ionic/angular";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";
import {PaginationInstance} from "ngx-pagination";
import {Router} from "@angular/router";

@Component({
  selector: 'app-medical-tourism',
  templateUrl: './medical-tourism.page.html',
  styleUrls: ['./medical-tourism.page.scss'],
})
export class MedicalTourismPage implements OnInit {
  selectedCountry: any;

  loginUser;
  medicalTourismList = [];
  patientId;
  departmentId;
  countryId;
  pagination: boolean = false;
  temrDocumentUploadList = [];
  DocumentList = [];
  countryList: Array<any> = [];
  countrylist = [];
  hospitalList: any = {};
  departmentList: any[];
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

  currentFile;
  uploadedURL: any = {};
  Category: Array<any> = [];
  medicalTourism: FormGroup;
  docOriginalName;
  /* myForm = new FormGroup({
     name: new FormControl('', [Validators.required, Validators.minLength(3)]),
     file: new FormControl('', [Validators.required]),
     fileSource: new FormControl('', [Validators.required]),
     Categary: new FormControl('', null),
   });*/
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public fb: FormBuilder,
              private medicalTourismService: MedicalTourismService,
              public toastCtrl: ToastController,
              public global: Global,
              public modalCtrl: ModalController,
              public popoverCtrl: PopoverController,
              public appointmentService: AppointmentlistService,
              public viewCtrl: ModalController,
              private router: Router,
              ) {
    this.medicalTourism = fb.group({
      'enquiry': ['', Validators.required],
      'file': [null, Validators.required],
      'name': [null, Validators.required],
      'countryId': [null, Validators.required],

      // 'countryId': fb.group({
      //   'countryId': [null, Validators.required]
      // }),
      'departmentId': [null, Validators.required]

      // 'departmentId':fb.group({
      //   'departmentId': [null, Validators.required]
      // })
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



  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.getPage(1);

    this.medicalTourismService.getDocumentList().then(resp => {
      console.log("doc", resp);

      this.DocumentList = resp;
      console.log("doc", resp);
    });
    this.medicalTourismService.getCountryList().subscribe((data: any) => {
      this.countrylist = data.content;
      console.log('countryList =>', this.countrylist);
    });
    this.medicalTourismService.getHospitalList().subscribe((data: any) => {
      this.hospitalList = data;
      console.log('hospitalList =>', this.hospitalList);
    });

    this.medicalTourismService.getDepartmentList().subscribe((data: any) => {
      this.departmentList = data.content;
      console.log('departmentList =>', this.departmentList);
    })


  }

  onSelectCountrty(id) {
    console.log('CountryId =>', id);
    this.countryId = id;
  }

  onSelectDepartment(id: any) {
    console.log('departmentId => ', id);
    this.departmentId = id;
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }

  onFileChange(event) {
    console.log('file change called');
    this.currentFile = event.target.files[0];
    this.docOriginalName = this.currentFile.name;
  }


  getHospitalByCountryFilter(countryId) {
    const cid = countryId.target.value;
    this.medicalTourismService.getHospitalListByCountryId(cid).subscribe((data: any) => {
      this.hospitalList = data;
      this.hospitalList = {
        "content": data
      };
      console.log('hospitalList =>', this.hospitalList);
    })
  }


  getCountryList(countryId){
    this.medicalTourismService.getCountryList().subscribe((data:any)=>{
      this.countryList = data;
      console.log("country list => ",this.countryList)
    })
  }


  getDepartmentByHospitalFilter(hospitalId) {
    const hid = hospitalId.target.value;
    this.medicalTourismService.getDepartmentListByHospitalId(hid).subscribe((data: any) => {
      this.departmentList = data;
      console.log('departmentList =>', this.departmentList);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicalTourism');
  }

  onAddRecord(model: any) {
    console.log(model);
    this.medicalTourismService.addMedicalTourims(model).then(resp => {
      console.log('response =>', resp);
      if (resp.success === '1') {
        this.global.showToast('Record Added Successfully', 3000, 'top');
        this.medicalTourism.reset();
        this.ngOnInit();
      }
      else {
        this.global.showToasterror('Unable to save Record', 3000, 'top');
      }
    });
  }


  addFile(form: any) {
    console.log(form);
    const model: any = {};
    if (form.file != null) {
      const formData: FormData = new FormData();
      formData.append('file', this.currentFile, this.currentFile.name);
      console.log("formData => ");
      console.log(formData);
      if(formData.has('file')){
        this.appointmentService.addFileUplaodService(formData).then(resp => {
          console.log(resp);
          this.uploadedURL = this.global.paientImgPath + resp;
          this.uploadedURL = resp;
          model.duPath = this.uploadedURL;
          model.patientId = {'patientId': parseInt(this.patientId)};
          model.duName = form.name;
          model.duFileName = this.uploadedURL;
          model.enquiry = this.medicalTourism.controls['enquiry'].value;
          // model.countryId = {'countryId': this.countryId};
          if(this.countryId != null) {model.countryId = {'countryId': parseInt(this.countryId)};}
          if(this.departmentId != null) {model.departmentId = {'departmentId': parseInt(this.departmentId)};}
          //model.departmentId = {'departmentId': this.departmentId};
          this.appointmentService.addRecordForMedicalTourism(model).then(data => {
            console.log(data);
            model.patientId = {'patientId': parseInt(this.patientId)};
            this.ngOnInit();
            if (data.success == '1') {
              this.global.showToast(data.msg, 1000, 'top');
              this.viewCtrl.dismiss();
            } else {
              this.medicalTourism.reset();
              this.global.showToast(data.msg, 1000, 'top');
            }
          });

        });
      }else{

        console.log('no-file.png');
        this.uploadedURL = this.global.paientImgPath + 'no-file.png';
        this.uploadedURL = 'no-file.png';
        model.duPath = this.uploadedURL;
        model.patientId = {'patientId': parseInt(this.patientId)};
        model.duName = form.name;
        model.duFileName = this.uploadedURL;
        model.enquiry = this.medicalTourism.controls['enquiry'].value;
        // model.countryId = {'countryId': this.countryId};
        if(this.countryId != null) {model.countryId = {'countryId': parseInt(this.countryId)};}
        if(this.departmentId != null) {model.departmentId = {'departmentId': parseInt(this.departmentId)};}
        //model.departmentId = {'departmentId': this.departmentId};
        this.appointmentService.addRecordForMedicalTourism(model).then(data => {
          console.log(data);
          model.patientId = {'patientId': parseInt(this.patientId)};
          this.ngOnInit();
          if (data.success == '1') {
            this.global.showToast(data.msg, 1000, 'top');
            this.viewCtrl.dismiss();
          } else {
            this.medicalTourism.reset();
            this.global.showToast(data.msg, 1000, 'top');
          }
        });

      }
    } else {
      console.log('no-file.png');
      this.uploadedURL = this.global.paientImgPath + 'no-file.png';
      this.uploadedURL = 'no-file.png';
      model.duPath = this.uploadedURL;
      model.patientId = {'patientId': parseInt(this.patientId)};
      model.duName = form.name;
      model.duFileName = this.uploadedURL;
      model.enquiry = this.medicalTourism.controls['enquiry'].value;
      // model.countryId = {'countryId': this.countryId};
      if(this.countryId != null) {model.countryId = {'countryId': parseInt(this.countryId)};}
      if(this.departmentId != null) {model.departmentId = {'departmentId': parseInt(this.departmentId)};}
      //model.departmentId = {'departmentId': this.departmentId};
      this.appointmentService.addRecordForMedicalTourism(model).then(data => {
        console.log(data);
        model.patientId = {'patientId': parseInt(this.patientId)};
        this.ngOnInit();
        if (data.success == '1') {
          this.global.showToast(data.msg, 1000, 'top');
          this.viewCtrl.dismiss();
        } else {
          this.medicalTourism.reset();
          this.global.showToast(data.msg, 1000, 'top');
        }
      });


      // this.global.showToastwaring('Please Enter Details', 1000, 'top');
    }
  }

  selectCountry(cId) {
    this.filtersId = cId;
  }

  selectHospital(hospitalId) {
    this.Hospital = hospitalId;
    console.log('hospitalId => ' + this.Hospital);
  }

  selectDepartment(departmentid) {
    this.department = departmentid;
    console.log('department => ', this.department);
  }

  getPage(page) {
    this.config.currentPage = page;
    this.medicalTourismService.patientIdByUserId(this.loginUser.userId).then(resp => {
      this.patientId = resp.patientId;
      this.medicalTourismService.getMedicalTourismList().then(data => {
        if (data.content.length >= 1) {
          this.pagination = true;
          this.medicalTourismList = data.content;
          this.config.currentPage = page;
          this.config.totalItems = data.totalElements;
        } else {
          this.pagination = true;
        }
      })
    })
  }

 async medicalTourism_view(id) {
    let medication_view = await  this.modalCtrl.create({
      component: MedicalTourismViewPage,
      componentProps: {
        medicalTourismId: id
      },
 });
    medication_view.present();
  }

  goBack() {
    console.log("Going back");
    this.router.navigateByUrl('/explore-services');
  }
  inputFilter(event: any) {
    const pattern = /^[a-zA-Z\s]*$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

}
