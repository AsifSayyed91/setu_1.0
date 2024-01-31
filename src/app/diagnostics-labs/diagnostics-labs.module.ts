import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiagnosticsLabsPageRoutingModule } from './diagnostics-labs-routing.module';

import { DiagnosticsLabsPage } from './diagnostics-labs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    DiagnosticsLabsPageRoutingModule
  ],
  declarations: [DiagnosticsLabsPage]
})
export class DiagnosticsLabsPageModule {}
