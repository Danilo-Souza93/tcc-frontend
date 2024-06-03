import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalheProdutoComponent } from './detalhe-produto/detalhe-produto.component';
import { AppComponent } from './app.component';

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
    loadChildren: () => import('./detalhe-produto/detalhe-produto.module').then(m => m.DetalheProdutoModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
