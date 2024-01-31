import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule, NavParams} from '@ionic/angular';
import { RatingPageRoutingModule } from './rating-routing.module';
import { RatingPage } from './rating.page';
import {MyConsultationviewService} from "../my-consultationview/my-consultationview.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RatingPageRoutingModule
  ],
  declarations: [RatingPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[NavParams,MyConsultationviewService]
})
export class RatingPageModule {}
