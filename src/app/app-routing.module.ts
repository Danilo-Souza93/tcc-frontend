import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalheProdutoComponent } from './detalhe-produto/detalhe-produto.component';
import { AppComponent } from './app.component';
import { CompraComponent } from './compra/compra.component';

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path:'home',
    component: AppComponent,
    loadChildren: () => import('./apresentacao/apresentacao.module').then(m => m.ApresentacaoModule)
  },
  {
    path: 'detalhe-produto',
    component: DetalheProdutoComponent,
    loadChildren: () => import('./detalhe-produto/detalhe-produto.module').then(m => m.DetalheProdutoModule)
  },
  {
    path: 'compra',
    component: CompraComponent,
    loadChildren: () => import('./compra/compra.module').then(m => m.CompraModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
