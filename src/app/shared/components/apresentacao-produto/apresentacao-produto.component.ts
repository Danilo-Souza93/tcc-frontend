import { Component, Input, OnInit } from '@angular/core';
import { Produto } from '../../models/Produto';


@Component({
  selector: 'apresentacao-produto',
  templateUrl: './apresentacao-produto.component.html',
  styleUrls: ['./apresentacao-produto.component.scss']
})
export class ApresentacaoProdutoComponent implements OnInit {

  @Input() produto!: Produto;

  constructor() { }

  ngOnInit() {
  }

}
