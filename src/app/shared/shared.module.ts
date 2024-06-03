import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApresentacaoProdutoComponent } from './components/apresentacao-produto/apresentacao-produto.component';
import { MoedaBrlPipe } from './pipes/moeda-brl.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    ApresentacaoProdutoComponent,
    MoedaBrlPipe,
    NavBarComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports:[
    ApresentacaoProdutoComponent,
    NavBarComponent,
    MoedaBrlPipe,
  ]
})
export class SharedModule { }
