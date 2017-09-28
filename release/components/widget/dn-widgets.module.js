import { NgModule } from '@angular/core';
import { WidgetsGridComponent } from './widgets-grid/widgets-grid.component';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget.component';
var DnWidgetsModule = /** @class */ (function () {
    function DnWidgetsModule() {
    }
    /*  static forRoot(router: Router): ModuleWithProviders {
          return {
              ngModule: DnWidgetsModule,
              providers: [{provide: Router, useValue: router}]
          };
      }*/
    DnWidgetsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [WidgetComponent, WidgetsGridComponent],
                    exports: [WidgetComponent, WidgetsGridComponent],
                    providers: []
                },] },
    ];
    /** @nocollapse */
    DnWidgetsModule.ctorParameters = function () { return []; };
    return DnWidgetsModule;
}());
export { DnWidgetsModule };
//# sourceMappingURL=dn-widgets.module.js.map