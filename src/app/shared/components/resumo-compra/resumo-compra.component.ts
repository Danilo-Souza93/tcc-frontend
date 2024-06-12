import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { VendaService } from './../../services/venda.service';
import { Component, Input, OnInit } from '@angular/core';
import { ProdutosCarinho } from '../../models/ProdutosCarinho';
import { Produto } from '../../models/Produto';

@Component({
  selector: 'resumo-compra',
  templateUrl: './resumo-compra.component.html',
  styleUrls: ['./resumo-compra.component.scss']
})
export class ResumoCompraComponent implements OnInit {

  listaDeProdutos$: Observable<ProdutosCarinho[]>;
  @Input() produto = {} as Produto;

  constructor(private vendaService: VendaService, private router: Router) {
    this.listaDeProdutos$ = this.vendaService.pegarListaProdutoVenda();
  }

  ngOnInit() {
    
  }


  adicionarItem(): void {
    this.vendaService.gravarProdutoVenda(this.produto);
    //this.carregarCarrinho();
  }

  removerItem(item: ProdutosCarinho): void {
    this.vendaService.removerProduto(item);
    //this.carregarCarrinho();
  }

  reduzirItem(item: ProdutosCarinho): void {
    this.vendaService.removeItemCompra(item);
    //this.carregarCarrinho();
  }


  // carregarCarrinho() {
  //   this.vendaService.pegarListaProdutoVenda().subscribe(listaProduto => {
  //     if(!listaProduto){
  //       return;
  //     }
    
  //     this.listaDeProdutos = listaProduto;
  //   });
  // }

  comprar() {
    this.router.navigate(['/compra']);
  }
}
