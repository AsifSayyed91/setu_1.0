import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { SpecialitiesPageRoutingModule } from './specialities-routing.module';

import { SpecialitiesPage } from './specialities.page';
import {OurDoctorsService} from "../our-doctors/our-doctors.service";
import {Global} from "../globalpath";
import {ExploreService} from "../explore-services/explore-services.service";
import {NewBookAppointmentService} from "../new-book-appointment/new-book-appointment-service";
import {ProfileService} from "../profile/profile.service";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";
import {AppointmentServiceFilter} from "../book-appointment-filter/book-appointmentfilter.service";
import {RegisterService} from "../account-register/account.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    SpecialitiesPageRoutingModule
  ],
  declarations: [SpecialitiesPage],
  providers: [
    OurDoctorsService,
    Global,
    NavParams,
    ExploreService,
    NewBookAppointmentService,
    ProfileService,
    AppointmentlistService,
    AppointmentServiceFilter,
    RegisterService]
})
export class SpecialitiesPageModule {}
