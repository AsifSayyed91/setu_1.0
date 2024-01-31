import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule, NavParams} from '@ionic/angular';
import { DiagnosticsPageRoutingModule } from './diagnostics-routing.module';
import { DiagnosticsPage } from './diagnostics.page';
import {Global} from "../globalpath";
import {DiagnosticsService} from "./diagnostics.service";
import {MyRefferalsService} from "../my-refferals/my-refferals.service";
import {MyLabreportsService} from "../my-labreports/my-labreports.service";
import {MyRadiologyService} from "../my-radiology/my-radiology.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    DiagnosticsPageRoutingModule
  ],
  declarations: [DiagnosticsPage],
  providers: [
    Global,
    NavParams,
    DiagnosticsService,
    MyRefferalsService,
    MyLabreportsService,
    MyRadiologyService,

  ]
})
export class DiagnosticsPageModule {}
