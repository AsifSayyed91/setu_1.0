import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import {Global} from "../globalpath";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";
import {MyPrescriptionService} from "../my-prescription/my-prescription.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,

    HomePageRoutingModule
  ],
  declarations: [HomePage],
  providers: [NavParams, Global, AppointmentlistService, MyPrescriptionService, Storage  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
