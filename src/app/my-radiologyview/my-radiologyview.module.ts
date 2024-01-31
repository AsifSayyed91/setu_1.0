import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { MyRadiologyviewPageRoutingModule } from './my-radiologyview-routing.module';

import { MyRadiologyviewPage } from './my-radiologyview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    MyRadiologyviewPageRoutingModule
  ],
  declarations: [MyRadiologyviewPage],
  providers: [NavParams]
})
export class MyRadiologyviewPageModule {}
