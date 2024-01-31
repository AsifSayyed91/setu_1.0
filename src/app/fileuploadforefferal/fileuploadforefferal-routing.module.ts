import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileuploadforefferalPage } from './fileuploadforefferal.page';

const routes: Routes = [
  {
    path: '',
    component: FileuploadforefferalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileuploadforefferalPageRoutingModule {}
