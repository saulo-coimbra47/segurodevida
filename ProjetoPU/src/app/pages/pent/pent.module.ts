import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PentPageRoutingModule } from './pent-routing.module';

import { PentPage } from './pent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PentPageRoutingModule
  ],
  declarations: [PentPage]
})
export class PentPageModule {}
