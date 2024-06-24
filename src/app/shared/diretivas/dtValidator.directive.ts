import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[DtValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: DtValidatorDirective, multi: true }]
})
export class DtValidatorDirective {

  validate(control: AbstractControl): ValidationErrors | null {
    const dateValue = control.value;
    if (!dateValue) {
      return null; // early return if value is empty
    }

    const parts = dateValue.split('/');
    const currentYear = new Date().getFullYear();

    if(parts.length === 2 && parts[1].length === 2){
      // MM/YY
      const currentYear2 = new Date().getFullYear() % 100;
      const [month, year] = parts.map((part: any) => parseInt(part, 10));
      const isValidMonth = month >= 1 && month <= 12;
      const isValidYear = year >= currentYear2;

      if (!isValidMonth) {
        return { invalidMonth: true };
      }

      if (!isValidYear) {
        return { invalidYear: true };
      }

      return null;
    }

    if (parts.length === 2) {
      // MM/YYYY format
      const [month, year] = parts.map((part: any) => parseInt(part, 10));
      const isValidMonth = month >= 1 && month <= 12;
      const isValidYear = year >= currentYear;

      if (!isValidMonth) {
        return { invalidMonth: true };
      }

      if (!isValidYear) {
        return { invalidYear: true };
      }

    } else if (parts.length === 3) {
      // DD/MM/YYYY format
      const [day, month, year] = parts.map((part: any) => parseInt(part, 10));
      const isValidDay = day >= 1 && day <= 31;
      const isValidMonth = month >= 1 && month <= 12;
      const isValidYear = year >= currentYear;

      if (!isValidDay) {
        return { invalidDay: true };
      }

      if (!isValidMonth) {
        return { invalidMonth: true };
      }

      if (!isValidYear) {
        return { invalidYear: true };
      }
      
    } else {
      return { invalidFormat: true };
    }

    return null;
  }

}
