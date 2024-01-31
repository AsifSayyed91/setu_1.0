import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule, NavParams} from '@ionic/angular';
import { HospitalPageRoutingModule } from './hospital-routing.module';
import { HospitalPage } from './hospital.page';
import {OurDoctorsService} from "../our-doctors/our-doctors.service";
import {Global} from "../globalpath";
import {NewBookAppointmentService} from "../new-book-appointment/new-book-appointment-service";
import {ProfileService} from "../profile/profile.service";
import {AppointmentServiceFilter} from "../book-appointment-filter/book-appointmentfilter.service";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";
import {ExploreService} from "../explore-services/explore-services.service";
import {RegisterService} from "../account-register/account.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    HospitalPageRoutingModule
  ],
  declarations: [HospitalPage],
  providers: [
    OurDoctorsService,
    Global,
    NewBookAppointmentService,
    ProfileService,
    AppointmentServiceFilter,
    AppointmentlistService,
    NavParams,
    ExploreService,
    RegisterService,

  ]
})
export class HospitalPageModule {}
