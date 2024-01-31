import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Global} from "../globalpath";
import {OurDoctorsService} from "../our-doctors/our-doctors.service";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";
import {NavController, NavParams} from "@ionic/angular";

@Component({
  selector: 'app-our-doctors',
  templateUrl: './our-doctors.page.html',
  styleUrls: ['./our-doctors.page.scss'],
})
export class OurDoctorsPage implements OnInit {
  appointmentForm: FormGroup;
  unitId;
  unitList: Array<any> = [];
  subDeptList: Array<any> = [];
  doctorList: Array<any> = [];
  docshow: boolean = false;
  show: boolean = false;
  loginUser;
  Filters_showHide_EMR: boolean = false;

  constructor(public fb: FormBuilder,
              public global: Global,
              public ourDoctorsService: OurDoctorsService,
              public appointmentService: AppointmentlistService,
              public navCtrl: NavController,
              public navParams: NavParams) {
    this.appointmentForm = fb.group({
      'appointmentUnitId': this.fb.group({
        'unitId': [null]
      }), 'appointmentService': [null, Validators.required]
    })
  }

  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    console.log("loginUser", this.loginUser);
    this.appointmentService.getSubDeptList().subscribe((data: any) => {
      this.subDeptList = data;
      console.log("subDeptList", data)
    });

    this.appointmentService.getUnitList().subscribe((data: any) => {
      this.unitList = data;
      console.log("unitList", data)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OurDoctorsPage');
  }

  selectedUnitValue(unitId) {
    this.docshow = false;
    this.appointmentForm.get('appointmentUnitId')?.get('unitId')?.setValue(unitId);
    this.unitId = unitId;
    this.doctorList = [];
  }

  selectedSpecialityValue(sdId) {
    this.doctorList = [];
    this.docshow = false;
    this.appointmentForm.get('appointmentService')?.setValue(sdId);
    this.ourDoctorsService.getDocBySpecialityIdUnitId(sdId, this.loginUser.userId, this.unitId).subscribe((data: any) => {
      this.docshow = true;
      this.Filters_showHide_EMR = false;
      this.doctorList = data;
    })
  }

  follow(userId, staffId, index) {
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
}
