import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileuploadformylabreportsPage } from './fileuploadformylabreports.page';

const routes: Routes = [
  {
    path: '',
    component: FileuploadformylabreportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileuploadformylabreportsPageRoutingModule {}
