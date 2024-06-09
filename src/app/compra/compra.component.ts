import { Endereco } from './../shared/models/Endereco';
import { DadosPessoais } from './../shared/models/DadosPessoais';
import { Subscription } from 'rxjs';
import { ProdutosCarinho } from '../shared/models/ProdutosCarinho';
import { VendaService } from './../shared/services/venda.service';
import { Component, OnInit } from '@angular/core';
import { CpfVlidator } from '../shared/utils/cpfValidator';
import { CepService } from '../shared/services/cep.service';
import { ESTADOS } from '../shared/models/Estados';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cpfValidator } from '../shared/diretivas/cpf-validator.directive';

@Component({
  selector: 'compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class CompraComponent implements OnInit {

  currentStep = 1;
  noNumber = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
  onlyNumber = /^\d+$/;
  estadosList = ESTADOS;

  dadosForm: FormGroup;
  subscription = new Subscription();
  cpfValidator = new CpfVlidator(); 
  produtoCarrinho = new Array<ProdutosCarinho>();
  dadosPessoais = {} as DadosPessoais;
  endereco = {} as Endereco;

  isNomeValido = true;
  isSobrenomeValido = true;
  isCpfValidator = true;
  isCepValido = true;
  isRuaValido = true;
  isNumeroValidator = true;

  constructor(
    private vendaService: VendaService, 
    private cepService: CepService, 
    private fb: FormBuilder) { 

      this.dadosPessoais = {
        cpf: '',
        nome: '',
        sobrenome: '',
      }

      this.endereco = {
        rua: '',
        numero: 0,
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
      }

      this.dadosForm = this.fb.group({
        dadosPessoais: this.fb.group({
          cpf: [this.dadosPessoais.cpf, [Validators.required, cpfValidator()]],
          nome: [this.dadosPessoais.nome, Validators.required],
          sobrenome: [this.dadosPessoais.sobrenome, Validators.required],
        }),
        endereco: this.fb.group({
          rua: [this.endereco.rua, Validators.required],
          numero: [this.endereco.numero, Validators.required],
          bairro: [this.endereco.bairro, Validators.required],
          cidade: [this.endereco.cidade, Validators.required],
          estado: [this.endereco.estado, Validators.required],
          cep: [this.endereco.cep, Validators.required],
        })
      });
  }

  ngOnInit() {
    this.subscription.add(
      this.vendaService.pegarListaProdutoVenda().subscribe(res => {
        this.produtoCarrinho = res;
      })
    );
  }

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  nomeValidation(): void {
    console.log(this.dadosForm);

    console.log("OBJ = ", this.dadosPessoais)
    
    if(
      (this.dadosPessoais.nome.length > 2 && this.dadosPessoais.nome.length < 30) &&
      this.noNumber.test(this.dadosPessoais.nome)
    ) {
      this.isNomeValido = true;
    }
    else{  
      this.isNomeValido = false;
    }
  }

  sobrenomeValidation(): void {
    if(
      (this.dadosPessoais.sobrenome.length > 2 && this.dadosPessoais.sobrenome.length < 30) &&
      this.noNumber.test(this.dadosPessoais.sobrenome)
    ) {
      this.isSobrenomeValido = true;
    }
    else{
      this.isSobrenomeValido = false;
    }
  }

  isCpfValido(): void {
    this.isCpfValidator = this.cpfValidator.isValidCPF(this.dadosPessoais.cpf);
  }

  cepValidator(): void {
    if(
      this.endereco.cep.length !== 8 || 
      !this.onlyNumber.test(this.endereco.cep)
    ){
      this.isCepValido = false;
    }
    else {
      this.isCepValido = true;
    }
  }

  ruaValidator(): void {
    if(this.endereco.rua) {
      this.isRuaValido = false;
    }else{
      this.isRuaValido = true;
    }
  }

  numeroValidator() {
    if(this.endereco.numero < 1){
      this.isNumeroValidator = false;
    }
    else{
      this.isNumeroValidator = true;
    }

  }

  buscarCep(): void {
    this.cepService.buscarCEP(this.endereco.cep).subscribe({
      next: (res: any) => { 
        this.endereco.rua = res.logradouro;
        this.endereco.bairro = res.bairro;
        this.endereco.estado = res.uf;
        this.endereco.cidade = res.localidade;
      }
    });

    this.ruaValidator();
    this.numeroValidator();
  }


  salvarDadosPessoais() {

  }
}
