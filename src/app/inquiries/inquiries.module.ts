import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { InquiriesPageRoutingModule } from './inquiries-routing.module';

import { InquiriesPage } from './inquiries.page';
import {InquiriesService} from "./inquiries.service";
import {DiagnosticsService} from "../diagnostics/diagnostics.service";
import {MyRefferalsService} from "../my-refferals/my-refferals.service";
import {LabService} from "../labs/lab-service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    InquiriesPageRoutingModule
  ],
  declarations: [InquiriesPage],
  providers: [NavParams, InquiriesService,DiagnosticsService, MyRefferalsService, LabService]
})
export class InquiriesPageModule {}
