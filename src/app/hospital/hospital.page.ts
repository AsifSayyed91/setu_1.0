import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PopoverPage} from "../popover/popover.page";
import {ProfilePage} from "../profile/profile.page";
import {ProfileService} from "../profile/profile.service";
import {OurDoctorsService} from "../our-doctors/our-doctors.service";
import {Global} from "../globalpath";
import {DatePipe} from "@angular/common";
import {LoadingController, ModalController, NavController, NavParams, PopoverController} from "@ionic/angular";
import {AppointmentServiceFilter} from "../book-appointment-filter/book-appointmentfilter.service";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";
import {ExploreService} from "../explore-services/explore-services.service";
import {RegisterService} from "../account-register/account.service";
import {NewBookAppointmentService} from "../new-book-appointment/new-book-appointment-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.page.html',
  styleUrls: ['./hospital.page.scss'],
})
export class HospitalPage implements OnInit {
  show: boolean = false;
  selectedService: any;
  docshow: boolean = false;
  filterUnitId: any;
  filterCityId: any;
  languageId: any;
  unitList: Array<any> = [];
  filterGenderId: any;
  unitData: Array<{}> = [];
  hospitalList: Array<any> = [];
  specialityList: Array<{}> = [];
  symtomList: Array<{}> = [];
  data;
  searchTerm: any = '';
  spec;
  unitId: any;
  Stepper = 'step1';
  Stepper1 = 'stepForDoctorList';
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
  /*title = 'Hospital';*/
  title = 'Hospital';
  setval;

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
  filtershow: Boolean = false;
  hospitalClicked: Boolean = false;
  sortshow: Boolean = false;
  showFilter: Boolean = this.global.filter;
  cityList: Array<any> = [];
  cityListForDubai: Array<any> = [];
  genderList: Array<any> = [];
  filtersId: any;
  /*  UnitId:  Array<any> = [];*/
  UnitId: any;
  insuranceId: any;
  filtersymptomsId: any;
  filterServiceId: any;
  filterInsuranceId: any;
  filterLanguageId: any;
  filterSymptomsId: any;
  filterByPrice: any = '0';
  filterByRating: any = '0';
  filterByFollowe: any = '0';
  specailtyList: Array<any> = [];
  symtomsList: Array<any> = [];
  LanguageList: Array<any> = [];
  mstUnitList: Array<any> = [];
  showList: boolean = false;
  selectedHospitalObject: any;
  patientimagepath = this.global.paientImgPath;
  search_query: any = {};

  constructor(public ourDoctorsService: OurDoctorsService,
              public popoverCtrl: PopoverController,
              public navCtrl: NavController,
              public newBookAppointmentService: NewBookAppointmentService,
              public profileservice: ProfileService,
              public appointmentServices: AppointmentServiceFilter,
              public fb: FormBuilder, public appointmentService: AppointmentlistService,
              public loadingCtrl: LoadingController, public global: Global,
              public navParams: NavParams,
              public exploreservicesService: ExploreService,
              public registerService: RegisterService,
              public appointmentFilterService: AppointmentServiceFilter,
              private  router: Router,
              public viewCtrl: ModalController) {
    this.appointmentForm = fb.group({
      'appointmentReason': [null, Validators.required],
      'appointmentService': [null, Validators.required],
      'appointmentDate': [null, this.todays],
      'location': [null, Validators.required],
      'speciality': [null, Validators.required],
      'symptoms': [null, Validators.required],
      'hospital': [null, Validators.required],
      'language': [null, Validators.required],
      'gender': [null, Validators.required],
      'unit': [null, Validators.required],
      'insurance': [null, Validators.required],
      'appointmentTime': [null, Validators.required],
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad HospitalPage');
  }

  //for search doctor
  searchDoctor(event: any) {
    console.log("event :", event)
    this.search_query.staffName = event.target.value;
    this.appointmentServices.getDoctorLists(this.todays, this.appointmentForm.get('appointmentService')?.value, this.loginUser.userId, '1', '100', this.loginUser.userCityId.cityId, this.search_query).subscribe((data: any) => {
      this.doctorList = data.list;
      this.selectedday = data.day;
      console.log(data);
    });
    // }
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
    if (
      this.loginUser1.userFirstname != null && this.loginUser1.userFirstname != '' && this.loginUser1.userFirstname != undefined &&
      this.loginUser1.userLastname != null && this.loginUser1.userLastname != '' && this.loginUser1.userLastname != undefined &&
      this.loginUser1.userEmail != null && this.loginUser1.userEmail != '' && this.loginUser1.userEmail != undefined &&
      this.loginUser1.userName != null && this.loginUser1.userName != '' && this.loginUser1.userName != undefined &&
      this.loginUser1.userMobile != null && this.loginUser1.userMobile != '' && this.loginUser1.userMobile != undefined &&
      this.loginUser1.userDob != null && this.loginUser1.userDob != '' && this.loginUser1.userDob != undefined
    ) {
      this.disableBookAppBtn = true;
    }
  }

  ngOnInit(): void {
    this.hospitalClickedd();
    this.exploreservicesService.getUnitList().then(data => {
      this.unitData = data;
    });
    this.loginUser1 = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.bookAppBtn();
    console.log(" this.loginUser1", this.loginUser1);
    this.profileservice.getProfile(this.loginUser1.userId).then(data => {
      this.loginUser = data;
      if (this.loginUser.userInsuranceId == undefined || this.loginUser.userInsuranceId == null) {
        this.isInsuranceCovered = false;
      } else {
        this.isInsuranceCovered = true;
      }
    });
    this.appointmentForm.get('appointmentUserId')?.setValue(this.loginUser1);
    this.appointmentForm.controls['appointmentUnitId'].get('unitId')?.setValue(1);
    this.appointmentForm.controls['appointmentService'].setValue('1');
    this.appointmentService.getServiceList().subscribe((data: any) => {
      this.serviceList = data;
    });
    // this.genderList = this.exploreservicesService.getGenderList();
    /*  this.exploreservicesService.getGenderList().subscribe((data: any) => {
        this.genderList = data;
      });*/

    this.exploreservicesService.getGenderList().then(resp => {
      this.genderList = resp;
      console.log("this.genderList ", this.genderList)
    });

    this.exploreservicesService.getSpecalityList().subscribe((data: any) => {
      this.specailtyList = data;


      this.exploreservicesService.getCityList().subscribe((data: any) => {
        this.cityList = data;
      });
    });

    this.exploreservicesService.getCityListforDubai().subscribe((data: any) => {
      this.cityListForDubai = data;
      console.log('hey dipak this is the cityListForDubai  =>', this.cityListForDubai);
    });

    this.exploreservicesService.getsymtomsLists().subscribe((data: any) => {
      this.spec = data;
      this.symtomsList = this.spec.content;
    });

    this.appointmentServices.getLanguageList().subscribe((data: any) => {
      this.LanguageList = data;
      console.log('language list : ', data);
    });

    this.registerService.getUnitList('1', '', '', '', '').then(resp => {
      this.mstUnitList = resp.content;
      console.log("this.mstUnitList ", this.mstUnitList)
    });

    /* this.registerService.getInsuranceList().subscribe((data: any) => {
       this.insuranceList = data;
       console.log("this.insuranceList ", this.insuranceList);
     });*/

    this.exploreservicesService.getInsuranceList().then(resp => {
      this.insuranceList = resp;
      console.log("this.insuranceList ", this.insuranceList)
    });
    // this.cityListForDubai = [];
  }


  /*setFilteredItems() {
    if (this.searchTerm.length >= 3) {
      this.appointmentServices.getsearchBySpeci(this.searchTerm).subscribe(data => {
        // this.appointmentServices.getSpecalityList(this.searchTerm).subscribe(data => {
        this.spec = data;
        this.specailtyList = this.spec.record;
      })
    } else {
      this.appointmentServices.getSpecalityList().subscribe((data: any) => {
        this.specailtyList = data;
      });
    }
  }*/

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
      this.appointmentService.getsearchByHospital(this.searchTerm).subscribe(data => {
        this.spec = data;
        this.unitData = this.spec.record;
        console.log("data", data);
      })
    } else {
      this.exploreservicesService.getUnitList().then(data => {
        this.unitData = data;
      });
    }
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
    this.appointmentServices.getDoctorFilter(this.todays, this.filterServiceId, this.loginUser.userId, this.filtersId, this.filterUnitId,
      this.filterInsuranceId,this.filterGenderId, 'NA', 'NA', 'NA', this.UnitId).subscribe((data: any) => {
      this.doctorList = data.list;
      this.selectedday = data.day;
    });
  }*/

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
    this.appointmentServices.getDoctorFilter(this.todays, this.filterServiceId,
      this.loginUser.userId,this.filtersId,this.filterCityId, this.filterGenderId , this.filterInsuranceId, 'NA', 'NA', 'NA', this.filterUnitId , this.languageId).subscribe((data: any) => {
      this.doctorList = data.list;
      this.selectedday = data.day;
    });
  }*/

  /*
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
    console.log(this.filterServiceId + this.appointmentForm.get('appointmentService')?.value);
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
    this.appointmentServices.getDoctorFilter(this.todays, this.filterServiceId,
      this.loginUser.userId, this.filtersId, this.filterCityId, this.filterGenderId, this.UnitId, this.filterLanguageId, this.filterSymptomsId, this.filterInsuranceId).subscribe((data: any) => {
      this.doctorList = data.list;
      this.selectedday = data.day;
    });
  }

  selectSpecailty(sId) {
    this.filtersId = sId;
  }


  selectGender(genderId) {
    this.filterGenderId = genderId;
  }

  selectsymptoms(symptomsId) {
    this.filterSymptomsId = symptomsId;
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



  follow(userId, staffId, index) {
    console.log('userId' + userId);
    console.log(' staffId' + staffId);
    this.show = true;
    let model = {};
    model['fCount'] = 1;

    let userIds = {};
    userIds['userId'] = userId
    model['fUserId'] = userIds

    let staffIds = {};
    staffIds['staffId'] = staffId
    model['fStaffId'] = staffIds


    this.ourDoctorsService.followCreateService(userId, staffId, model).then(data => {
      if (data.success == '1') {
        this.doctorList[index].followup = 'true';
        this.global.showToast('Follow successfully ...!', 1000, 'top');
        // this.docshow = false;
      } else {
        this.global.showToastwaring('Something went wrong ...!', 1000, 'top');
        this.docshow = false;
      }
    })
  }

  selectedUnitValue(unitId) {
    this.filterUnitId = unitId;
    // this.unitData = data;
  }

  selectedCityValue(stateId) {
    console.log(stateId);
    this.filterCityId = stateId;
  }


  // getInsurance(unitId) {
  //   this.unitId = unitId;
  //   this.title = 'Doctor List';
  //   this.newBookAppointmentService.getDoctorListByUnitId(this.unitId).subscribe(resp => {
  //     if (resp.length >= 1) {
  //       this.doctorList = resp;
  //
  //       this.Stepper = "step3";
  //     } else {
  //       this.global.showToastwaring("Doctor Not Available", 1000, 'top');
  //     }
  //   })
  // }

  getInsurance(unitId: string) {
    this.unitId = unitId;
    this.title = 'Doctor List';
    console.log('Unit ID:', this.unitId);
    this.newBookAppointmentService.getDoctorListByUnitId(this.unitId).subscribe(resp => {
      console.log('Response:', resp);
      if (resp.length >= 1) {
        this.doctorList = resp;
        this.Stepper = "step3";
      } else {
        this.global.showToastwaring("Doctor Not Available", 1000, 'top');
      }
    });
  }


  /*getDoctorSearchHospital(unit) {
    console.log("hospital => ", unit, this.selectedHospitalObject);
    this.newBookAppointmentService.getDoctorListByUnitId(unit).subscribe(data => {
      if (data.length != 0) {
        this.doctorList = data.list;
        this.selectedday = data.day;
        this.global.showToast('Doctor Available', 100, 'top');
        this.Stepper = 'step2';
      } else {
        this.selectedday = data.day;
        this.global.showToasterror('Doctor Not Available', 100, 'top');
      }
    })
  }*/

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
      this.appointmentService.getDoctorListByUnitId(this.unitId).subscribe(resp => {
        this.doctorList = [];
        if (resp.length >= 1) {
          this.doctorList = resp;
        }
      })
    }
  }

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
    this.appointmentService.getTodaySlotRecordService(this.selectedDoctor.staff_id, this.selectedDoctor.staffMinDuration, this.selectedday, this.todays).then(resp => {
      if (resp.msg.success == 1) {
        this.scheduleList = resp.content;
        console.log("In selectDoctor() Schedule list : ", this.scheduleList);
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

  FilterSearch() {
    this.filtershow = true;
    this.sortshow = false;
  }

  SortSearch() {
    this.filtershow = false;
    this.sortshow = true;
  }

  hospitalClickedd() {
    this.hospitalClicked = true;
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

 async BookAppointment(val) {
    await this.loadingCtrl.create({
      message: 'Please wait...'
    }).then((response) => {
      response.present();
    });
    if (val == 'profile') {
      this.appointmentServices.createAppointment(this.appointmentForm.value).subscribe((data: any) => {
        if (data.status == 1) {
          this.appointmentServices.confirmAppointmentSendMail(data.appointment.appointmentId).subscribe(mailData => {
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
        this.appointmentService.createBill(model).subscribe(resp => {
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
            this.appointmentService.createBillService(model1, appointmentDetail.appointmentId, this.visit_id).subscribe(resp => {
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

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }

  /*resetForm() {
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
    this.ngOnInit();
  }*/


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



  FindDoctor(val) {
    console.log('reset called...');
    let selectedService = this.appointmentForm.get('appointmentService')?.value;
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
    this.appointmentService.getTodaySlotRecordService(this.selectedDoctor.staff_id, this.selectedDoctor.staffMinDuration, this.selectedday, this.todays).then(resp => {
      if (resp.msg.success == 1) {
        this.scheduleList = resp.content;
        console.log("In getScheduelByDate() Schedule list : ", this.scheduleList);
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
    console.log("Going back");
    this.router.navigateByUrl('/dashboard');
  }

}
