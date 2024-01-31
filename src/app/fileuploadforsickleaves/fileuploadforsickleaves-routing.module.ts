import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileuploadforsickleavesPage } from './fileuploadforsickleaves.page';

const routes: Routes = [
  {
    path: '',
    component: FileuploadforsickleavesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileuploadforsickleavesPageRoutingModule {}
