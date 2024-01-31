import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { InquiryPageRoutingModule } from './inquiry-routing.module';

import { InquiryPage } from './inquiry.page';
import {MyPrescriptionService} from "../my-prescription/my-prescription.service";
import {RatingService} from "../rating/rating.service";
import {MyInquiryService} from "./my-inquiry.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    InquiryPageRoutingModule
  ],
  declarations: [InquiryPage],
  providers: [
     NavParams,MyInquiryService// Ensure that RatingService is declared as a provider here.
  ],
})
export class InquiryPageModule {}
