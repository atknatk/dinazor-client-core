import { Component } from '@angular/core';
import { LayoutService } from '../../../../src/layout/layout.service';

declare let $: any;

@Component({
  selector: 'dn-minify-menu',
  template: `<span class='minifyme' (click)='toggle()'>
    <i class='fa fa-arrow-circle-left hit'></i>
</span>`,
})
export class MinifyMenuComponent {

  constructor(private layoutService: LayoutService) {
  }

  toggle() {
    this.layoutService.onMinifyMenu();
  }
}
