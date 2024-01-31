import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyRefferalsviewPage } from './my-refferalsview.page';

const routes: Routes = [
  {
    path: '',
    component: MyRefferalsviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyRefferalsviewPageRoutingModule {}
