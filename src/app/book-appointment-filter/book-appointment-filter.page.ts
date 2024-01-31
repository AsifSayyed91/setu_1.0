import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PopoverPage} from "../popover/popover.page";
import {ProfileService} from "../profile/profile.service";
import {CompleteTestService} from "../providers/network/Autocomplete.service";
import {ExploreService} from "../explore-services/explore-services.service";
import {Global} from "../globalpath";
import {AppointmentServiceFilter} from "../book-appointment-filter/book-appointmentfilter.service";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";
import {RegisterService} from "../account-register/account.service";
import {DatePipe} from "@angular/common";
import {
  ActionSheetController,
  LoadingController,
  ModalController,
  NavController,
  NavParams,
  PopoverController
} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-appointment-filter',
  templateUrl: '/book-appointment-filter.page.html',
  // templateUrl: './book-appointment-filter.page.html',
  styleUrls: ['./book-appointment-filter.page.scss'],
})
export class BookAppointmentFilterPage implements OnInit {
  appointmentForm: FormGroup;
  DirectConsultation: Boolean = true;
  SelfConsultation: Boolean = true;
  InsuranceShow: Boolean = false;
  filtershow: Boolean = false;
  sortshow: Boolean = false;
  isVartualConsultation: Boolean = true;
  filter: Boolean = false;
  Stepper: string = 'step1';
  display: Boolean = false;
  constaccpect: Boolean = false;
  rightstaccpect: Boolean = false;
  genderList;
  mstCompanyList;
  searchTerm;
  serviceList: Array<any> = [];
  doctorList: Array<any> = [];
  specailtyList: Array<any> = [];
  selectedday: any;
  scheduleList: Array<any> = [];
  InsuranceExpireDate;
  InsuranceIssueDate;
  title = 'Consult A Doctor';
  setval;
  subDeptList: Array<any> = [];
  LanguageList: Array<any> = [];
  loginUser: any;
  loginUser1: any;
  afterday: any = new Date();
  todays: any = new Date();
  staffName: any = '';
  minimumdate: any = new Date();
  slotConfirm: Boolean = false;
  disableBookAppBtn: Boolean = false;
  search_query: any = {};
  filterByPrice: any = '0';
  filterByRating: any = '0';
  filterByFollowe: any = '0';
  filterUnitId: any;
  filtersId: any;
  filterCityId: any;
  filtersymptomsId: any;
  filterServiceId: any;
  filterGenderId: any;
  filterInsuranceId: any;
  cityList: Array<any> = [];
  patientimagepath = this.global.paientImgPath;
  public options: any = {
    locale: {format: 'yyyy-MM-dd'},
    alwaysShowCalendars: false,
    singleDatePicker: true,
    showDropdowns: true,
    minDate: this.todays
  };
  date: Date = new Date();
  registration: FormGroup;
  datePipe = new DatePipe('en-US');
  selectedDoctor: any;
  selectedService: any;
  visit_id: any;

  spec;
  symtomsList: Array<any> = [];
  isInsuranceCovered: Boolean = false;
  characters = 0;
  filteredDocList: Array<any> = [];
  isDoctor: Boolean = false;
  mstStaff: any = {};
  docList: Array<any> = [];
  mstUnitList: Array<any> = [];
  insuranceList: Array<any> = [];
  UnitId: any;
  languageId: any;
  // consultdr = this.global.Consultdr;
  public healthspring = this.global.Healthspring;
  // @ViewChild('searchbar') searchbar: AutoCompleteComponent;

