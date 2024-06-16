import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[EspecialCharPrevent]'
})
export class EspecialCharPreventDirective {

  constructor() { }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Tab'];
    const isLetter = /^[a-zA-Z]$/;
    const isNumber = /^[0-9]$/;
    
    if (!isNumber.test(event.key) && !isLetter.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
}
