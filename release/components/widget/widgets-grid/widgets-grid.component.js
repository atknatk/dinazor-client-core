import { Component, ElementRef } from '@angular/core';
import jarvisWidgetsDefaults from '../widget.defaults';
import '@dinazor/plugins/dnwidgets/jarvis.widget.ng2.js';
var WidgetsGridComponent = /** @class */ (function () {
    function WidgetsGridComponent(el) {
        this.el = el;
    }
    WidgetsGridComponent.prototype.ngAfterViewInit = function () {
        $('#widgets-grid', this.el.nativeElement).jarvisWidgets(jarvisWidgetsDefaults);
    };
    WidgetsGridComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-widgets-grid',
                    template: "\n     <section id='widgets-grid'>\n       <ng-content></ng-content>\n     </section>\n  ",
                    styles: []
                },] },
    ];
    /** @nocollapse */
    WidgetsGridComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    return WidgetsGridComponent;
}());
export { WidgetsGridComponent };
//# sourceMappingURL=widgets-grid.component.js.map