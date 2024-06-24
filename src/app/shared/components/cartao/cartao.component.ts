import { Subscription } from 'rxjs';
import { VendaService } from './../../services/venda.service';
import { DadosPagamento } from './../../models/DadosPagamento';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BANDEIRA } from '../../models/Bandeira';

@Component({
  selector: 'app-cartao',
  templateUrl: './cartao.component.html',
  styleUrls: ['./cartao.component.scss']
})
export class CartaoComponent implements OnInit, OnChanges, OnDestroy {

  @Output() nextStep = new EventEmitter<void>();
  @Input() dadosPagamento = {} as DadosPagamento;
  @Input() showForm: boolean = true;

  subscription = new Subscription();

  paymentForm: FormGroup;
  tipoCartao: Array<string>;
  listaBandeira = BANDEIRA;
  imgSelecionada: string = "";
  
  constructor(private fb: FormBuilder, private vendaService: VendaService) {
    this.tipoCartao = ["DEBITO", "CREDITO"];

    if(!this.dadosPagamento || !this.dadosPagamento.cartao) {
      this.dadosPagamento.cartao = {
        'numeroCartao':"",
        'nomeCartao':"",
        'dtValidade':"",
        'codigoSeguranca':"",
        'bandeira': "",
        'tipo': "",
      }
    }

    this.paymentForm = this.fb.group({
      cartao: this.fb.group({
        numeroCartao: [this.dadosPagamento.cartao.numeroCartao, [Validators.required, Validators.pattern(/^\d{16}$/)]],
        nomeCartao: [this.dadosPagamento.cartao.nomeCartao, [Validators.required, Validators.minLength(2), Validators.pattern(/([a-zA-Z])/)]],
        dtValidade: [this.dadosPagamento.cartao.dtValidade, [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)]],
        codigoSeguranca: [this.dadosPagamento.cartao.codigoSeguranca, [Validators.required, Validators.pattern(/^\d{3}$/)]],
        bandeira:[this.dadosPagamento.cartao.bandeira, Validators.required],
        tipo:[this.dadosPagamento.cartao.tipo, Validators.required],
      })
    });
  }

  ngOnInit(): void {
    this.subscription.add( 
      this.vendaService.pegarDadosPagamento().subscribe(res => {
        if(res.cartao) {
          this.dadosPagamento = res;
          this.createForm();
        }
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dadosPagamento'] && changes['dadosPagamento'].currentValue) {
      this.createForm();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.paymentForm.setValue(this.dadosPagamento);
    this.imgSelecionada = this.vendaService.imgSelecionada;
  }

  onSubmit(): void {
    this.dadosPagamento = this.paymentForm?.value;
    if(this.dadosPagamento) this.vendaService.gravarDadosPagamentos(this.dadosPagamento);
    this.nextStep.emit();
  }

  selectImg(e: Event): void{
    const opcao = e.target as HTMLSelectElement;
    if(opcao){
      const selecao = opcao.value;
      this.imgSelecionada = this.listaBandeira.find(x => x.valor === selecao)?.img || '';
      this.vendaService.imgSelecionada = this.imgSelecionada || '';
    }
  }
}
