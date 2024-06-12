import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApresentacaoProdutoComponent } from './components/apresentacao-produto/apresentacao-produto.component';
import { MoedaBrlPipe } from './pipes/moeda-brl.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CartaoComponent } from './components/cartao/cartao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CpfValidatorDirective } from './diretivas/cpf-validator.directive';
import { MascaraCpfDirective } from './diretivas/mascara-cpf.directive';
import { EspecialCharPreventDirective } from './diretivas/especial-char-prevent.directive';
import { MaskDateDirective } from './diretivas/mask-date.directive';
import { ResumoCompraComponent } from './components/resumo-compra/resumo-compra.component';

@NgModule({
  declarations: [
    ApresentacaoProdutoComponent,
    MoedaBrlPipe,
    NavBarComponent,
    CartaoComponent,
    CpfValidatorDirective,
    MascaraCpfDirective,
    EspecialCharPreventDirective,
    MaskDateDirective,
    ResumoCompraComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    ApresentacaoProdutoComponent,
    NavBarComponent,
    MoedaBrlPipe,
    CartaoComponent,
    CpfValidatorDirective,
    MascaraCpfDirective,
    EspecialCharPreventDirective,
    MaskDateDirective,
    ResumoCompraComponent
  ]
})
export class SharedModule { }
