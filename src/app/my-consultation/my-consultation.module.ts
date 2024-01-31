import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { MyConsultationPageRoutingModule } from './my-consultation-routing.module';

import { MyConsultationPage } from './my-consultation.page';
import {RatingService} from "../rating/rating.service";
import {MyPrescriptionService} from "../my-prescription/my-prescription.service";
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgxPaginationModule,
    MyConsultationPageRoutingModule
  ],
  declarations: [MyConsultationPage],
  providers: [
    RatingService, MyPrescriptionService, NavParams// Ensure that RatingService is declared as a provider here.
  ],
})
export class MyConsultationPageModule {}
