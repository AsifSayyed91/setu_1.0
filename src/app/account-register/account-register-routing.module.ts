import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountRegisterPage } from './account-register.page';

const routes: Routes = [
  {
    path: '',
    component: AccountRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRegisterPageRoutingModule {}
