import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { MedicalTourismPageRoutingModule } from './medical-tourism-routing.module';

import { MedicalTourismPage } from './medical-tourism.page';
import {MedicalTourismService} from "./medical-tourism.service";
import {Global} from "../globalpath";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MedicalTourismPageRoutingModule
  ],
  declarations: [MedicalTourismPage],
  providers: [
    NavParams,
    MedicalTourismService,
    Global,
    AppointmentlistService,

  ]
})
export class MedicalTourismPageModule {}
