import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApresentacaoProdutoComponent } from './components/apresentacao-produto/apresentacao-produto.component';
import { MoedaBrlPipe } from './pipes/moeda-brl.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CartaoComponent } from './components/cartao/cartao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaymentCardModule } from 'ngx-payment-card';
import { CpfValidatorDirective } from './diretivas/cpf-validator.directive';

@NgModule({
  declarations: [
    ApresentacaoProdutoComponent,
    MoedaBrlPipe,
    NavBarComponent,
    CartaoComponent,
    CpfValidatorDirective
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
    CpfValidatorDirective
  ]
})
export class SharedModule { }
