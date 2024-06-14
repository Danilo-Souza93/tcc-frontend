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
  @Input() showBtn: boolean = true;
  valorTotal: number = 0;

  constructor(private vendaService: VendaService, private router: Router) {
    this.listaDeProdutos$ = this.vendaService.pegarListaProdutoVenda();
  }

  ngOnInit() {
    this.valorTotal = this.vendaService.venda.valorTotal;
  }

  adicionarItem(): void {
    this.vendaService.gravarProdutoVenda(this.produto);
    this.valorTotal = this.vendaService.venda.valorTotal;
  }

  removerItem(item: ProdutosCarinho): void {
    this.vendaService.removerProduto(item);
    this.valorTotal = this.vendaService.venda.valorTotal;
  }

  reduzirItem(item: ProdutosCarinho): void {
    this.vendaService.removeItemCompra(item);
    this.valorTotal = this.vendaService.venda.valorTotal;
  }

  comprar() {
    this.router.navigate(['/compra']);
  }
}
