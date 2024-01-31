import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { ChangepasswordPageRoutingModule } from './changepassword-routing.module';

import { ChangepasswordPage } from './changepassword.page';
import {ChangePasswordService} from "./change-password.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    ChangepasswordPageRoutingModule
  ],
  declarations: [ChangepasswordPage],

  providers: [{ provide: Storage, useFactory: () => localStorage },ChangePasswordService, NavParams]
})
export class ChangepasswordPageModule {}
