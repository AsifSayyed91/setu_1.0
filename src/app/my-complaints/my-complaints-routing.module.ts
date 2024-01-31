import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyComplaintsPage } from './my-complaints.page';

const routes: Routes = [
  {
    path: '',
    component: MyComplaintsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyComplaintsPageRoutingModule {}
