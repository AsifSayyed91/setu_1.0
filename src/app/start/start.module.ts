import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { StartPageRoutingModule } from './start-routing.module';

import { StartPage } from './start.page';

@NgModule({
  imports: [
    // IonicPageModule.forChild(StartPage),
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    StartPageRoutingModule
  ],
  declarations: [StartPage],
  providers: [NavParams]
})
export class StartPageModule {}
