import { Injectable } from '@angular/core';
import { environment } from '../../../environmennts/env-local';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Produto } from '../models/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API = environment.api+'/Produto'

  private produtoSubject = new BehaviorSubject<Produto>({} as Produto);
  
  constructor(private http: HttpClient) {  }

  //Metodos http
  getProductList(): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${this.API}`);
  }

  criarProduto(produtoList: Array<Produto>): Observable<any> {
    return this.http.post<any>(`${this.API}`, produtoList);
  }

  putProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.API}`, produto);
  }
  
  deleteProduto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API}/${id}`);
  }
  //Gestão de Dados produto
  gravarProdutoSubject(produtos: Produto){
    this.produtoSubject.next(produtos);
  }

  pegarProdutoSubject(): Observable<Produto>{
    return this.produtoSubject.asObservable();
  }
}
