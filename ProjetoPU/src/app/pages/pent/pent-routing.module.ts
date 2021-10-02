import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PentPage } from './pent.page';

const routes: Routes = [
  {
    path: '',
    component: PentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PentPageRoutingModule {}
