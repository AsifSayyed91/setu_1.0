import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PopoverPage} from "../popover/popover.page";
import {DatePipe} from "@angular/common";
import {ProfileService} from "../profile/profile.service";
import {NewBookAppointmentService} from "../new-book-appointment/new-book-appointment-service";
import {AppointmentServiceFilter} from "../book-appointment-filter/book-appointmentfilter.service";
import {NavController, NavParams, PopoverController} from "@ionic/angular";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";

@Component({
  selector: 'app-new-book-appointment',
  templateUrl: './new-book-appointment.page.html',
  styleUrls: ['./new-book-appointment.page.scss'],
})
export class NewBookAppointmentPage implements OnInit {
  title = 'Select Doctor';
  Stepper = 'step1';
  constaccpect = false;
  slotConfirm = false;
  rightstaccpect: boolean = false;
  appointmentForm: FormGroup;
  todays: any = new Date();
  minimumdate: any = new Date();
  afterday: any = new Date();
  datePipe = new DatePipe('en-US');
  date: Date = new Date();
  serviceList: Array<any> = [];
  loginUser1;
  loginUser;
  isInsuranceCovered: Boolean = false;
  doctorList = [];
  selectedService: any;
  search_query: any = {};
  selectedday: any;

  constructor(public appointmentServices: AppointmentServiceFilter,
              public navCtrl: NavController,
              public popoverCtrl: PopoverController,
              public newBookAppointmentService: NewBookAppointmentService,
              public profileservice: ProfileService,
              public appointmentService: AppointmentlistService,
              public navParams: NavParams,
              public fb: FormBuilder) {
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
  }

  ngOnInit() {
    this.loginUser1 = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.todays = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.minimumdate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.appointmentForm.get('appointmentDate')?.setValue(this.todays);
    var datePipe = new DatePipe('en-US');
    var d = new Date();
    d.setDate(d.getDate() + 60);
    this.afterday = datePipe.transform(d, 'yyyy-MM-dd');

    this.profileservice.getProfile(this.loginUser1.userId).then(data => {
      this.loginUser = data;
      console.log("this.loginUser", this.loginUser);
      if (this.loginUser.userInsuranceId == undefined || this.loginUser.userInsuranceId == null) {
        this.isInsuranceCovered = false;
      } else {
        this.isInsuranceCovered = true;
      }
    });

    this.appointmentForm.get('appointmentUserId')?.setValue(this.loginUser1);
    this.appointmentForm.controls['appointmentUnitId'].get('unitId')?.setValue(1);
    // this.genderList = this.registerService.getGenderList();
    this.appointmentForm.controls['appointmentService'].setValue('0');

    this.appointmentService.getServiceList().subscribe((data: any) => {
      this.serviceList = data;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewBookAppointmentPage');
  }

  selectDoctor() {
    this.newBookAppointmentService.getDoctorListBySymtoms(this.todays, '400', this.loginUser1.userId, this.loginUser.userCityId.cityId, {}).subscribe(data => {
      console.log("Data", data)
    });
    this.Stepper = 'step3';
  }

  FindDoctor(step) {
    this.Stepper = 'step5';
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

  // popoverMenu(event: Event) {
  //
  //   const popover = this.popoverCtrl.create(PopoverPage);
  //   popover.present({ev: event});
  // }

  searchDoctor(event: any) {
    this.search_query.staffName = event.target.value;
    if (this.selectedService == undefined || this.selectedService == null) {
    } else {
      // this.appointmentServices.getDoctorList(this.todays, this.appointmentForm.get('appointmentService')?.value, this.loginUser1.userId, this.loginUser.userCityId.cityId, {}).subscribe((data: any) => {

      this.appointmentServices.getDoctorLists(this.todays, this.appointmentForm.get('appointmentService')?.value, this.loginUser.userId, '1', '100', this.loginUser.userCityId.cityId, this.search_query).subscribe((data: any) => {
        // this.config.currentPage = page;
        this.doctorList = data.list;
        this.selectedday = data.day;
      });
    }
  }

  checkshowNot(event) {
    if (event.currentTarget.checked == true) {
      this.constaccpect = true;
      // this.appointmentForm.get('isCheckConsent1')?.setValue(event.currentTarget.checked);
    } else {
      this.constaccpect = false;
    }
  }

  checkshowNot1(event) {
    if (event.currentTarget.checked == true) {
      this.rightstaccpect = true;
      // this.appointmentForm.get('isCheckConsent2')?.setValue(event.currentTarget.checked);
    } else {
      this.rightstaccpect = false;
    }
  }

}
