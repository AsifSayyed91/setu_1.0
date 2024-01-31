import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { AccountRegisterNewPageRoutingModule } from './account-register-new-routing.module';

import { AccountRegisterNewPage } from './account-register-new.page';
import {Global} from "../globalpath";
import {RegisterService} from "../account-register/account.service";
import {ExploreService} from "../explore-services/explore-services.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,


    AccountRegisterNewPageRoutingModule
  ],
  declarations: [AccountRegisterNewPage],
  providers: [NavParams,Global, RegisterService, ExploreService]
})
export class AccountRegisterNewPageModule {}
