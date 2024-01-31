import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPrescriptionviewPage } from './my-prescriptionview.page';

const routes: Routes = [
  {
    path: '',
    component: MyPrescriptionviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPrescriptionviewPageRoutingModule {}
