import { Component, Input } from '@angular/core';

/**
 * Created by Cabbar on 20.06.2017.
 */

@Component({
    selector: 'dn-loading-content',
    template: `
    <div id="content">
      <dn-loading [show]="show"></dn-loading>
      <ng-content></ng-content>
    </div>`
})
export class DnLoadingContentComponent {

    @Input() public show: boolean;
}
