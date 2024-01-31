import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyLabreportsPage } from './my-labreports.page';

const routes: Routes = [
  {
    path: '',
    component: MyLabreportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyLabreportsPageRoutingModule {}
