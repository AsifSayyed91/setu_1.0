import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { MyUploadPageRoutingModule } from './my-upload-routing.module';

import { MyUploadPage } from './my-upload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
  IonicModule,
    MyUploadPageRoutingModule
  ],
  declarations: [MyUploadPage],
  providers: [NavParams]
})
export class MyUploadPageModule {}
