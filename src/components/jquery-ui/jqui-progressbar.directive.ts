import { Directive, ElementRef, Input, OnInit } from '@angular/core';

declare let $: any;

@Directive({
  selector: '[saJquiProgressbar]',
})
export class JquiProgressbar implements OnInit {

  @Input() saJquiProgressbar: any;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    $(this.el.nativeElement).progressbar(this.saJquiProgressbar || {})

  }

}
