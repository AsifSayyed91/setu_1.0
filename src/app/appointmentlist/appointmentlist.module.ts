import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentlistPageRoutingModule } from './appointmentlist-routing.module';

import { AppointmentlistPage } from './appointmentlist.page';
import {AppointmentlistService} from "./appointmentlist.service";
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgxPaginationModule,
    AppointmentlistPageRoutingModule
  ],
  declarations: [AppointmentlistPage],
  providers: [
    AppointmentlistService, // Ensure that AppointmentlistService is declared as a provider here.
  ],
})
export class AppointmentlistPageModule {}
