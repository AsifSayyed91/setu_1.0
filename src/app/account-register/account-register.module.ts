import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountRegisterPageRoutingModule } from './account-register-routing.module';

import { AccountRegisterPage } from './account-register.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AccountRegisterPageRoutingModule
  ],
  declarations: [AccountRegisterPage]
})
export class AccountRegisterPageModule {}
