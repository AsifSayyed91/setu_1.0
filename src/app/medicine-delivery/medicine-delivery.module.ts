import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { MedicineDeliveryPageRoutingModule } from './medicine-delivery-routing.module';

import { MedicineDeliveryPage } from './medicine-delivery.page';
import {ExploreService} from "../explore-services/explore-services.service";
import {Global} from "../globalpath";
import {MedicineDeliveryService} from "./medicine-delivery.service";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MedicineDeliveryPageRoutingModule
  ],
  declarations: [MedicineDeliveryPage],
  providers: [
    NavParams,
    ExploreService,
    Global,
    MedicineDeliveryService,
    AppointmentlistService,

  ]
})
export class MedicineDeliveryPageModule {}
