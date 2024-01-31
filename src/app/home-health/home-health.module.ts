import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { HomeHealthPageRoutingModule } from './home-health-routing.module';

import { HomeHealthPage } from './home-health.page';
import {ExploreService} from "../explore-services/explore-services.service";
import {Global} from "../globalpath";
import {HomeHealthService} from "./home-health.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    HomeHealthPageRoutingModule
  ],
  declarations: [HomeHealthPage],
  providers: [
    NavParams,
    ExploreService,
    Global,
    HomeHealthService,

  ]
})
export class HomeHealthPageModule {}
