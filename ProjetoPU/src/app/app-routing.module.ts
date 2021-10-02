import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/start/start.module').then( m => m.StartPageModule)},
  {
    path: 'recuperecao',
    loadChildren: () => import('./pages/recuperecao/recuperecao.module').then( m => m.RecuperecaoPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'main-entregador',
    loadChildren: () => import('./main-entregador/main-entregador.module').then( m => m.MainEntregadorPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
