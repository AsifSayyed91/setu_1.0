import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyConsultationviewPage } from './my-consultationview.page';

const routes: Routes = [
  {
    path: '',
    component: MyConsultationviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyConsultationviewPageRoutingModule {}
