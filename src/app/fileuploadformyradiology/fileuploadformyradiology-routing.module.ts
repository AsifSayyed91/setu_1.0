import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileuploadformyradiologyPage } from './fileuploadformyradiology.page';

const routes: Routes = [
  {
    path: '',
    component: FileuploadformyradiologyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileuploadformyradiologyPageRoutingModule {}
