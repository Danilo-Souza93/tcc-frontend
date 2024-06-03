import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Produto } from '../models/Produto';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  private vendaSubject = new BehaviorSubject<Array<Produto>>(new Array<Produto>());

  constructor(private http: HttpClient) { }

  gravarProdutoVenda(produto: Produto) {
    let produtoList = new Array<Produto>();
    produtoList.push(produto);
    this.vendaSubject.next(produtoList);
  }

  pegarListaProdutoVenda(): Observable<Array<Produto>> {
    return this.vendaSubject.asObservable();
  }

}
