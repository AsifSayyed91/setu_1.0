import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MysickleavesviewPageRoutingModule } from './mysickleavesview-routing.module';

import { MysickleavesviewPage } from './mysickleavesview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    MysickleavesviewPageRoutingModule
  ],
  declarations: [MysickleavesviewPage]
})
export class MysickleavesviewPageModule {}
