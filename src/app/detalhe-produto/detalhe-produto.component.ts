import { Router } from '@angular/router';
import { Produto } from './../shared/models/Produto';
import { ProdutoService } from './../shared/services/produto.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'detalhe-produto',
  templateUrl: './detalhe-produto.component.html',
  styleUrls: ['./detalhe-produto.component.scss']
})
export class DetalheProdutoComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  listaDeProdutos = new Array<Produto>();
  produto!: Produto;

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.carregarProduto();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  carregarProduto(){
    this.subscription.add(
      this.produtoService.pegarProdutoSubject().subscribe(res => {
        if(!res.id) {
          this.router.navigate(["/home"]);
          return;
        }
        this.produto = res;
    }));
  }

  adicionarItem() {
    
  }
}
