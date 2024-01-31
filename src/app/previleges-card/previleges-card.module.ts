import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrevilegesCardPageRoutingModule } from './previleges-card-routing.module';

import { PrevilegesCardPage } from './previleges-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    PrevilegesCardPageRoutingModule
  ],
  declarations: [PrevilegesCardPage]
})
export class PrevilegesCardPageModule {}
