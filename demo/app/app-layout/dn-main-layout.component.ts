import { Component } from '@angular/core';
import { FadeZoomInTop } from '../../../src/animations/fade-zoom-in-top.decorator';

@FadeZoomInTop()
@Component({
  selector: 'app-main-layout',
  template: `
    <!--<ng2-slim-loading-bar></ng2-slim-loading-bar>-->

    <dn-header></dn-header>


    <dn-navigation></dn-navigation>


    <div id="main" role="main">
      <!--<sa-layout-switcher></sa-layout-switcher>-->

      <!--<sa-ribbon></sa-ribbon>-->

      <router-outlet></router-outlet>
    </div>

    <dn-footer></dn-footer>

    <!--<sa-shortcut></sa-shortcut>-->
  `
})
export class MainLayoutComponent {
}
