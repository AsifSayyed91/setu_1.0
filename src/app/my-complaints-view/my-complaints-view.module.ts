import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyComplaintsViewPageRoutingModule } from './my-complaints-view-routing.module';

import { MyComplaintsViewPage } from './my-complaints-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    MyComplaintsViewPageRoutingModule
  ],
  declarations: [MyComplaintsViewPage]
})
export class MyComplaintsViewPageModule {}
