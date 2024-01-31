import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewBookAppointmentPage } from './new-book-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: NewBookAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewBookAppointmentPageRoutingModule {}
