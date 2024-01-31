import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiagnosticsLabsPage } from './diagnostics-labs.page';

const routes: Routes = [
  {
    path: '',
    component: DiagnosticsLabsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiagnosticsLabsPageRoutingModule {}
