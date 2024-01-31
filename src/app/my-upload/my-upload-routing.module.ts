import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyUploadPage } from './my-upload.page';

const routes: Routes = [
  {
    path: '',
    component: MyUploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyUploadPageRoutingModule {}
