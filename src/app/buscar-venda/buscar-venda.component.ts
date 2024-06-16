import { Venda } from './../shared/models/Venda';
import { DetalheVenda } from '../shared/models/DetalheVenda';
import { Produto } from '../shared/models/Produto';
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
  isEdit = false;
  isDelete = false;

  statusList = [
    "Aberta",  
    "Em trânsito",
    "Entregue"
  ]

  constructor(private vendaService: VendaService) { }

  ngOnInit() {
  }

  buscarVenda() {
    this.vendaService.buscarVenda(this.vendaId).subscribe({
      next: (res: DetalheVenda ) => {
        this.detalheVenda = res;
        
        if(this.detalheVenda.venda.status === "Entregue") this.isDelete = true;
        
      }
    })
  }

  quantProd(item: Produto): string {
    if(this.detalheVenda?.venda?.produtosVendidos.length > 0) {
      
      const qnt = this.detalheVenda.venda.produtosVendidos.find(x => x.produtoId == item.id)?.quantidade;
      if(qnt) return qnt.toString();
    }

    return "";
  }

  toogleEdit() {
    this.isEdit = !this.isEdit;
  }

  atualizarVenda() {
    
    this.vendaService.updateStatusVenda(this.detalheVenda.venda).subscribe({
      next: (res: string) => {
        alert(res);
        this.detalheVenda = {} as DetalheVenda;
      },
      error: (err: any) => {
        alert(err.message)
      }
    })
  }

  deleteVenda() {
    if(this.detalheVenda.venda.id) 
      this.vendaService.deleteVenda(this.detalheVenda.venda.id).subscribe({
        next: (res: any) => {
          alert(res.mensagem);
          this.detalheVenda = {} as DetalheVenda;
        },
        error: (err: any) => {
          alert(err.mensagem)
        }
      });
  }
}
