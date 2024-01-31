import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicineDeliveryViewPage } from './medicine-delivery-view.page';

const routes: Routes = [
  {
    path: '',
    component: MedicineDeliveryViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicineDeliveryViewPageRoutingModule {}
