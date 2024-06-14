import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[MaskDate]'
})
export class MaskDateDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent) {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length <= 4) { // Format as mm/yyyy
      if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
    } else if (value.length <= 8) { // Format as dd/mm/yyyy
      if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
      if (value.length > 4) {
        value = value.substring(0, 5) + '/' + value.substring(4, 8);
      }
    }

    input.value = value;
  }

}
