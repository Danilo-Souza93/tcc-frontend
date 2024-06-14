import { DetalheVenda } from '../shared/models/DetalheVenda';
import { VendaService } from './../shared/services/venda.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'buscar-venda',
  templateUrl: './buscar-venda.component.html',
  styleUrls: ['./buscar-venda.component.scss']
})
export class BuscarVendaComponent implements OnInit {

  vendaId: string = "";
  detalheVenda = {} as DetalheVenda;

  constructor(private vendaService: VendaService) { }

  ngOnInit() {
  }

  buscarVenda() {
    this.vendaService.buscarVenda(this.vendaId).subscribe({
      next: (res: DetalheVenda ) => {
        this.detalheVenda = res;
        console.log(this.detalheVenda);
        
      }
    })
  }
}
