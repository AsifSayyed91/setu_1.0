import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountRegisterNewPage } from './account-register-new.page';

const routes: Routes = [
  {
    path: '',
    component: AccountRegisterNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRegisterNewPageRoutingModule {}
