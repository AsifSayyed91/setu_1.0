import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExploreServicesPage } from './explore-services.page';

const routes: Routes = [
  {
    path: '',
    component: ExploreServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreServicesPageRoutingModule {}
