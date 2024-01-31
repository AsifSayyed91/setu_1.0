import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChronicPatientManagementViewPage } from './chronic-patient-management-view.page';

const routes: Routes = [
  {
    path: '',
    component: ChronicPatientManagementViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChronicPatientManagementViewPageRoutingModule {}
