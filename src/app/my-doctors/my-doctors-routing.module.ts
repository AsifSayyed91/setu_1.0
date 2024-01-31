import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyDoctorsPage } from './my-doctors.page';

const routes: Routes = [
  {
    path: '',
    component: MyDoctorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyDoctorsPageRoutingModule {}
