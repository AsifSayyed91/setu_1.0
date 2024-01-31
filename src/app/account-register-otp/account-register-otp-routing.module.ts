import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountRegisterOtpPage } from './account-register-otp.page';

const routes: Routes = [
  {
    path: '',
    component: AccountRegisterOtpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRegisterOtpPageRoutingModule {}
