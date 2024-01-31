import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FileuploadformyradiologyPageRoutingModule } from './fileuploadformyradiology-routing.module';

import { FileuploadformyradiologyPage } from './fileuploadformyradiology.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    FileuploadformyradiologyPageRoutingModule
  ],
  declarations: [FileuploadformyradiologyPage]
})
export class FileuploadformyradiologyPageModule {}
