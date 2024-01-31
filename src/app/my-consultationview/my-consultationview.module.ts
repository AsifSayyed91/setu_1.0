import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { MyConsultationviewPageRoutingModule } from './my-consultationview-routing.module';

import { MyConsultationviewPage } from './my-consultationview.page';
import {MyConsultationviewService} from "./my-consultationview.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    MyConsultationviewPageRoutingModule
  ],
  declarations: [MyConsultationviewPage],
  providers: [
    MyConsultationviewService, NavParams// Add your service here
  ],
})
export class MyConsultationviewPageModule {}
