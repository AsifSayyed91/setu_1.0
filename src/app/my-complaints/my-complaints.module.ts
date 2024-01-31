import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { MyComplaintsPageRoutingModule } from './my-complaints-routing.module';

import { MyComplaintsPage } from './my-complaints.page';
import {MyComplaintsService} from "./my-complaints.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MyComplaintsPageRoutingModule
  ],
  declarations: [MyComplaintsPage],
  providers: [NavParams, MyComplaintsService]
})
export class MyComplaintsPageModule {}
