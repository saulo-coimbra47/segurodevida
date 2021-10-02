import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: MainPage,
    children: [
      {
        path: 'inicial',
        loadChildren: () => import('../pages/inicial/inicial.module').then(m => m.InicialPageModule)
      },
      {
        path: 'entregas',
        loadChildren: () => import('../pages/entregas/entregas.module').then(m => m.EntregasPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../pages/perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'cad',
        loadChildren: () => import('../pages/cad/cad.module').then(m => m.CadPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/inicial',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
