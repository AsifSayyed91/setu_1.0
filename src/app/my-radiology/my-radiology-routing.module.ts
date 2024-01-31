import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyRadiologyPage } from './my-radiology.page';

const routes: Routes = [
  {
    path: '',
    component: MyRadiologyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyRadiologyPageRoutingModule {}
