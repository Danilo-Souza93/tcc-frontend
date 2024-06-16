import { ProdutosVendios } from './../models/ProdutosVendios';
import { Endereco } from './../models/Endereco';
import { DadosPagamento } from './../models/DadosPagamento';
import { Venda } from './../models/Venda';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Produto } from '../models/Produto';
import { DadosPessoais } from '../models/DadosPessoais';
import { ProdutosCarinho } from '../models/ProdutosCarinho';
import { environment } from '../../../environmennts/env-local';
import { DetalheVenda } from '../models/DetalheVenda';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  private readonly API = environment.api+'/Vendas'

  produtoList = new Array<ProdutosCarinho>();
  endereco = {} as Endereco;
  dadosPessoais = {} as DadosPessoais;
  dadosPagamento = {} as DadosPagamento;
  listaProdutosVendidos = new Array<ProdutosVendios>();
  imgSelecionada: string = '';
  step: number = 1;

  venda: Venda = {
    vendaId: undefined, // tipo Guid/Uuid;
    status: "",
    valorTotal: 0,
    endereco: this.endereco,
    produtosVendidos: this.listaProdutosVendidos,
    dadosPessoais: this.dadosPessoais,
    dadosPagamento: this.dadosPagamento,
  };

  private vendaProdutoSubject = new BehaviorSubject<Array<ProdutosCarinho>>(new Array<ProdutosCarinho>());
  private vendaPagamentoSubject = new BehaviorSubject<DadosPagamento>({} as DadosPagamento);
  private vendaDadosPessoaisSubject = new BehaviorSubject<DadosPessoais>({} as DadosPessoais);
  private vendaEnderecoSubject = new BehaviorSubject<Endereco>({} as Endereco);
  private vendaSubject = new BehaviorSubject<Venda>(this.venda);

  constructor(private http: HttpClient) { }

  gravarProdutoVenda(produto: Produto): void {
    console.log(produto);
    
    // adicionando produtos na venda
    let produtoListado = this.produtoList.find(x => x.id == produto.id);
    let produtoVendido = this.listaProdutosVendidos.find(x => x.produtoId == produto.id);
    if(produtoListado && produtoVendido){
      //Controle carrinho
      produtoListado.quantidade += 1;
      //Controle Venda
      produtoVendido.quantidade += 1;
    }else {
      let produtoVendido = {} as ProdutosVendios;  
      let produtoCarrinho = {} as ProdutosCarinho;

      //Controle carrinho
      produtoCarrinho.id = produto.id;
      produtoCarrinho.nome = produto.nome;
      produtoCarrinho.valor = produto.valor;
      produtoCarrinho.quantidade = 1;

      this.produtoList.push(produtoCarrinho);
      
      //Controle Venda
      produtoVendido.produtoId = produto.id;
      produtoVendido.quantidade = produtoCarrinho.quantidade
      this.listaProdutosVendidos.push(produtoVendido);
    }

    this.calcularValor();
    this.vendaProdutoSubject.next(this.produtoList);
  }

  removerProduto(produto: ProdutosCarinho): void {
    this.produtoList = this.produtoList.filter(x => x.id !== produto.id);
    this.listaProdutosVendidos = this.listaProdutosVendidos.filter(x => x.produtoId !== produto.id);

    console.log("produtoList", this.produtoList);
    console.log("listaProdutosVendidos", this.listaProdutosVendidos);
    
    this.calcularValor();
    this.vendaProdutoSubject.next(this.produtoList);
  }

  removeItemCompra(produto: ProdutosCarinho): void {
    let produtoCarrinho = this.produtoList.find(x => x.id == produto.id);
    let produtoVendido = this.listaProdutosVendidos.find(x => x.produtoId == produto.id);

    if(produtoCarrinho && produtoVendido){
      produtoCarrinho.quantidade -= 1;    
      produtoVendido.quantidade -=1;

      if(produtoCarrinho.quantidade == 0) this.removerProduto(produto);
    }

    console.log("produtoList", this.produtoList);
    console.log("listaProdutosVendidos", this.listaProdutosVendidos);

    this.calcularValor();
    this.vendaProdutoSubject.next(this.produtoList);
  }

  calcularValor(): void {
    let valor = 0;
    this.produtoList.forEach(produto => {
      valor += produto.valor * produto.quantidade;
    });

    this.venda.valorTotal = valor;
  }

  pegarListaProdutoVenda(): Observable<Array<ProdutosCarinho>> {
    return this.vendaProdutoSubject.asObservable();
  }

  gravarDadosPagamentos(dadosPagamento: DadosPagamento): void {
    this.vendaPagamentoSubject.next(dadosPagamento);
  }

  pegarDadosPagamento(): Observable<DadosPagamento> {
    return this.vendaPagamentoSubject.asObservable();
  }

  gravarDadosPessoais(dadosPessoais: DadosPessoais): void {
    this.vendaDadosPessoaisSubject.next(dadosPessoais);
  }

  pegarDadosPessoais(): Observable<DadosPessoais> {
    return this.vendaDadosPessoaisSubject.asObservable();
  }

  gravarEndereco(endereco: Endereco):void {
    this.vendaEnderecoSubject.next(endereco);
  }

  pegarEndereco(): Observable<Endereco> {
    return this.vendaEnderecoSubject.asObservable();
  }

  removeItemOnEdit(produto: Produto) {
    let produtoCarrinho = this.produtoList.find(x => x.id == produto.id);
    
    if(produtoCarrinho?.valor != produto.valor) {
      this.produtoList = this.produtoList.filter(x => x.id !== produto.id);
      this.listaProdutosVendidos = this.listaProdutosVendidos.filter(x => x.produtoId !== produto.id);

      this.vendaProdutoSubject.next(this.produtoList);
      this.calcularValor();
    }
  }

  //Metodos Http
  public criarVenda(): Observable<any> {
    this.venda.dadosPagamento = this.vendaPagamentoSubject.value;
    this.venda.dadosPessoais = this.vendaDadosPessoaisSubject.value;
    this.venda.endereco = this.vendaEnderecoSubject.value;
    this.venda.status = "Aberta";

    return this.http.post<string>(`${this.API}`, this.venda);
  }

  public buscarVenda(vendaId: string): Observable<DetalheVenda> {
    return this.http.get<DetalheVenda>(`${this.API}/${vendaId}`);
  }

  public updateStatusVenda(venda: Venda): Observable<string> {
    return this.http.put<string>(`${this.API}`, venda);
  }

  public deleteVenda(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API}/${id}`);
  }
}
