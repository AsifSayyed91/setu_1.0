import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MySickLeavesPage } from './my-sick-leaves.page';

const routes: Routes = [
  {
    path: '',
    component: MySickLeavesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MySickLeavesPageRoutingModule {}
