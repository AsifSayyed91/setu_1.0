import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OurHospitalsPageRoutingModule } from './our-hospitals-routing.module';

import { OurHospitalsPage } from './our-hospitals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    OurHospitalsPageRoutingModule
  ],
  declarations: [OurHospitalsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OurHospitalsPageModule {}
