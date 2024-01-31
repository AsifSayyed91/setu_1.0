import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SymptomsNewPage } from './symptoms-new.page';

const routes: Routes = [
  {
    path: '',
    component: SymptomsNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SymptomsNewPageRoutingModule {}
