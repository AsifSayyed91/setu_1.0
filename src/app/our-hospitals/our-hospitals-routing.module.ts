import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OurHospitalsPage } from './our-hospitals.page';

const routes: Routes = [
  {
    path: '',
    component: OurHospitalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OurHospitalsPageRoutingModule {}
