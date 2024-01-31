import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorewisePartnersPageRoutingModule } from './explorewise-partners-routing.module';

import { ExplorewisePartnersPage } from './explorewise-partners.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    ExplorewisePartnersPageRoutingModule
  ],
  declarations: [ExplorewisePartnersPage]
})
export class ExplorewisePartnersPageModule {}
