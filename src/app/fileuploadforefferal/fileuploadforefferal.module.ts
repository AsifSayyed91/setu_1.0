import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FileuploadforefferalPageRoutingModule } from './fileuploadforefferal-routing.module';

import { FileuploadforefferalPage } from './fileuploadforefferal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    FileuploadforefferalPageRoutingModule
  ],
  declarations: [FileuploadforefferalPage]
})
export class FileuploadforefferalPageModule {}
