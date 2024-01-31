import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeViewPageRoutingModule } from './employee-view-routing.module';

import { EmployeeViewPage } from './employee-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    EmployeeViewPageRoutingModule
  ],
  declarations: [EmployeeViewPage]
})
export class EmployeeViewPageModule {}
