import { Directive, ElementRef, HostListener, Input } from '@angular/core';

declare let $: any;

@Directive({
  selector: '[dnJquiDialogLauncher]'
})
export class JquiDialogLauncher {
  @Input() dnJquiDialogLauncher: any;

  @HostListener('click', ['$event']) onClick(e) {
    $(this.dnJquiDialogLauncher).dialog('open');
  }

}
