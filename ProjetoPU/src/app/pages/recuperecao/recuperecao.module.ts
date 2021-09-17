import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperecaoPageRoutingModule } from './recuperecao-routing.module';

import { RecuperecaoPage } from './recuperecao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperecaoPageRoutingModule
  ],
  declarations: [RecuperecaoPage]
})
export class RecuperecaoPageModule {}
