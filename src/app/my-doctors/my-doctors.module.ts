import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyDoctorsPageRoutingModule } from './my-doctors-routing.module';

import { MyDoctorsPage } from './my-doctors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    MyDoctorsPageRoutingModule
  ],
  declarations: [MyDoctorsPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class MyDoctorsPageModule {}
