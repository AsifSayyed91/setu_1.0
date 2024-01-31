import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartnersPageRoutingModule } from './partners-routing.module';

import { PartnersPage } from './partners.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    PartnersPageRoutingModule
  ],
  declarations: [PartnersPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PartnersPageModule {}
