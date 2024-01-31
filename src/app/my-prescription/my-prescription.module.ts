import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { MyPrescriptionPageRoutingModule } from './my-prescription-routing.module';

import { MyPrescriptionPage } from './my-prescription.page';
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgxPaginationModule,
    MyPrescriptionPageRoutingModule
  ],
  declarations: [MyPrescriptionPage],
  providers:[NavParams]
})
export class MyPrescriptionPageModule {}
