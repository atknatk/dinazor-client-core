import { Directive, ElementRef, Input, OnInit } from '@angular/core';

declare let $: any;

@Directive({
  selector: '[saJquiAutocomplete]'
})
export class JquiAutocomplete implements OnInit {

  @Input() saJquiAutocomplete: any;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    $(this.el.nativeElement).autocomplete(this.saJquiAutocomplete || {})

  }

}
