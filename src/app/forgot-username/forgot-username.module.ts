import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotUsernamePageRoutingModule } from './forgot-username-routing.module';

import { ForgotUsernamePage } from './forgot-username.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ForgotUsernamePageRoutingModule
  ],
  declarations: [ForgotUsernamePage]
})
export class ForgotUsernamePageModule {}
