import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { BookAppointmentFilterPageRoutingModule } from './book-appointment-filter-routing.module';

import { BookAppointmentFilterPage } from './book-appointment-filter.page';
import {ProfileService} from "../profile/profile.service";
import {Global} from "../globalpath";
import {ExploreService} from "../explore-services/explore-services.service";
import {CompleteTestService} from "../providers/network/Autocomplete.service";
import {RegisterService} from "../account-register/account.service";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";
import {AppointmentServiceFilter} from "./book-appointmentfilter.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    BookAppointmentFilterPageRoutingModule
  ],
  declarations: [BookAppointmentFilterPage],
  providers: [ProfileService,
    Global,
    ExploreService,
    CompleteTestService,
    RegisterService,
    NavParams,
    AppointmentlistService,
    AppointmentServiceFilter    ]
})
export class BookAppointmentFilterPageModule {}
