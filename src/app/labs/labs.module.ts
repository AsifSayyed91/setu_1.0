import { NgModule } from '@angular/core';
import { LabsPageRoutingModule } from './labs-routing.module';
import { LabsPage } from './labs.page';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IonicModule, NavParams} from "@ionic/angular";
import {Global} from "../globalpath";
import {DiagnosticsService} from "../diagnostics/diagnostics.service";
import {MyRefferalsService} from "../my-refferals/my-refferals.service";
import {LabService} from "./lab-service";
import {MyLabreportsService} from "../my-labreports/my-labreports.service";

@NgModule({
  imports: [
    CommonModule,
   ReactiveFormsModule,
    FormsModule,
    IonicModule,
    LabsPageRoutingModule
  ],
  declarations: [LabsPage],
  providers: [
    Global,
    NavParams,
    DiagnosticsService,
    MyRefferalsService,
    LabService,
    MyLabreportsService,

  ]
})
export class LabsPageModule {}
