import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordPageRoutingModule } from './forgot-password-routing.module';

import { ForgotPasswordPage } from './forgot-password.page';
import {Global} from "../globalpath";
import {LoginService} from "../login/login.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ForgotPasswordPageRoutingModule
  ],
  declarations: [ForgotPasswordPage],
  providers: [Global, LoginService]
})
export class ForgotPasswordPageModule {}
