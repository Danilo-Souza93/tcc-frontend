import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepService {   
  private url: string = 'https://viacep.com.br/ws';
  
  constructor(private http: HttpClient) { }

  buscarCEP(cep: string): Observable<any> {
    
    const url = `${this.url}/${cep}/json/`;

    return this.http.get<any>(url);
  }
}
