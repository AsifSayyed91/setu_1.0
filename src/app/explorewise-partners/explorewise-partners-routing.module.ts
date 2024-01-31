import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExplorewisePartnersPage } from './explorewise-partners.page';

const routes: Routes = [
  {
    path: '',
    component: ExplorewisePartnersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExplorewisePartnersPageRoutingModule {}
