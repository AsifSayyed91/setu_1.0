import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentsPageRoutingModule } from './payments-routing.module';

import { PaymentsPage } from './payments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    PaymentsPageRoutingModule
  ],
  declarations: [PaymentsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaymentsPageModule {}
