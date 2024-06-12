import { DadosPagamento } from './../../models/DadosPagamento';
import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BANDEIRA } from '../../models/Bandeira';

@Component({
  selector: 'app-cartao',
  templateUrl: './cartao.component.html',
  styleUrls: ['./cartao.component.scss']
})
export class CartaoComponent implements OnInit {

  @Output() nextStep = new EventEmitter<void>();

  paymentForm: FormGroup;
  tipoCartao: Array<string>;
  listaBandeira = BANDEIRA;
  imgSelecionada: string | undefined = "";

  dadosPagamento = {} as DadosPagamento;

  constructor(private fb: FormBuilder) {
    this.tipoCartao = ["DEBITO", "CREDITO"];

    this.dadosPagamento.cartao = {
      'numeroCartao':"",
      'nomeCartao':"",
      'dtValidade':"",
      'codigoSeguranca':"",
      'bandeira': "",
      'tipo': "",
    }

    this.paymentForm = this.fb.group({
      cardNumber: [this.dadosPagamento.cartao.numeroCartao, [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardHolder: [this.dadosPagamento.cartao.nomeCartao, [Validators.required]],
      expirationDate: [this.dadosPagamento.cartao.dtValidade, [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)]],
      cvv: [this.dadosPagamento.cartao.codigoSeguranca, [Validators.required, Validators.pattern(/^\d{3}$/)]]
    });
  }

  ngOnInit() {
  }

  onSubmit(): void {
    this.dadosPagamento = this.paymentForm?.value;
    this.nextStep.emit();
  }

  selectImg(e: Event): void{
    const opcao = e.target as HTMLSelectElement;
    if(opcao){
      const selecao = opcao.value;
      this.imgSelecionada = this.listaBandeira.find(x => x.valor === selecao)?.img;
    }
  }

}
