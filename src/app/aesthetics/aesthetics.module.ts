import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { AestheticsPageRoutingModule } from './aesthetics-routing.module';

import { AestheticsPage } from './aesthetics.page';
import {Global} from "../globalpath";
import {MyRefferalsService} from "../my-refferals/my-refferals.service";
import {AestheticsService} from "./aesthetics.service";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    AestheticsPageRoutingModule
  ],
  declarations: [AestheticsPage],
  providers: [
    NavParams,
    Global,
    MyRefferalsService,
    AestheticsService,
    AppointmentlistService,

  ]
})
export class AestheticsPageModule {}
