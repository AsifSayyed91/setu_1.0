import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalTourismViewPage } from './medical-tourism-view.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalTourismViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalTourismViewPageRoutingModule {}
