import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from './../shared/models/Produto';
import { ProdutoService } from './../shared/services/produto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'apresentacao',
  templateUrl: './apresentacao.component.html',
  styleUrls: ['./apresentacao.component.scss'],
})
export class ApresentacaoComponent implements OnInit {
  listaProdutos = new Array<Produto>();
  temErro: boolean = false;

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ){}

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
    this.router.navigate(['/detalhe-produto']);
  }

}
