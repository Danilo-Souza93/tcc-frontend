import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[EspecialCharPrevent]'
})
export class EspecialCharPreventDirective {

  constructor() { }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (event.key && !/[0-9BackspaceTab]/.test(event.key)) {
      event.preventDefault();
    }
  }
}
