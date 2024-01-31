import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalTourismPage } from './medical-tourism.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalTourismPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalTourismPageRoutingModule {}
