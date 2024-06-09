import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[CpfValidator]',
  providers: [
    { 
      provide: NG_VALIDATORS, 
      useExisting: CpfValidatorDirective, 
      multi: true 
    }
  ]
})

export class CpfValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return cpfValidator()(control);
  }
}

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const valid = validateCPF(value);
    return valid ? null : { invalidCPF: true };
  };
}

function validateCPF(cpf: string): boolean {
  //valida existencia
  if (!cpf) return false;
  
  //valida tamanho
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11) return false;

  // Elimina CPFs inválidos conhecidos
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  // Valida 1º dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;

  // Valida 2º dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(10))) return false;

  return true;
}
