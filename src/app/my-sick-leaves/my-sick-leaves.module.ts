import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MySickLeavesPageRoutingModule } from './my-sick-leaves-routing.module';

import { MySickLeavesPage } from './my-sick-leaves.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    MySickLeavesPageRoutingModule
  ],
  declarations: [MySickLeavesPage]
})
export class MySickLeavesPageModule {}
