import { Venda } from './../models/Venda';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Produto } from '../models/Produto';
import { ProdutosVendios } from '../models/ProdutosVendios';
import { Endereco } from '../models/Endereco';
import { DadosPessoais } from '../models/DadosPessoais';
import { DadosPagamento } from '../models/DadosPagamento';
import { ProdutosCarinho } from '../models/ProdutosCarinho';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  produtoList = new Array<ProdutosCarinho>();
  endereco = {} as Endereco;
  dadosPessoais = {} as DadosPessoais;
  dadosPagamento = {} as DadosPagamento;
  listaProdutosVendidos = new Array<ProdutosVendios>();

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
  private vendaSubject = new BehaviorSubject<Venda>(this.venda);

  constructor(private http: HttpClient) { }

  gravarProdutoVenda(produto: Produto) {
    // adicionando produtos na venda
    let produtoListado = this.produtoList.find(x => x.id == produto.id);
    
    if(produtoListado){
      produtoListado.quantidade += 1;
      produtoListado.valor = produtoListado.quantidade*produto.valor;
    }else {
      let produtoVendido = {} as ProdutosVendios;  
      let produtoCarrinho = {} as ProdutosCarinho;

      //Controle carrinho
      produtoCarrinho.id = produto.id;
      produtoCarrinho.nome = produto.nome;
      produtoCarrinho.quantidade = 1;
      produtoCarrinho.valor = produto.valor
      this.produtoList.push(produtoCarrinho);
      
      //Montagem Venda
      produtoVendido.produtoId = produto.id;
      produtoVendido.quantidade = produtoCarrinho.quantidade
    }

    this.vendaProdutoSubject.next(this.produtoList);
  }

  removerProduto(produto: ProdutosCarinho){
    this.produtoList = this.produtoList.filter(x => x.id !== produto.id);
    this.vendaProdutoSubject.next(this.produtoList);
  }

  removeItemCompra(produto: ProdutosCarinho){
    let produtoCarrinho = this.produtoList.find(x => x.id == produto.id);
    
    if(produtoCarrinho){
      produtoCarrinho.quantidade -= 1;

      if(produtoCarrinho.quantidade == 0) this.removerProduto(produto);
    }

    this.vendaProdutoSubject.next(this.produtoList);
  }

  pegarListaProdutoVenda(): Observable<Array<ProdutosCarinho>> {
    return this.vendaProdutoSubject.asObservable();
  }

}
