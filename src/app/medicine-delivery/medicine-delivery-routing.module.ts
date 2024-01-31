import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicineDeliveryPage } from './medicine-delivery.page';

const routes: Routes = [
  {
    path: '',
    component: MedicineDeliveryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicineDeliveryPageRoutingModule {}
