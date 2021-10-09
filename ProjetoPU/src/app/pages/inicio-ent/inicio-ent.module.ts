import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioEntPageRoutingModule } from './inicio-ent-routing.module';

import { InicioEntPage } from './inicio-ent.page';
import { ModalPentComponent } from 'src/app/componentes/modal-pent/modal-pent.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioEntPageRoutingModule
  ],
  declarations: [InicioEntPage, ModalPentComponent],
  entryComponents: [ModalPentComponent]
})
export class InicioEntPageModule {}
