import { NgPaymentCardModule } from 'ng-payment-card';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompraComponent } from './compra.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MascaraCpfDirective } from '../shared/diretivas/mascara-cpf.directive';

const routes: Routes = [
  {
    path:'',
    component: CompraComponent,
  }
];

@NgModule({
  declarations: [CompraComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class CompraModule { }
