import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { MyRadiologyPageRoutingModule } from './my-radiology-routing.module';

import { MyRadiologyPage } from './my-radiology.page';
import {MyRadiologyService} from "./my-radiology.service";
import {MyLabreportsService} from "../my-labreports/my-labreports.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MyRadiologyPageRoutingModule
  ],
  declarations: [MyRadiologyPage],
  providers: [NavParams,MyRadiologyService,MyLabreportsService]
})
export class MyRadiologyPageModule {}
