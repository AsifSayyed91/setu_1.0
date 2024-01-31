import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentviewPage } from './paymentview.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentviewPageRoutingModule {}
