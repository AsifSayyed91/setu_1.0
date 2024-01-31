import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { ChronicPatientManagementPageRoutingModule } from './chronic-patient-management-routing.module';

import { ChronicPatientManagementPage } from './chronic-patient-management.page';
import {Global} from "../globalpath";
import {ChronicPatinetManagementService} from "./chronic-patinet-management.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    ChronicPatientManagementPageRoutingModule
  ],
  declarations: [ChronicPatientManagementPage],
  providers: [
    NavParams,
    Global,
    ChronicPatinetManagementService,

  ]
})
export class ChronicPatientManagementPageModule {}
