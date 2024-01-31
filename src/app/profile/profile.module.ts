import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import {ProfileService} from "./profile.service";
import {Global} from "../globalpath";
import {RegisterService} from "../account-register/account.service";
import {ExploreService} from "../explore-services/explore-services.service";
import {IonicStorageModule} from "@ionic/storage-angular";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IonicStorageModule.forRoot(),
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage],
  providers: [
    DatePipe,
    ProfileService,
    Global,
    RegisterService,
    NavParams,
    ExploreService,

  ]
})
export class ProfilePageModule {}
