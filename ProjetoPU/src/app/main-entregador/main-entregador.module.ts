import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainEntregadorPageRoutingModule } from './main-entregador-routing.module';

import { MainEntregadorPage } from './main-entregador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainEntregadorPageRoutingModule
  ],
  declarations: [MainEntregadorPage]
})
export class MainEntregadorPageModule {}
