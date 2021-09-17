import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperecaoPage } from './recuperecao.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperecaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperecaoPageRoutingModule {}
