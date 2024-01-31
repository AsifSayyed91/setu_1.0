import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SymptomsNewPageRoutingModule } from './symptoms-new-routing.module';
import { SymptomsNewPage } from './symptoms-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    SymptomsNewPageRoutingModule
  ],
  declarations: [SymptomsNewPage]
})
export class SymptomsNewPageModule {}
