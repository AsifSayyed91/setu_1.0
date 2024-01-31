import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { ExploreServicesPageRoutingModule } from './explore-services-routing.module';

import { ExploreServicesPage } from './explore-services.page';
import {Global} from "../globalpath";
import {ExploreService} from "./explore-services.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    ExploreServicesPageRoutingModule
  ],
  declarations: [ExploreServicesPage],
  providers: [NavParams, Global, ExploreService  ]
})
export class ExploreServicesPageModule {}
