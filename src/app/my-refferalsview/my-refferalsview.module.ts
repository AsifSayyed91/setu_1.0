import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyRefferalsviewPageRoutingModule } from './my-refferalsview-routing.module';

import { MyRefferalsviewPage } from './my-refferalsview.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MyRefferalsviewPageRoutingModule
  ],
  declarations: [MyRefferalsviewPage]
})
export class MyRefferalsviewPageModule {}
