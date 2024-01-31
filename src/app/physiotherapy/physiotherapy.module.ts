import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { PhysiotherapyPageRoutingModule } from './physiotherapy-routing.module';

import { PhysiotherapyPage } from './physiotherapy.page';
import {Global} from "../globalpath";
import {MyRefferalsService} from "../my-refferals/my-refferals.service";
import {PhysiotherapyService} from "./physiotherapy.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PhysiotherapyPageRoutingModule
  ],
  declarations: [PhysiotherapyPage],
  providers: [
    NavParams,
    Global,
    MyRefferalsService,
    PhysiotherapyService,

  ]
})
export class PhysiotherapyPageModule {}
