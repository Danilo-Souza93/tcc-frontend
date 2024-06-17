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
  produtoEdit = {} as Produto;
  isEdit = false;

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private vendaService: VendaService
  ) { }

  ngOnInit() {
    this.carregarProduto();
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
        this.produtoEdit = {...res};
    }));
  }

  toogleEdit() {
    this.isEdit = !this.isEdit;
  }

  cancelarProduto() {
    this.produto = this.produtoEdit;
    this.isEdit = false;
  }

  editarProduto() {
    this.produtoService.putProduto(this.produto).subscribe({
      next: (res: Produto) => {
        this.produto = res;
        this.produtoEdit = {...res};
        this.isEdit = false;
        this.produtoService.gravarProdutoSubject(res);
        this.vendaService.removeItemOnEdit(res);
        alert("Item Editado, e lista de compra atualizada")
      },
      error: (err: any) => {
        alert(err.message);
      }
    })
  }

  deleteProduto() {
    this.produtoService.deleteProduto(this.produto.id).subscribe({
      next: (res: any) =>{
        alert(res.message);
        this.router.navigate(["/home"]);
      },
      error: (err: any) => {
        alert(err.message);
      }
    })
  }
}
