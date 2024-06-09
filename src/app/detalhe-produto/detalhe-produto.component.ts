import { ProdutosVendios } from './../shared/models/ProdutosVendios';
import { VendaService } from './../shared/services/venda.service';
import { Router } from '@angular/router';
import { Produto } from './../shared/models/Produto';
import { ProdutoService } from './../shared/services/produto.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProdutosCarinho } from '../shared/models/ProdutosCarinho';

@Component({
  selector: 'detalhe-produto',
  templateUrl: './detalhe-produto.component.html',
  styleUrls: ['./detalhe-produto.component.scss']
})
export class DetalheProdutoComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  listaDeProdutos = new Array<ProdutosCarinho>();
  produto = {} as Produto;

  constructor(
    private produtoService: ProdutoService,
    private vendaService: VendaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.carregarProduto();
    this.carregarCarrinho();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  carregarProduto(): void{
    this.subscription.add(
      this.produtoService.pegarProdutoSubject().subscribe(res => {
        if(!res.id) {
          this.router.navigate(["/home"]);
          return;
        }
        this.produto = res;
    }));
  }

  carregarCarrinho() {
    this.vendaService.pegarListaProdutoVenda().subscribe(listaProduto => {
      if(!listaProduto){
        return;
      }
    
      this.listaDeProdutos = listaProduto;
    });
  }

  adicionarItem(): void {
    this.vendaService.gravarProdutoVenda(this.produto);
    this.carregarCarrinho();
  }

  removerItem(item: ProdutosCarinho): void {
    this.vendaService.removerProduto(item);
    this.carregarCarrinho();
  }

  reduzirItem(item: ProdutosCarinho): void {
    this.vendaService.removeItemCompra(item);
    this.carregarCarrinho();
  }

  comprar() {
    this.router.navigate(['/compra']);
  }
}
