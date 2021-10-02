import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntregasEntPageRoutingModule } from './entregas-ent-routing.module';

import { EntregasEntPage } from './entregas-ent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntregasEntPageRoutingModule
  ],
  declarations: [EntregasEntPage]
})
export class EntregasEntPageModule {}
