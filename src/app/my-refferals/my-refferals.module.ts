import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule, NavParams} from '@ionic/angular';
import { MyRefferalsPageRoutingModule } from './my-refferals-routing.module';
import { MyRefferalsPage } from './my-refferals.page';
import {MyRefferalsService} from "./my-refferals.service";
import {Global} from "../globalpath";
import {MyLabreportsService} from "../my-labreports/my-labreports.service";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MyRefferalsPageRoutingModule
  ],
  declarations: [MyRefferalsPage],
  providers: [
    NavParams,
    MyRefferalsService,
    Global,
    MyLabreportsService,
    AppointmentlistService,

  ]
})
export class MyRefferalsPageModule {}
