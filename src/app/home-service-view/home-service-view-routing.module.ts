import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeServiceViewPage } from './home-service-view.page';

const routes: Routes = [
  {
    path: '',
    component: HomeServiceViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeServiceViewPageRoutingModule {}
