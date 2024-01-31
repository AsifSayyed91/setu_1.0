import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OurDoctorsPageRoutingModule } from './our-doctors-routing.module';

import { OurDoctorsPage } from './our-doctors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    OurDoctorsPageRoutingModule
  ],
  declarations: [OurDoctorsPage]
})
export class OurDoctorsPageModule {}
