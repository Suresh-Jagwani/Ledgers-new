import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumCommaSeparate]',
  standalone: true
})
export class NumCommaSeparateDirective {

  constructor(private element: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this.element.nativeElement.value;
    this.element.nativeElement.value = initalValue.replace(/[^0-9]*/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if ( initalValue !== this.element.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
