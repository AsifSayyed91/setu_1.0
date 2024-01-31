import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { InsurancePageRoutingModule } from './insurance-routing.module';

import { InsurancePage } from './insurance.page';
import {NewBookAppointmentService} from "../new-book-appointment/new-book-appointment-service";
import {Global} from "../globalpath";
import {ProfileService} from "../profile/profile.service";
import {RegisterService} from "../account-register/account.service";
import {AppointmentServiceFilter} from "../book-appointment-filter/book-appointmentfilter.service";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";
import {ExploreService} from "../explore-services/explore-services.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    InsurancePageRoutingModule
  ],
  declarations: [InsurancePage],
  providers: [
    NewBookAppointmentService,
    Global,
    ProfileService,
    RegisterService,
    NavParams,
    AppointmentServiceFilter,
    AppointmentlistService,
    ExploreService,


  ]
})
export class InsurancePageModule {}
