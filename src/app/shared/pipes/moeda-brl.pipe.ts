import { style } from '@angular/animations';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moedaBRL'
})
export class MoedaBrlPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

}
