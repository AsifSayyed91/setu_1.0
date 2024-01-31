import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrevilegesCardPage } from './previleges-card.page';

const routes: Routes = [
  {
    path: '',
    component: PrevilegesCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrevilegesCardPageRoutingModule {}
