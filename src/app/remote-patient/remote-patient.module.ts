import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemotePatientPageRoutingModule } from './remote-patient-routing.module';

import { RemotePatientPage } from './remote-patient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    RemotePatientPageRoutingModule
  ],
  declarations: [RemotePatientPage]
})
export class RemotePatientPageModule {}
