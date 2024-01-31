import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { VitalsPageRoutingModule } from './vitals-routing.module';

import { VitalsPage } from './vitals.page';
import {VitalServices} from "./vital-services";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VitalsPageRoutingModule
  ],
  declarations: [VitalsPage],
  providers: [VitalServices,NavParams]
})
export class VitalsPageModule {}
