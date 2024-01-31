import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpPhotoApplistPage } from './up-photo-applist.page';

const routes: Routes = [
  {
    path: '',
    component: UpPhotoApplistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpPhotoApplistPageRoutingModule {}
