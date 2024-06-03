import { Injectable } from '@angular/core';
import { environment } from '../../../environmennts/env-local';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Produto } from '../models/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API = environment.api

  private produtoSubject = new BehaviorSubject<Produto>({} as Produto);
  
  constructor(private http: HttpClient) {  }

  //Metodos http
  getProductList(): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${this.API}/Produto`);
  }

  //Gestão de Dados produto
  gravarProdutoSubject(produtos: Produto){
    this.produtoSubject.next(produtos);
  }

  pegarProdutoSubject(): Observable<Produto>{
    return this.produtoSubject.asObservable();
  }
}
