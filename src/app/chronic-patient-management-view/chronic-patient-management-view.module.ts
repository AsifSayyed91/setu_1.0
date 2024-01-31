import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChronicPatientManagementViewPageRoutingModule } from './chronic-patient-management-view-routing.module';

import { ChronicPatientManagementViewPage } from './chronic-patient-management-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    ChronicPatientManagementViewPageRoutingModule
  ],
  declarations: [ChronicPatientManagementViewPage]
})
export class ChronicPatientManagementViewPageModule {}
