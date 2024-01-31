import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { MyLabreportsviewPageRoutingModule } from './my-labreportsview-routing.module';

import { MyLabreportsviewPage } from './my-labreportsview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    MyLabreportsviewPageRoutingModule
  ],
  declarations: [MyLabreportsviewPage],
  providers: [NavParams]
})
export class MyLabreportsviewPageModule {}
