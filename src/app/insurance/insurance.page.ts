import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PopoverPage} from "../popover/popover.page";
import {ProfileService} from "../profile/profile.service";
import {Global} from "../globalpath";
import {NewBookAppointmentService} from "../new-book-appointment/new-book-appointment-service";
import {LoadingController, ModalController, NavController, NavParams, PopoverController} from "@ionic/angular";
import {RegisterService} from "../account-register/account.service";
import {AppointmentServiceFilter} from "../book-appointment-filter/book-appointmentfilter.service";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";
import {ExploreService} from "../explore-services/explore-services.service";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.page.html',
  styleUrls: ['./insurance.page.scss'],
})
export class InsurancePage implements OnInit {
  LanguageList: Array<any> = [];
  filterUnitId: any;
  cityList: Array<any> = [];
  cityListForDubai: Array<any> = [];
  symtomsList: Array<any> = [];
  mstUnitList: Array<any> = [];
  specailtyList: Array<any> = [];
  genderList;
  filterGenderId: any;
  insuranceData: Array<any> = [];
  unitList: Array<any> = [];
  spec;
  searchTerm: any = '';
  Stepper = 'step1';
  insuranceList: Array<any> = [];
  doctorList: Array<any> = [];
  constaccpect: Boolean = false;
  rightstaccpect: Boolean = false;
  appointmentForm: FormGroup;
  registration: FormGroup;
  todays: any = new Date();
  datePipe = new DatePipe('en-US');
  date: Date = new Date();
  minimumdate: any = new Date();
  afterday: any = new Date();
  InsuranceShow: Boolean = false;
  disableBookAppBtn: Boolean = false;
  visit_id: any;
  selectedDoctor: any;
  title = 'Hospital';
  setval;
  selectedService: any;
  selectedday: any;
  loginUser: any;
  loginUser1: any;
  isInsuranceCovered: Boolean = false;
  scheduleList: Array<any> = [];
  serviceList: Array<any> = [];
  isVartualConsultation: Boolean = true;
  slotConfirm = false;
  DirectConsultation: Boolean = true;
  SelfConsultation: Boolean = true;
  reset: Boolean = false;
  specialityList: Array<{}> = [];
  symtomList: Array<{}> = [];
  data;
  unitId;
  filtershow: Boolean = false;
  sortshow: Boolean = false;
  filtersId: any;
  filterCityId: any;
  filterLanguageId: any;
  languageId: any;
  filterSymptomsId: any;
  filtersymptomsId: any;
  filterServiceId: any;
  filterInsuranceId: any;
  UnitId: any;
  filterByPrice: any = '0';
  filterByRating: any = '0';
  filterByFollowe: any = '0';
  showList: boolean = false;
  selectedInsuranceObject: any;
  insuId;
  insuranceImgPath = this.global.paientImgPath;
  patientimagepath = this.global.paientImgPath;
  search_query: any = {};

