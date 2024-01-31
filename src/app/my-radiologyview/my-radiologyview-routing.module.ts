import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyRadiologyviewPage } from './my-radiologyview.page';

const routes: Routes = [
  {
    path: '',
    component: MyRadiologyviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyRadiologyviewPageRoutingModule {}
