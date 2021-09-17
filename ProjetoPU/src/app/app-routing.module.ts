import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/start/start.module').then( m => m.StartPageModule)},
  {
    path: 'recuperecao',
    loadChildren: () => import('./pages/recuperecao/recuperecao.module').then( m => m.RecuperecaoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
