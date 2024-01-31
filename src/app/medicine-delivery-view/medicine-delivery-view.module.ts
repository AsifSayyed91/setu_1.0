import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicineDeliveryViewPageRoutingModule } from './medicine-delivery-view-routing.module';

import { MedicineDeliveryViewPage } from './medicine-delivery-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    MedicineDeliveryViewPageRoutingModule
  ],
  declarations: [MedicineDeliveryViewPage]
})
export class MedicineDeliveryViewPageModule {}
