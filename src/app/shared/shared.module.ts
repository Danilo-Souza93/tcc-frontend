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
import { RouterModule } from '@angular/router';
import { DtValidatorDirective } from './diretivas/dtValidator.directive';

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
    ResumoCompraComponent,
    DtValidatorDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
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
    ResumoCompraComponent,
    DtValidatorDirective
  ]
})
export class SharedModule { }
