import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainEntregadorPage } from './main-entregador.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: MainEntregadorPage,
    children: [
      {
        path: 'inicial',
        loadChildren: () => import('../pages/inicio-ent/inicio-ent.module').then(m => m.InicioEntPageModule)
      },
      {
        path: 'entregas',
        loadChildren: () => import('../pages/entregas-ent/entregas-ent.module').then(m => m.EntregasEntPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../pages/perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'pent',
        loadChildren: () => import('../pages/pent/pent.module').then(m => m.PentPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/inicio-ent',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainEntregadorPageRoutingModule {}
