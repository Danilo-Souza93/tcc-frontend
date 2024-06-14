import { Router } from '@angular/router';
import { DadosPagamento } from './../shared/models/DadosPagamento';
import { Endereco } from './../shared/models/Endereco';
import { DadosPessoais } from './../shared/models/DadosPessoais';
import { Subscription } from 'rxjs';
import { ProdutosCarinho } from '../shared/models/ProdutosCarinho';
import { VendaService } from './../shared/services/venda.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CepService } from '../shared/services/cep.service';
import { ESTADOS } from '../shared/models/Estados';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cpfValidator } from '../shared/diretivas/cpf-validator.directive';

@Component({
  selector: 'compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class CompraComponent implements OnInit, OnDestroy {

  currentStep = 1;
  estadosList = ESTADOS;

  dadosForm: FormGroup;
  subscription = new Subscription();
  produtoCarrinho = new Array<ProdutosCarinho>();
  dadosPessoais = {} as DadosPessoais;
  endereco = {} as Endereco;
  dadosPagamento = {} as DadosPagamento;
  imgSelecionada: string = '';

  constructor(
    private vendaService: VendaService, 
    private cepService: CepService, 
    private fb: FormBuilder,
    private router: Router) { 

      this.dadosPessoais = {
        cpf: '',
        nome: '',
        sobrenome: '',
        email:''
      }

      this.endereco = {
        rua: '',
        numero: 0,
        bairro: '',
        cidade: '',
        estado: '',
        cep: ''
      }

      this.dadosForm = this.fb.group({
        dadosPessoais: this.fb.group({
          cpf: [this.dadosPessoais.cpf, [Validators.required, cpfValidator()]],
          nome: [this.dadosPessoais.nome, 
            [
              Validators.required, 
              Validators.minLength(2), 
              Validators.maxLength(30),
              Validators.pattern('[a-zA-Z]*')
            ]],
          sobrenome: [this.dadosPessoais.sobrenome,[
              Validators.required, 
              Validators.minLength(2), 
              Validators.maxLength(30),
              Validators.pattern('[a-zA-Z]*')
            ]],
          email: [this.dadosPessoais.email, [Validators.required, Validators.email]]
        }),
        endereco: this.fb.group({
          rua: [this.endereco.rua, [
            Validators.required, 
            Validators.minLength(2)
          ]],
          numero: [this.endereco.numero, [
            Validators.required, 
            Validators.minLength(1),
            Validators.maxLength(10),
            Validators.pattern('^[1-9]\\d*$')
          ]],
          bairro: [this.endereco.bairro, [Validators.required, Validators.minLength(1)]],
          cidade: [this.endereco.cidade, [Validators.required, Validators.minLength(1)]],
          estado: [this.endereco.estado, [Validators.required, Validators.minLength(1)]],
          cep: [this.endereco.cep, [
            Validators.required, 
            Validators.maxLength(8), 
            Validators.minLength(1),
          ]],
        })
      });
  }

  ngOnInit() {
    this.subscription.add(
      this.vendaService.pegarListaProdutoVenda().subscribe(res => {
        this.produtoCarrinho = res;
      })
    );

    this.subscription.add(
      this.vendaService.pegarDadosPessoais ().subscribe(res => {
        if(res.cpf) {        
          this.dadosPessoais = res;
          this.dadosForm.get('dadosPessoais')?.setValue(this.dadosPessoais);
        }
      })
    );

    this.subscription.add(
      this.vendaService.pegarEndereco().subscribe(res => {
        if(res.cep){
          this.endereco = res;
          this.dadosForm.get('endereco')?.setValue(this.endereco);
        }
      })
    );

    this.currentStep = this.vendaService.step;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  nextStep():void {
    if (this.currentStep <= 4) {
      switch(this.currentStep) {
        case 1: this.salvarDadosPessoais();
        break;
        case 2: this.salvarDadosEndereco();
        break;
        case 3: this.carregarPagamento();
        break;
        default: break;
      }

      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  buscarCep():void {
    this.cepService.buscarCEP(this.dadosForm.get('endereco.cep')?.value).subscribe({
      next: (res: any) => { 
        this.dadosForm.get('endereco.rua')?.setValue(res.logradouro);
        this.dadosForm.get('endereco.bairro')?.setValue(res.bairro);
        this.dadosForm.get('endereco.estado')?.setValue(res.uf);
        this.dadosForm.get('endereco.cidade')?.setValue(res.localidade);
      }
    });
  }

  carregarPagamento():void {
    this.subscription.add(
      this.vendaService.pegarDadosPagamento().subscribe(res => {
        this.dadosPagamento = res;       
      })
    );
    this.vendaService.step = 4;
  }

  salvarDadosPessoais():void {
    this.dadosPessoais = this.dadosForm.get('dadosPessoais')?.value;
    this.vendaService.gravarDadosPessoais(this.dadosPessoais);
    this.vendaService.step = 2;
  }

  salvarDadosEndereco():void {
    this.endereco = this.dadosForm.get('endereco')?.value;
    this.vendaService.gravarEndereco(this.endereco);
    this.vendaService.step = 3;
  }

  finalizarCompra():void {
    this.vendaService.criarVenda().subscribe({
      next: (res: any) => {
        console.log(res);
        alert("VENDA CRIADA, Cédigo: "+res.vendaId);
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        console.log(err);
        alert("ERRO AO CRIAR VENDA");
      }
    });
    
  }
}
