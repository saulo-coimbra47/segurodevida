import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntregasEntPage } from './entregas-ent.page';

const routes: Routes = [
  {
    path: '',
    component: EntregasEntPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntregasEntPageRoutingModule {}
