import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Produto } from '../shared/models/Produto';
import { ProdutoService } from '../shared/services/produto.service';

@Component({
  selector: 'app-add-produto',
  templateUrl: './add-produto.component.html',
  styleUrls: ['./add-produto.component.scss']
})
export class AddProdutoComponent implements OnInit {

  produtoList = new Array<Produto>();
  produtoListform: FormGroup;

  constructor(private fb: FormBuilder, private produtoService: ProdutoService) {
    this.produtoListform = this.fb.group({
      produtoArrayForm: this.fb.array([this.createNewForm()])
    });
  }

  ngOnInit() {}

  get produtoArrayForm(): FormArray {
    return this.produtoListform.get('produtoArrayForm') as FormArray;
  }

  produtoIsExpanded(i: number): boolean {
    return this.produtoArrayForm.at(i).get('isExpandedForm')?.value;
  }

  createNewForm(): FormGroup {
    return this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
      detalhe: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(2)]],
      quantidadeEstoque: [0, [Validators.required, Validators.pattern('^[1-9]\\d*$')]],
      valor: [0 , [Validators.required]],
      dt_lote: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      isExpandedForm: [false]
    });
  }

  addProtudoForm(): void {
    this.produtoArrayForm.push(this.createNewForm());
  }

  removeProduto(i: number) {
    this.produtoArrayForm.removeAt(i);
  }

  toogleExpand(i: number):void {
    this.produtoArrayForm.at(i).get('isExpandedForm')?.setValue(!this.produtoIsExpanded(i));
  }

  criarProdutos() {


    this.produtoList = this.produtoArrayForm.value.map((formValue: any) => {
      return {
        nome: formValue.nome,
        detalhe: formValue.detalhe,
        quantidadeEstoque: formValue.quantidadeEstoque,
        valor: parseFloat(formValue.valor.replace(/[^\d,.-]/g, '').replace(',', '.')),
        dt_lote: formValue.dt_lote,
      }
    });

    this.produtoService.criarProduto(this.produtoList).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.produtoArrayForm.clear();
        this.addProtudoForm();
        
      },
      error: (err: any) => {
        alert(err.message);
      }
    });
    
  }

  formatCurrency(event: any, i: number): void {
    let value = event.target.value;
    value = value.replace(/[^0-9.]/g, '');
    const formattedValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(value));
    this.produtoArrayForm.at(i).get('valor')?.setValue(formattedValue);
  }
}