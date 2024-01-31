import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyLabreportsviewPage } from './my-labreportsview.page';

const routes: Routes = [
  {
    path: '',
    component: MyLabreportsviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyLabreportsviewPageRoutingModule {}
