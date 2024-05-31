import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApresentacaoProdutoComponent } from './components/apresentacao-produto/apresentacao-produto.component';
import { MoedaBrlPipe } from './pipes/moeda-brl.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ApresentacaoProdutoComponent,
    MoedaBrlPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports:[
    ApresentacaoProdutoComponent,
    MoedaBrlPipe
  ]
})
export class SharedModule { }
