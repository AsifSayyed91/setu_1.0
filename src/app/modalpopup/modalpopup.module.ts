import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalpopupPageRoutingModule } from './modalpopup-routing.module';

import { ModalpopupPage } from './modalpopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    ModalpopupPageRoutingModule
  ],
  declarations: [ModalpopupPage]
})
export class ModalpopupPageModule {}
