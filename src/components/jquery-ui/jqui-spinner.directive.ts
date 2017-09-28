import { Directive, ElementRef, Input, OnInit } from '@angular/core';

declare let $: any;

@Directive({
  selector: '[saJquiSpinner]'
})
export class JquiSpinner implements OnInit {

  @Input() saJquiSpinner: any;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    $(this.el.nativeElement).spinner(this.saJquiSpinner || {})

  }

}
