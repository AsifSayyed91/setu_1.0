import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyConsultationPage } from './my-consultation.page';

const routes: Routes = [
  {
    path: '',
    component: MyConsultationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyConsultationPageRoutingModule {}
