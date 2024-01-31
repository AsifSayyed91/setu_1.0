import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FileuploadformylabreportsPageRoutingModule } from './fileuploadformylabreports-routing.module';

import { FileuploadformylabreportsPage } from './fileuploadformylabreports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FileuploadformylabreportsPageRoutingModule
  ],
  declarations: [FileuploadformylabreportsPage]
})
export class FileuploadformylabreportsPageModule {}
