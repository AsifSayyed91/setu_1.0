import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, NavParams} from '@ionic/angular';

import { UpPhotoApplistPageRoutingModule } from './up-photo-applist-routing.module';

import { UpPhotoApplistPage } from './up-photo-applist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpPhotoApplistPageRoutingModule
  ],
  declarations: [UpPhotoApplistPage],
  providers:[NavParams]
})
export class UpPhotoApplistPageModule {}