  constructor(public navCtrl: NavController,
              public profileservice: ProfileService,
              public exploreservicesService: ExploreService,
              public completeTestService: CompleteTestService,
              public actionSheetCtrl: ActionSheetController,
              public popoverCtrl: PopoverController,
              public registerService: RegisterService,
              public loadingCtrl: LoadingController,
              public fb: FormBuilder, public navParams: NavParams,
              public appointmentService: AppointmentlistService,
              public appointmentServices: AppointmentServiceFilter,
              public global: Global,
              public viewCtrl: ModalController,
              private router: Router,
  ) {
    this.appointmentForm = fb.group({

      'appointmentReason': [null, Validators.required],
      'appointmentService': [null, Validators.required],
      'appointmentDate': [null, this.todays],
      'appointmentTime': [null, Validators.required],
      'appointmentAmount': [0],
      'appointmentUnitId': this.fb.group({
        'unitId': [null]
      }),
      'isCheckConsent1': [false],
      'isCheckConsent2': [false],
      'appointmentUserId': [],
      'insuranceCoveredAppointment': [false],
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
    console.log('ionViewDidLoad AppointmentlistPage');
  }

  Profile() {
    this.viewCtrl.dismiss();
    // this.appCtrl.getRootNavs()[0].push(ProfilePage);
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
      console.log("this.disableBookAppBtn 1 : ", this.disableBookAppBtn);
      this.disableBookAppBtn = true;
      console.log("this.disableBookAppBtn 2 :  ", this.disableBookAppBtn);
    }
  }

  ngOnInit() {
    this.loginUser1 = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.bookAppBtn();
    this.profileservice.getProfile(this.loginUser1.userId).then(data => {
      this.loginUser = data;
      console.log("this.loginUser", this.loginUser)
      if (this.loginUser.userInsuranceId == undefined || this.loginUser.userInsuranceId == null) {
        this.isInsuranceCovered = false;
      } else {
        this.isInsuranceCovered = true;
      }
    });

    this.appointmentForm.get('appointmentUserId')?.setValue(this.loginUser1);
    this.appointmentForm.controls['appointmentUnitId'].get('unitId')?.setValue(1);
    this.genderList = this.registerService.getGenderList();
    this.appointmentForm.controls['appointmentService'].setValue('0');

    this.appointmentService.getServiceList().subscribe((data: any) => {
      this.serviceList = data;
      console.log('serviceList => ',this.serviceList);
    });

    /* this.appointmentServices.getLanguaeList().subscribe((data: any) => {
       this.LanguageList = data;
     });*/

    this.appointmentServices.getSubDeptList().subscribe((data: any) => {
      this.subDeptList = data;
    });
    this.appointmentServices.getCityList().subscribe((data: any) => {
      this.cityList = data;
    });
    this.appointmentServices.getSpecalityList().subscribe((data: any) => {
      this.specailtyList = data;
    });

    this.appointmentService.getInsuranceList().subscribe((data: any) => {
      this.insuranceList = data;
      console.log('insurance List => ', data);
    });

    this.registerService.getUnitList('1', '', '', '', '').then(resp => {
      this.mstUnitList = resp.content;
      console.log("this.mstUnitList ", this.mstUnitList)
    });

    this.appointmentServices.getSymptomsList().subscribe((data: any) => {
      this.spec = data;
      this.symtomsList = this.spec.content;
    });

    if (this.healthspring) {
      this.registration.controls['userInsuranceId'].setValue(0);
      this.appointmentForm.get('isVartualConsultation')?.setValue(false);
      this.appointmentForm.get('isCheckConsent1')?.setValue(true);
      this.appointmentForm.get('isCheckConsent2')?.setValue(true);
      this.isVartualConsultation = false;
    }
  }

  uploadInssCardFp(event) {
    const form = new FormData();
    form.append('file', event.target.files[0]);
    this.registerService.uploadDoc(form).then(resp => {
      this.registration.get('userInsuranceCardFp')?.setValue(resp);
    });
  }

  Insurance(form) {
  }

  selectLanguageId(unitId) {
    this.languageId = unitId;
    console.log('unitId : ' + this.UnitId);
  }

  call() {
    this.display = true;
  }

  selectedLanguageValue(val) {
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }

  onKeypressEvent(event: any) {
    console.log(event.target.value);
  }

  getNotify(msg: any) {
    this.global.showToastwaring(msg, 2000, 'top');
  }

  FindDoctor(val) {
    this.setval = val;
    if (val == 'step4') {
      this.title = 'Consent For Telehealth Services';
    } else if (val == 'step5') {
      this.title = ' Patient Rights And Responsibilities ';
    } else {
      this.title = 'Find A Doctor';
    }

    this.filterByPrice = '0';
    this.filterByRating = '0';
    this.filterByFollowe = '0';
    this.filtershow = false;
    this.sortshow = false;
    this.doctorList = [];
    if (this.selectedService == undefined || this.selectedService == null) {
      this.global.showToastwaring('Please select the Type of Consultation', 2000, 'top');
    } else {
      this.appointmentServices.getDoctorList(this.todays, this.appointmentForm.get('appointmentService')?.value, this.loginUser1.userId, '1', '100',this.loginUser.userCityId.cityId, {}).subscribe((data: any) => {
        if (data.list != undefined && data.list != null && data.list != '') {
          if (data.list.length == 0) {
            this.global.showToastwaring('The Selected Doctor Schedule is not available', 1000, 'top');
            console.log("Vi$hal Here");
            this.navCtrl.navigateForward('/inquiry', {state: this.appointmentForm.value});
            this.minimumdate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
          } else {
            if (this.InsuranceShow == true) {
              if (this.loginUser.userInsuranceCardNo != null) {
                this.Stepper = val;
                this.doctorList = data.list;
                console.log("doctorList 1 : " + this.doctorList.toString());
                this.selectedday = data.day;
              } else {
                this.global.showToastwaring('Please Fill Insurance Details', 1000, 'top');
              }
            } else {
              this.Stepper = val;
              this.doctorList = data.list;
              console.log("doctorList 2 : " + this.doctorList.toString());
              this.selectedday = data.day;
            }
          }
        } else {
          this.global.showToastwaring("Doctor Is Not Available", 1000, 'top')
        }
      });
    }
  }

  Filter(val) {
    if (val == 'Filter') {
      this.filter = false;
    } else {
      this.filter = true;
    }
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

  ConsultationRateDoctor(val) {
    if (val == 'InsuranceConsultation') {
      this.InsuranceShow = true;
      this.appointmentForm.get('insuranceCoveredAppointment')?.setValue(true);
      this.registration.controls['userInsuranceId'].setValue(0);
      this.registerService.getAllCompanyList('1', '', '', '', '').then(resp => {
        this.mstCompanyList = resp.content;
      });
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

  selectedInsuranceDateOfIssue(ev: any) {
    var datePipe = new DatePipe('en-US');
    this.InsuranceIssueDate = datePipe.transform(ev.target.value, 'yyyy-MM-dd');
    this.registration.get('userInsuranceDateOfIssue')?.setValue(this.InsuranceIssueDate);
  }

  selectedInsuranceDateOfExp(ev: any) {
    var datePipe = new DatePipe('en-US');
    this.InsuranceExpireDate = datePipe.transform(ev.target.value, 'yyyy-MM-dd');
    this.registration.get('userInsuranceDateOfExp')?.setValue(this.InsuranceExpireDate);
  }

  /* priceFilter(val, filterText) {
     this.filterByPrice = '';
     this.filterByPrice = filterText;
     this.commanFilter();
   }

   ratingFilter(val, filterText) {
     this.filterByRating = '';
     this.filterByRating = filterText;
     this.commanFilter();
   }

   followerFilter(val, filterText) {
     this.filterByFollowe = '';
     this.filterByFollowe = filterText;
     this.commanFilter();
   }*/

  /* commanFilter() {
     this.doctorList = [];
     this.selectedday = '';
     if (this.filterServiceId == undefined || this.filterServiceId == null) {
       this.filterServiceId = this.appointmentForm.get('appointmentService')?.value;
     }
     if (this.filtersId == undefined || this.filtersId == null) {
       this.filtersId = '0';
     }
     if (this.filtersymptomsId == undefined || this.filtersymptomsId == null) {
       this.filtersymptomsId = '0';
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
     if (this.filterInsuranceId == undefined || this.filterInsuranceId == null) {
       this.filterInsuranceId = 0;
     }
     if (this.languageId == undefined || this.languageId == null) {
       this.languageId = 0;
     }
    /!* this.appointmentServices.getDoctorFilter(this.todays, this.filterServiceId, this.loginUser.userId, this.filtersId,
       this.filterUnitId, this.filterGenderId, this.filterInsuranceId, this.filterByPrice,
       this.filterByRating, this.filterByFollowe, this.UnitId, this.languageId).subscribe((data: any) => {
       this.doctorList = data.list;
       this.selectedday = data.day;
     });*!/

     this.appointmentServices.getDoctorFilter(this.todays, this.filterServiceId,
       this.loginUser.userId, this.filtersId, this.filterCityId, this.filterGenderId, this.filterUnitId, this.languageId).subscribe((data: any) => {
       this.doctorList = data.list;
       this.selectedday = data.day;
     });

   }*/

  onSelectedDate(event) {
    var datePipe = new DatePipe('en-US');
    this.todays = datePipe.transform(event.target.value, 'yyyy-MM-dd');
    this.appointmentForm.get('appointmentDate')?.setValue(this.todays);
    this.getScheduelByDate();
  }

  getScheduelByDate() {
    this.scheduleList = [];
    this.appointmentService.getTodaySlotRecordService(this.selectedDoctor.staff_id, this.selectedDoctor.staffMinDuration, this.selectedday, this.todays).then(resp => {
      if (resp.msg.success == 1) {
        // let time = resp.content[0];
        this.scheduleList = resp.content;
        if (this.scheduleList.length >= 1) {
        } else {
          this.global.showToastwaring("Selected Doctor Schedule is not available", 1000, 'top');
          this.navCtrl.navigateForward('/inquiry', {state: this.appointmentForm.value});

          console.log("Vi$hal Here");
        }
      } else {
        this.global.showToastwaring("Selected Doctor Schedule is not available", 1000, 'top');
        this.navCtrl.navigateForward('/inquiry', {state: this.appointmentForm.value});

      }
    });
  }

  selectService(serviceId) {
    this.selectedService = this.serviceList.filter(item => item.serviceId == serviceId)[0];
    console.log('service list => ',this.serviceList);
  }

  selectSlot(slot: any, index) {
    this.slotConfirm = true;
    this.scheduleList.filter(slist => slist.slotSelected = false);
    this.scheduleList[index].slotSelected = true;
    this.appointmentForm.get('appointmentTime')?.setValue(slot.slot);
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

  updateProfile() {
    this.router.navigateByUrl('/profile');
  }

  sloat() {
    this.global.showToastwaring('You forgot to select the preferred time slot', 1000, 'top');
  }

  check(val) {
    if (val == 'Consents') {
      this.global.showToastwaring('Please Accept the Consent For Telehealth Service', 2000, 'top');
    } else {
      this.global.showToastwaring('Please share your acceptance, that you have viewed and understood the Patients Rights And Responsibility', 2000, 'top');
    }
  }

  BookAppointment(val) {
    this.loadingCtrl.create({
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
            // this.navCtrl.setRoot(AppointmentlistPage);
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

  /*selectDoctor(val, doctor) {
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
          console.log('schedule list => ', this.scheduleList)
        } else {
          this.global.showToastwaring("Selected Doctor Schedule is not available", 1000, 'top');
        }
      } else {
        this.global.showToastwaring("Selected Doctor Schedule is not available", 1000, 'top');
      }
    });
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
    this.appointmentService.getTodaySlotRecordService(this.selectedDoctor.staff_id, this.selectedDoctor.staffMinDuration, this.selectedday, this.todays).then(resp => {
      if (resp.msg.success == 1) {
        this.scheduleList = resp.content;
        if (this.scheduleList.length >= 1) {
          this.Stepper = val;
        } else {
          this.global.showToastwaring("Selected Doctor Schedule is not available", 1000, 'top');
          console.log("here ia am");
          this.navCtrl.navigateForward('/inquiry', this.appointmentForm.value);
        }
      } else {
        this.global.showToastwaring("Selected Doctor Schedule is not available", 1000, 'top');
        this.navCtrl.navigateForward('/inquiry', this.appointmentForm.value);
        console.log("Vi$hal here");
      }
    });
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

  FilterSearch() {
    this.filtershow = true;
    this.sortshow = false;
  }

  SortSearch() {
    this.filtershow = false;
    this.sortshow = true;
  }

  selectedUnitValue(unitId) {
    this.filterUnitId = unitId;
  }

  selectedCityValue(cityId) {
    this.filterCityId = cityId;
  }

  selectSpecailty(sId) {
    this.filtersId = sId;
  }

  selectsymptoms(symptomsId) {
    this.filtersymptomsId = symptomsId;
    console.log('hello dipak,symptomsid =>', this.filtersymptomsId);
  }

  selectFilterService(serviceId) {
    this.filterServiceId = serviceId;
  }

  selectGender(genderId) {
    this.filterGenderId = genderId;
  }

  selectInsurance(insuranceId) {
    console.log('selectInsurance called!!');
    this.filterInsuranceId = insuranceId;
    console.log('hello Dipak insuranceId =>', insuranceId);
  }

  ApplySort() {
    this.filtershow = false;
    this.sortshow = false;
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
    if (this.filterInsuranceId == undefined || this.filterInsuranceId == null) {
      this.filterInsuranceId = 0;
    }

    if (this.UnitId == undefined || this.UnitId == null) {
      this.UnitId = 0;
    }
    this.appointmentServices.getDoctorFilter(this.todays, this.filterServiceId, this.loginUser.userId,
      this.filtersId, this.filterUnitId,this.filterInsuranceId, this.filterGenderId,'NA', 'NA', 'NA', this.UnitId).subscribe((data: any) => {
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
    if (this.languageId == undefined || this.languageId == null) {
      this.languageId = 0;
    }
    if (this.filterInsuranceId == undefined || this.filterInsuranceId == null) {
      this.filterInsuranceId = 0;
    }
    if (this.filtersymptomsId == undefined || this.filterInsuranceId == null) {
      this.filtersymptomsId= 0;
    }

    console.log("userId => " + this.loginUser.userId);
    /*this.appointmentServices.getDoctorFilter(this.todays, this.filterServiceId,
      this.loginUser.userId, this.filtersId, this.filterCityId, this.filterGenderId, this.filterInsuranceId, 'NA', 'NA', 'NA', this.filterUnitId, this.languageId).subscribe((data: any) => {
      this.doctorList = data.list;
      this.selectedday = data.day;
    });*/
    this.appointmentServices.getDoctorFilter(this.todays, this.filterServiceId,
      this.loginUser.userId, this.filtersId, this.filterCityId, this.filterGenderId, this.filterUnitId, this.languageId,this.filtersymptomsId,this.filterInsuranceId).subscribe((data: any) => {
      this.doctorList = data.list;
      this.selectedday = data.day;
    });
  }

  follow(userId, staffId, index) {
    let model = {};
    model['fCount'] = 1;
    let userIds = {};
    userIds['userId'] = userId;
    model['fUserId'] = userIds;
    let staffIds = {};
    staffIds['staffId'] = staffId;
    model['fStaffId'] = staffIds;
    this.appointmentServices.followCreateService(userId, staffId, model).then(data => {
      if (data.success == '1') {
        this.doctorList[index].isUserFollow = 1;
        this.global.showToast('Thanks for Following the Doctor!', 1000, 'top');
      } else {
        this.global.showToastwaring('Oops, Something went wrong ...!', 1000, 'top');
      }
    });
  }

  character(ev) {
    this.characters = ev.target.value.length;
  }

  setFilteredItems() {
    console.log("this.searchTerm", this.searchTerm);
  }

  searchDoctor(event: any) {
    this.search_query.staffName = event.target.value;
    if (this.selectedService == undefined || this.selectedService == null) {
    } else {
      //this.appointmentServices.getDoctorList(this.todays, this.appointmentForm.get('appointmentService')?.value, this.loginUser1.userId,'1', '100', this.loginUser.userCityId.cityId, {}).subscribe((data: any) => {

      this.appointmentServices.getDoctorLists(this.todays, this.appointmentForm.get('appointmentService')?.value, this.loginUser.userId, '1', '100', this.loginUser.userCityId.cityId, this.search_query).subscribe((data: any) => {
        // this.config.currentPage = page;
        this.doctorList = data.list;
        this.selectedday = data.day;
      });
    }
  }
}
