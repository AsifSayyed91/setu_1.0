import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule, NavParams} from '@ionic/angular';
import { MyPrescriptionviewPageRoutingModule } from './my-prescriptionview-routing.module';
import { MyPrescriptionviewPage } from './my-prescriptionview.page';
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    NgxPaginationModule,
    MyPrescriptionviewPageRoutingModule
  ],
  declarations: [MyPrescriptionviewPage],
  providers: [NavParams]
})
export class MyPrescriptionviewPageModule {}
