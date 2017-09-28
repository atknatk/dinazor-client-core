import { AfterViewInit, Component, ElementRef } from '@angular/core';

import jarvisWidgetsDefaults from '../widget.defaults';

import '@dinazor/plugins/dnwidgets/jarvis.widget.ng2.js';

declare let $: any;

@Component({

  selector: 'dn-widgets-grid',
  template: `
     <section id='widgets-grid'>
       <ng-content></ng-content>
     </section>
  `,
  styles: []
})
export class WidgetsGridComponent implements AfterViewInit {

  constructor(public el: ElementRef) {}

  ngAfterViewInit() {
      $('#widgets-grid', this.el.nativeElement).jarvisWidgets(jarvisWidgetsDefaults);
  }

}
