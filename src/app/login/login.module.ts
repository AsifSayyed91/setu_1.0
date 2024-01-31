import { NgModule } from '@angular/core';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {Global} from "../globalpath";
import {LoginService} from "./login.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage],
  providers: [Global, LoginService ]
})
export class LoginPageModule {}
