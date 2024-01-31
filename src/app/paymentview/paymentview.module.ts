import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaymentviewPageRoutingModule } from './paymentview-routing.module';
import { PaymentviewPage } from './paymentview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    PaymentviewPageRoutingModule
  ],
  declarations: [PaymentviewPage]
})
export class PaymentviewPageModule {}
