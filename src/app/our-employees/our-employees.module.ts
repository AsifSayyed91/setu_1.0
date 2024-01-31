import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OurEmployeesPageRoutingModule } from './our-employees-routing.module';

import { OurEmployeesPage } from './our-employees.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    OurEmployeesPageRoutingModule
  ],
  declarations: [OurEmployeesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OurEmployeesPageModule {}
