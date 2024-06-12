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

    if(value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 6);
    }

    if (value.length > 7) {
      value = value.substring(0, 7);
    }

    input.value = value;
  }

}
