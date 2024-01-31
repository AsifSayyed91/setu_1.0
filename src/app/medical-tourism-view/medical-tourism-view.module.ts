import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicalTourismViewPageRoutingModule } from './medical-tourism-view-routing.module';

import { MedicalTourismViewPage } from './medical-tourism-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    MedicalTourismViewPageRoutingModule
  ],
  declarations: [MedicalTourismViewPage]
})
export class MedicalTourismViewPageModule {}
