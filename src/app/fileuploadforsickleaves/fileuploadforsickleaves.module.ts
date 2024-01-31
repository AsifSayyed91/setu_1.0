import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FileuploadforsickleavesPageRoutingModule } from './fileuploadforsickleaves-routing.module';

import { FileuploadforsickleavesPage } from './fileuploadforsickleaves.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    FileuploadforsickleavesPageRoutingModule
  ],
  declarations: [FileuploadforsickleavesPage]
})
export class FileuploadforsickleavesPageModule {}
