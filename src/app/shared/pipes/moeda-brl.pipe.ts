import { style } from '@angular/animations';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moedaBRL'
})
export class MoedaBrlPipe implements PipeTransform {

  transform(value: number | string, ...args: unknown[]): string {
    if(value == null) {
      return '';
    }

    let numericValue = typeof value === 'string' ? parseFloat(value) : value;

    return numericValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

}
