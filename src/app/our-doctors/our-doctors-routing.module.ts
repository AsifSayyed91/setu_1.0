import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OurDoctorsPage } from './our-doctors.page';

const routes: Routes = [
  {
    path: '',
    component: OurDoctorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OurDoctorsPageRoutingModule {}
