import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewBookAppointmentPageRoutingModule } from './new-book-appointment-routing.module';

import { NewBookAppointmentPage } from './new-book-appointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    NewBookAppointmentPageRoutingModule
  ],
  declarations: [NewBookAppointmentPage]
})
export class NewBookAppointmentPageModule {}
