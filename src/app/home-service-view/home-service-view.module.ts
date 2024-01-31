import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeServiceViewPageRoutingModule } from './home-service-view-routing.module';

import { HomeServiceViewPage } from './home-service-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    HomeServiceViewPageRoutingModule
  ],
  declarations: [HomeServiceViewPage]
})
export class HomeServiceViewPageModule {}
