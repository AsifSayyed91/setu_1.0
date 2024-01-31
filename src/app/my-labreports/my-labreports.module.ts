import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule, NavParams} from '@ionic/angular';
import { MyLabreportsPageRoutingModule } from './my-labreports-routing.module';
import { MyLabreportsPage } from './my-labreports.page';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    NgxPaginationModule,
    MyLabreportsPageRoutingModule
  ],
  declarations: [MyLabreportsPage],
  providers: [NavParams]
})
export class MyLabreportsPageModule {}
