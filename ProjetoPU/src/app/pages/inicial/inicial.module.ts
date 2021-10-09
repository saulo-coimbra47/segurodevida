import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicialPageRoutingModule } from './inicial-routing.module';


import { InicialPage } from './inicial.page';
import { ModalCadComponent } from 'src/app/componentes/modal-cad/modal-cad.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicialPageRoutingModule

  ],
  declarations: [InicialPage, ModalCadComponent],
  entryComponents: [ModalCadComponent]
})
export class InicialPageModule {}
