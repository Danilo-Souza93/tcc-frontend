import { ProdutoService } from './../shared/services/produto.service';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../shared/models/Produto';

@Component({
  selector: 'apresentacao',
  templateUrl: './apresentacao.component.html',
  styleUrls: ['./apresentacao.component.scss'],
})
export class ApresentacaoComponent implements OnInit {
  listaProdutos: Produto[] = [];
  temErro: boolean = false;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    this.produtoService.getProductList().subscribe({
      next: (res: Produto[]) => {
        this.listaProdutos = res;
      },
      error: (err) => {
        this.temErro = true;
      },
    });
  }

  selecionarProduto(produtoSelecionado: Produto) {
    this.produtoService.gravarProdutoSubject(produtoSelecionado);
    //add a rota pra detalhes do produto
  }
}
