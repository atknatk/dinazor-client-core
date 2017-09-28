import {  NgModule } from '@angular/core';
import { WidgetsGridComponent } from './widgets-grid/widgets-grid.component';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget.component';

@NgModule({
    imports: [CommonModule],
    declarations: [WidgetComponent, WidgetsGridComponent],
    exports: [WidgetComponent, WidgetsGridComponent],
    providers: []
})
export class DnWidgetsModule {
    /*  static forRoot(router: Router): ModuleWithProviders {
          return {
              ngModule: DnWidgetsModule,
              providers: [{provide: Router, useValue: router}]
          };
      }*/
}
