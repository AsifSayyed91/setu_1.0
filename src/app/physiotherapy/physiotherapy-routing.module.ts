import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhysiotherapyPage } from './physiotherapy.page';

const routes: Routes = [
  {
    path: '',
    component: PhysiotherapyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhysiotherapyPageRoutingModule {}
