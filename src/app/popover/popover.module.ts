import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopoverPageRoutingModule } from './popover-routing.module';

import { PopoverPage } from './popover.page';
import {IonicStorageModule} from "@ionic/storage-angular";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    IonicStorageModule.forRoot(),
    PopoverPageRoutingModule
  ],
  declarations: [PopoverPage],
  providers: [Storage]
})
export class PopoverPageModule {}
