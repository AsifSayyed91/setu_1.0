import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyRefferalsPage } from './my-refferals.page';

const routes: Routes = [
  {
    path: '',
    component: MyRefferalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyRefferalsPageRoutingModule {}
