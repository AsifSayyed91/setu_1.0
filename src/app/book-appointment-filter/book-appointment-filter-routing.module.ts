import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookAppointmentFilterPage } from './book-appointment-filter.page';

const routes: Routes = [
  {
    path: '',
    component: BookAppointmentFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookAppointmentFilterPageRoutingModule {}
