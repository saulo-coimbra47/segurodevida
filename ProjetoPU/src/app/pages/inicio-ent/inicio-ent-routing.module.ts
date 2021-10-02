import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioEntPage } from './inicio-ent.page';

const routes: Routes = [
  {
    path: '',
    component: InicioEntPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioEntPageRoutingModule {}