  constructor(public navCtrl: NavController,
              public popoverCtrl: PopoverController,
              public newBookAppointmentService: NewBookAppointmentService,
              public profileservice: ProfileService,
              public registerService: RegisterService,
              public loadingCtrl: LoadingController,
              public fb: FormBuilder,
              public global: Global,
              public navParams: NavParams,
              public appointmentFilterService: AppointmentServiceFilter,
              public appointmentServices: AppointmentlistService,
              public appointmentServicesFilter: AppointmentServiceFilter,
              public exploreservicesService: ExploreService,
              private router: Router,
              public bookAppointmentService: AppointmentServiceFilter,
              public viewCtrl: ModalController) {
    this.appointmentForm = fb.group({
      'appointmentReason': [null, Validators.required],
      'appointmentService': [null, Validators.required],
      'appointmentDate': [null, this.todays],
      'appointmentTime': [null, Validators.required],
      'location': [null, Validators.required],
      'speciality': [null, Validators.required],
      'symptoms': [null, Validators.required],
      'hospital': [null, Validators.required],
      'language': [null, Validators.required],
      'gender': [null, Validators.required],
      'unit': [null, Validators.required],
      'insurance': [null, Validators.required],
      'appointmentAmount': [0],
      'appointmentUnitId': this.fb.group({
        'unitId': [null]
      }),
      'isCheckConsent1': [false],
      'isCheckConsent2': [false],
      'appointmentUserId': [],
      'insuranceCoveredAppointment': [true],
      'staffId': [],
      'isVartualConsultation': [true]
    });
    this.registration = fb.group({
      'userIdDocFp': [false],
      'userInsuranceCardNo': [null],
      'userInsuranceCardFp': [false],
      'userInsuranceDateOfIssue': [null],
      'userInsuranceDateOfExp': [null],
      'userInsuranceId': [null],
    });
    this.todays = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.minimumdate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.appointmentForm.get('appointmentDate')?.setValue(this.todays);
    var datePipe = new DatePipe('en-US');
    var d = new Date();
    d.setDate(d.getDate() + 60);
    this.afterday = datePipe.transform(d, 'yyyy-MM-dd');
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


  Profile() {
    this.viewCtrl.dismiss();
    this.router.navigateByUrl('/profile');
  }

  bookAppBtn() {
    if (this.loginUser1.userFirstname != null && this.loginUser1.userFirstname != '' && this.loginUser1.userFirstname != undefined &&
      this.loginUser1.userLastname != null && this.loginUser1.userLastname != '' && this.loginUser1.userLastname != undefined &&
      this.loginUser1.userEmail != null && this.loginUser1.userEmail != '' && this.loginUser1.userEmail != undefined &&
      this.loginUser1.userName != null && this.loginUser1.userName != '' && this.loginUser1.userName != undefined &&
      this.loginUser1.userMobile != null && this.loginUser1.userMobile != '' && this.loginUser1.userMobile != undefined &&
      this.loginUser1.userDob != null && this.loginUser1.userDob != '' && this.loginUser1.userDob != undefined
    ) {
      this.disableBookAppBtn = true;
    }

  }

  resetForm() {
    this.appointmentForm.reset();
    console.log('reset called');
    this.cityListForDubai = [];
    this.specailtyList = [];
    this.symtomsList = [];
    this.mstUnitList = [];
    this.LanguageList = [];
    this.insuranceList = [];
    this.mstUnitList = [];
    this.insuranceList = [];
    this.LanguageList = [];
    this.genderList = [];
    this.ngOnInit();
    this.todays = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.minimumdate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.appointmentForm.get('appointmentDate')?.setValue(this.todays);
  }


  selectSpeci(specId) {
    this.newBookAppointmentService.getDoctorListBySpeciality(this.todays, specId, this.loginUser1.userId, this.loginUser.userCityId.cityId, {}).subscribe(data => {
      this.doctorList = [];
      if (data.list.length != 0) {
        this.doctorList = data.list;
        this.global.showToast('Doctor Available', 100, 'top');
      } else {
        this.global.showToasterror('Doctor Not Available', 100, 'top');
      }
    })
  }


  //for search doctor
  searchDoctor(event: any) {
    console.log("event :", event);
    this.search_query.staffName = event.target.value;
    this.bookAppointmentService.getDoctorLists(this.todays, this.appointmentForm.get('appointmentService')?.value, this.loginUser.userId, '1', '100', this.loginUser.userCityId.cityId, this.search_query).subscribe((data: any) => {
      this.doctorList = data.list;
      this.selectedday = data.day;
      console.log(data);
    });
    // }
  }


  selectSymp(sympId) {
    this.newBookAppointmentService.getDoctorListBySymtoms(this.todays, sympId, this.loginUser1.userId, this.loginUser.userCityId.cityId, {}).subscribe(data => {
      if (data.list.length != 0) {
        this.doctorList = [];
        this.doctorList = data.list;
        this.selectedday = data.day;
        this.global.showToast('Doctor Available', 100, 'top');
      } else {
        this.selectedday = data.day;
        this.global.showToasterror('Doctor Not Available', 100, 'top');
      }
    })
  }

  ngOnInit(): void {
    this.appointmentServices.getInsuranceList().subscribe(data => {
      this.insuranceData = data.content;
    });
    this.appointmentServices.getInsuranceList().subscribe((data: any) => {
      this.insuranceList = data;
      console.log('Insurance List => ', data);
    });
    this.loginUser1 = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.bookAppBtn();
    this.profileservice.getProfile(this.loginUser1.userId).then(data => {
      this.loginUser = data;
      console.log("login user ");
      console.log(data);
      if (this.loginUser.userInsuranceId == undefined || this.loginUser.userInsuranceId == null) {
        this.isInsuranceCovered = false;
      } else {
        this.isInsuranceCovered = true;
      }
    });
    this.appointmentForm.get('appointmentUserId')?.setValue(this.loginUser1);
    this.appointmentForm.controls['appointmentUnitId'].get('unitId')?.setValue(1);
    this.appointmentForm.controls['appointmentService'].setValue('1');
    this.appointmentServices.getServiceList().subscribe((data: any) => {
      this.serviceList = data;
    });

    this.genderList = this.exploreservicesService.getGenderList();
    this.exploreservicesService.getSpecalityList().subscribe((data: any) => {
      this.specailtyList = data;

      this.exploreservicesService.getCityList().subscribe((data: any) => {
        this.cityList = data;
      });
    });

    this.exploreservicesService.getCityListforDubai().subscribe((data: any) => {
      this.cityListForDubai = data;
      console.log('hey dipak this is the cityListForDubai  =>',this.cityListForDubai);
    });

    this.exploreservicesService.getsymtomsLists().subscribe((data: any) => {
      this.spec = data;
      this.symtomsList = this.spec.content;
    });
    this.registerService.getUnitList('1', '', '', '', '').then(resp => {
      this.mstUnitList = resp.content;
      console.log("this.mstUnitList ", this.mstUnitList)
    });
    this.appointmentServicesFilter.getLanguageList().subscribe((data: any) => {
      this.LanguageList = data;
      console.log('language list : ', data);
    });


  }

  onFocus(): void {
    console.log('Focus Is gained for this Element');
    this.showList = true;
  }

  checkBlur() {
    console.log('focus is out for this element');
    this.showList = false;
  }

  setFilteredItems() {
    if (this.searchTerm.length >= 3) {
      this.appointmentServices.getsearchByInsurance(this.searchTerm).subscribe(data => {
        this.spec = data;
        this.insuranceData = this.spec.record;
      })
    } else {
      this.appointmentServices.getInsuranceList().subscribe(data => {
        this.insuranceData = data.content;
      });
    }
  }

  filter(val) {
    if (val == 'filter') {
      this.reset = true;
      this.exploreservicesService.getsymtomsLists().subscribe(data => {
        this.data = data;
        this.symtomList = this.data.content;
      });
      this.exploreservicesService.getSpecalityList().subscribe(data => {
        this.specialityList = data;
      });
    } else {
      this.reset = false;
      this.appointmentServices.getDoctorListByUnitId(this.unitId).subscribe(resp => {
        this.doctorList = [];
        if (resp.length >= 1) {
          this.doctorList = resp;
          this.title = 'Doctor List';
        }
      })
    }
  }

  selectedUnitValue(unitId) {
    this.filterUnitId = unitId;
  }


  selectedCityValue(stateId) {
    console.log(stateId);
    this.filterCityId = stateId;
  }

  selectSpecailty(sId) {
    this.filtersId = sId;
  }

  selectsymptoms(symptomsId) {
    this.filterSymptomsId = symptomsId;
  }


  selectGender(genderId) {
    this.filterGenderId = genderId;
  }


  selectUnitId(unitId) {
    this.UnitId = unitId;
    console.log('unitId : ' + this.UnitId);
  }

  selectInsurance(insuranceId) {
    this.filterInsuranceId = insuranceId;
  }


  selectLanguage(languageId) {
    this.filterLanguageId = languageId;
    console.log(this.filterLanguageId + " this.filterLanguageId");
  }


  selectFilterService(serviceId) {
    this.filterServiceId = serviceId;
  }



  /*applyFilter() {
    this.filtershow = false;
    this.sortshow = false;
    if (this.filterServiceId == undefined || this.filterServiceId == null) {
      this.filterServiceId = this.appointmentForm.get('appointmentService')?.value;
    }
    if (this.filtersId == undefined || this.filtersId == null) {
      this.filtersId = '0';
    }
    if (this.filterUnitId == undefined || this.filterUnitId == null) {
      this.filterUnitId = 0;
    }
    if (this.filterGenderId == undefined || this.filterGenderId == null) {
      this.filterGenderId = 0;
    }
    if (this.UnitId == undefined || this.UnitId == null) {
      this.UnitId = 0;
    }
    if (this.filterCityId == undefined || this.filterCityId == null) {
      this.filterCityId = 0;
    }
    if (this.languageId == undefined || this.languageId == null) {
      this.languageId = 0;
    }


    console.log("userId => "  + this.loginUser.userId);
    this.appointmentFilterService.getDoctorFilter(this.todays, this.filterServiceId,
      this.loginUser.userId,this.filtersId,this.filterCityId, this.filterGenderId , this.filterInsuranceId, 'NA', 'NA', 'NA', this.filterUnitId , this.languageId).subscribe((data: any) => {
      this.doctorList = data.list;
      this.selectedday = data.day;
    });
  }*/


  /* applyFilter() {
     this.filtershow = false;
     this.sortshow = false;
     if (this.filterServiceId == undefined || this.filterServiceId == null) {
       this.filterServiceId = this.appointmentForm.get('appointmentService')?.value;
     }
     if (this.filtersId == undefined || this.filtersId == null) {
       this.filtersId = '0';
     }
     if (this.filterUnitId == undefined || this.filterUnitId == null) {
       this.filterUnitId = 0;
     }
     if (this.filterGenderId == undefined || this.filterGenderId == null) {
       this.filterGenderId = 0;
     }
     if (this.UnitId == undefined || this.UnitId == null) {
       this.UnitId = 0;
     }
     if (this.filterCityId == undefined || this.filterCityId == null) {
       this.filterCityId = 0;
     }
     if (this.languageId == undefined || this.languageId == null) {
       this.languageId = 0;
     }
     console.log("userId => " + this.loginUser.userId);
     this.appointmentFilterService.getDoctorFilter(this.todays, this.filterServiceId,
       this.loginUser.userId, this.filtersId, this.filterCityId, this.filterGenderId, this.filterInsuranceId, 'NA', 'NA', 'NA', this.filterUnitId, this.languageId).subscribe((data: any) => {
       this.doctorList = data.list;
       this.selectedday = data.day;
     });
   }*/

  applyFilter() {
    this.filtershow = false;
    this.sortshow = false;
    if (this.filterServiceId == undefined || this.filterServiceId == null) {
      this.filterServiceId = this.appointmentForm.get('appointmentService')?.value;
    }
    if (this.filtersId == undefined || this.filtersId == null) {
      this.filtersId = '0';
    }
    if (this.filterUnitId == undefined || this.filterUnitId == null) {
      this.filterUnitId = 0;
    }
    if (this.filterGenderId == undefined || this.filterGenderId == null) {
      this.filterGenderId = 0;
    }
    if (this.UnitId == undefined || this.UnitId == null) {
      this.UnitId = 0;
    }
    if (this.filterCityId == undefined || this.filterCityId == null) {
      this.filterCityId = 0;
    }
    if (this.filterLanguageId == undefined || this.filterLanguageId == null) {
      this.filterLanguageId = 0;
    }
    if (this.filterSymptomsId == undefined || this.filterSymptomsId == null) {
      this.filterSymptomsId = 0;
    }
    if (this.filterInsuranceId == undefined || this.filterInsuranceId == null) {
      this.filterInsuranceId = 0;
    }

    /*  this.appointmentServices.getDoctorFilter(this.todays, this.filterServiceId,
        this.loginUser.userId, this.filtersId, this.filterCityId, this.filterGenderId, this.filterInsuranceId, 'NA', 'NA', 'NA', this.filterUnitId, this.languageId).subscribe((data: any) => {
        this.doctorList = data.list;
        this.selectedday = data.day;
      });*/
    this.appointmentServicesFilter.getDoctorFilter(this.todays, this.filterServiceId,
      this.loginUser.userId, this.filtersId, this.filterCityId, this.filterGenderId, this.UnitId, this.filterLanguageId, this.filterSymptomsId, this.filterInsuranceId).subscribe((data: any) => {
      this.doctorList = data.list;
      this.selectedday = data.day;
    });
  }

  ApplySort() {
    this.filtershow = false;
    this.sortshow = false;
  }


  getUnit(insuId) {
    this.appointmentServices.getUnitListByInsuranceId(insuId).subscribe(resp => {
      if (resp.length >= 1) {
        this.Stepper = 'step2';
        this.unitList = resp;
      } else {
        this.global.showToastwaring("No Hospital Available", 1000, 'top');
      }
    });
  }


  getUnitByInsurance(insuId) {
    console.log('insurance => ', this.insuId, this.selectedInsuranceObject,);
    this.newBookAppointmentService.getUnitListByInsuranceId(this.selectedInsuranceObject).subscribe(resp => {
      if (resp.length >= 1) {
        this.Stepper = 'step2';
        this.unitList = resp;
      } else {
        this.global.showToastwaring("No Hospital Available", 1000, 'top');
      }
    });
  }

  getDoctorList(unitId) {
    this.unitId = unitId;
    this.appointmentServices.getDoctorListByUnitId(unitId).subscribe(resp => {
      if (resp.length >= 1) {
        this.doctorList = resp;
        this.title = 'Doctor List';
        this.Stepper = "step3";
      } else {
        this.global.showToastwaring("Doctor Not Available", 1000, 'top');
      }
    })
  }

  /*  commanFilter() {
      this.doctorList = [];
      this.selectedday = '';
      if (this.filtersId == undefined || this.filtersId == null) {
        this.filtersId = '0';
      }
      if (this.filterUnitId == undefined || this.filterUnitId == null) {
        this.filterUnitId = 0;
      }
      if (this.filtersymptomsId == undefined || this.filtersymptomsId == null) {
        this.filtersymptomsId = '0';
      }
      if (this.filterGenderId == undefined || this.filterGenderId == null) {
        this.filterGenderId = 0;
      }
      if (this.UnitId == undefined || this.UnitId == null) {
        this.UnitId = 0;
      }
      if (this.filterInsuranceId == undefined || this.filterInsuranceId == null) {
        this.filterInsuranceId = 0;
      }
      this.appointmentFilterService.getDoctorFilter(this.todays, this.filterServiceId,
        this.loginUser.userId, this.filtersId, this.filterCityId, this.filterGenderId, this.filterUnitId, this.languageId).subscribe((data: any) => {
        this.doctorList = data.list;
        this.selectedday = data.day;
      });
    }*/

  /*  priceFilter(val, filterText) {
      this.filterByPrice = '';
      this.filterByPrice = filterText;
      this.commanFilter();
    }*/

  selectDoctor(val, doctor) {
    this.scheduleList = [];
    this.title = 'Confirm Appointment';
    this.selectedDoctor = doctor;
    this.appointmentForm.get('staffId')?.setValue(doctor.staff_id);
    if (doctor.unitId == 0) {
      this.appointmentForm.controls['appointmentUnitId'].get('unitId')?.setValue(1);
    } else {
      this.appointmentForm.controls['appointmentUnitId'].get('unitId')?.setValue(doctor.unitId);
    }
    this.appointmentForm.get('appointmentAmount')?.setValue(this.selectedDoctor.doctorRate)
    this.appointmentServices.getTodaySlotRecordService(this.selectedDoctor.staff_id, this.selectedDoctor.staffMinDuration, this.selectedday, this.todays).then(resp => {
      if (resp.msg.success == 1) {
        this.scheduleList = resp.content;
        if (this.scheduleList.length >= 1) {
          this.Stepper = val;
        } else {
          this.global.showToastwaring("Selected Doctor Schedule is not available", 1000, 'top');
          this.navCtrl.navigateForward('/inquiry', {state: this.appointmentForm.value});

        }
      } else {
        this.global.showToastwaring("Selected Doctor Schedule is not available", 1000, 'top');
        this.navCtrl.navigateForward('/inquiry', {state: this.appointmentForm.value});
      }
    });
  }

  checkshowNot(event) {
    if (event.currentTarget.checked == true) {
      this.constaccpect = true;
      this.appointmentForm.get('isCheckConsent1')?.setValue(event.currentTarget.checked);
    } else {
      this.constaccpect = false;
    }
  }

  checkshowNot1(event) {
    if (event.currentTarget.checked == true) {
      this.rightstaccpect = true;
      this.appointmentForm.get('isCheckConsent2')?.setValue(event.currentTarget.checked);
    } else {
      this.rightstaccpect = false;
    }
  }

  check(val) {
    if (val == 'Consents') {
      this.global.showToastwaring('Please Accept the Consent For Telehealth Service', 2000, 'top');
    } else {
      this.global.showToastwaring('Please share your acceptance, that you have viewed and understood the Patients Rights And Responsibility', 2000, 'top');
    }
  }

async  BookAppointment(val) {
    let loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
   await loading.present();
    if (val == 'profile') {
      this.appointmentServices.createAppointment(this.appointmentForm.value).subscribe((data: any) => {
        if (data.status == 1) {
          this.appointmentServicesFilter.confirmAppointmentSendMail(data.appointment.appointmentId).subscribe(mailData => {
            if(mailData.Status == 1){
              this.global.showToast(mailData.Message, 1000, 'top');
            }else{
              this.global.showToasterror(mailData.Message, 1000, 'top');
            }
          });
          if (this.InsuranceShow == true) {
            this.global.showToast('Thanks: Your Appointment is Booked', 1000, 'top');
            this.appointmentForm.reset();
            this.router.navigateByUrl('/appointmentlist');
            this.loadingCtrl.dismiss();
          } else {
            this.loadingCtrl.dismiss();
            this.onSubmitAssignDoc(data.appointment);
          }
        } else if (data.status == 2) {
          this.loadingCtrl.dismiss();
          this.global.showToastwaring('Please Select the Slot which is available.', 1000, 'top');
        } else {
          this.loadingCtrl.dismiss();
          this.global.showToastwaring('Appointment Booking Failed. Please try again.', 1000, 'top')
        }
      });
    } else {
      this.loadingCtrl.dismiss();
    }
  }

  onSubmitAssignDoc(appointmentDetail: any) {
    this.loadingCtrl.create({
      message: 'Please wait...'
    }).then((response) => {
      response.present();
    });
    this.appointmentServices.confirmAppointment(appointmentDetail, true).subscribe(resp => {
      if (resp.visitId != null && resp.visitId != undefined) {
        this.visit_id = resp.visitId;
        let model = {};
        let billClassId = {};
        billClassId['classId'] = '1';
        let billVisitId = {};
        billVisitId['visitId'] = resp.visitId;
        let billTariffId = {};
        billTariffId['tariffId'] = '1';
        let billUserId = {};
        billUserId['staffId'] = this.selectedDoctor.staff_id;
        let tbillUnitId = {};
        if (this.selectedDoctor.unitId == 0) {
          tbillUnitId['unitId'] = '1';
        } else {
          tbillUnitId['unitId'] = this.selectedDoctor.unitId;
        }
        let billCashCounterId = {};
        billCashCounterId['ccId'] = '1';

        model['tbillUnitId'] = tbillUnitId;
        model['billCashCounterId'] = billCashCounterId;
        model['billUserId'] = billUserId;
        model['billTariffId'] = billTariffId;
        model['billVisitId'] = billVisitId;
        model['billClassId'] = billClassId;
        model['billSubTotal'] = appointmentDetail.appointmentServiceAmount;
        model['billNetPayable'] = appointmentDetail.appointmentServiceAmount;
        model['billAmountPaid'] = 0;
        model['billOutstanding'] = appointmentDetail.appointmentServiceAmount;
        model['billNill'] = false;
        model['ipdBill'] = false;
        model['finalBill'] = true;
        model['billTotCoPay'] = appointmentDetail.appointmentServiceAmount;
        model['billTotCoPayOutstanding'] = appointmentDetail.appointmentServiceAmount;
        model['billTotCoPayRecieved'] = 0;
        model['billNarration'] = '';
        model['selectCDStaff'] = false;
        this.appointmentServices.createBill(model).subscribe(resp => {
          if (resp.bsBillId != undefined) {
            let model1 = {};
            model1['bsBaseRate'] = appointmentDetail.appointmentServiceAmount;
            model1['bsDate'] = appointmentDetail.appointmentDate;
            model1['bsPackageId'] = 0;
            model1['bsClassRate'] = appointmentDetail.appointmentServiceAmount;
            model1['bsGrossRate'] = appointmentDetail.appointmentServiceAmount;
            model1['bsQtyRate'] = appointmentDetail.appointmentServiceAmount;
            model1['bsCoPayQtyRate'] = appointmentDetail.appointmentServiceAmount;
            model1['bsTariffCPRate'] = appointmentDetail.appointmentServiceAmount;
            model1['bsTariffCoPay'] = appointmentDetail.appointmentServiceAmount;
            model1['bsQRRate'] = appointmentDetail.appointmentServiceAmount;
            model1['bsTaxValue'] = 0;
            model1['bsTaxRate'] = 0;
            model1['bsConcessionPercentage'] = 0;
            model1['bsConTempPercentage'] = 0;
            model1['bsQuantity'] = 1;
            model1['bsPriority'] = false;
            model1['bsCancel'] = false;
            model1['bsDiscountAmount'] = 0;
            model1['bsPackageName'] = 'nop';
            let bsServiceId = {};
            bsServiceId['serviceId'] = appointmentDetail.appointmentServiceId.serviceId;
            let bsStaffId = {};
            bsStaffId['staffId'] = this.selectedDoctor.staff_id;
            let bsBillId = {};
            bsBillId['billId'] = resp.bsBillId;
            model1['bsServiceId'] = appointmentDetail.appointmentServiceId;
            model1['bsStaffId'] = bsStaffId;
            model1['bsBillId'] = bsBillId;
            this.appointmentServices.createBillService(model1, appointmentDetail.appointmentId, this.visit_id).subscribe(resp => {
              this.loadingCtrl.dismiss();
              this.global.showToast('Appointment Booking Successfull', 1000, 'top');
              this.appointmentForm.reset();
              this.router.navigateByUrl('/appointmentlist');
            });
          }
        });
      } else {
        this.loadingCtrl.dismiss();
        this.router.navigateByUrl('/appointmentlist');
      }
    });
  }

  FilterSearch() {
    this.filtershow = true;
    this.sortshow = false;
  }

  SortSearch() {
    this.filtershow = false;
    this.sortshow = true;
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }



  FindDoctor(val) {
    let selectedService = this.appointmentForm.get('appointmentService')?.value;
    console.log(selectedService);
    if (selectedService == undefined || selectedService == null || selectedService == 0) {
      this.global.showToastwaring('Please select the Type of Consultation', 2000, 'top');
      return 0;
    } else if (val == 'step6') {
      this.title = 'Consent For Telehealth Services';
    } else if (val == 'step7') {
      this.title = ' Patient Rights And Responsibilities ';
    } else {
      this.title = 'Find A Doctor';
    }
    this.Stepper = val;
  }

  sloat() {
    this.global.showToastwaring('You forgot to select the preferred time slot', 1000, 'top');
  }

  onSelectedDate(eve) {
    var datePipe = new DatePipe('en-US');
    this.todays = datePipe.transform(eve.target.value, 'yyyy-MM-dd');
    this.appointmentForm.get('appointmentDate')?.setValue(this.todays);
    this.getScheduelByDate();
  }

  getScheduelByDate() {
    this.scheduleList = [];
    this.appointmentServices.getTodaySlotRecordService(this.selectedDoctor.staff_id, this.selectedDoctor.staffMinDuration, this.selectedday, this.todays).then(resp => {
      if (resp.msg.success == 1) {
        this.scheduleList = resp.content;
        if (this.scheduleList.length >= 1) {
        } else {
          this.global.showToastwaring("Selected Doctor Schedule is not available", 1000, 'top');
          this.navCtrl.navigateForward('/inquiry', {state: this.appointmentForm.value});
        }
      } else {
        this.global.showToastwaring("Selected Doctor Schedule is not available", 1000, 'top');
        this.navCtrl.navigateForward('/inquiry', {state: this.appointmentForm.value});
      }
    });
  }

  selectService(serviceId) {
    this.selectedService = this.serviceList.filter(item => item.serviceId == serviceId)[0];
  }

  ConsultationRateDoctor(val) {
    if (val == 'InsuranceConsultation') {
      this.InsuranceShow = true;
      this.appointmentForm.get('insuranceCoveredAppointment')?.setValue(true);
    } else {
      this.appointmentForm.get('insuranceCoveredAppointment')?.setValue(false);
      this.InsuranceShow = false;
    }
  }

  ConsultationType(val) {
    if (val == 'PersonConsultation') {
      this.isVartualConsultation = false;
      this.appointmentForm.get('isVartualConsultation')?.setValue(false)
    } else {
      this.isVartualConsultation = true;
      this.appointmentForm.get('isVartualConsultation')?.setValue(true)
    }
  }

  selectSlot(slot: any, index) {
    this.slotConfirm = true;
    this.scheduleList.filter(slist => slist.slotSelected = false);
    this.scheduleList[index].slotSelected = true;
    this.appointmentForm.get('appointmentTime')?.setValue(slot.slot);
  }

  goBack() {
    console.log("Going back To Dashboard!!!");
    this.router.navigateByUrl('/dashboard');
  }

}
