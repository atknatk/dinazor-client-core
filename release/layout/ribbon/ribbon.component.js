import { Component } from '@angular/core';
import { LayoutService } from '../layout.service';
var RibbonComponent = /** @class */ (function () {
    function RibbonComponent(layoutService) {
        this.layoutService = layoutService;
    }
    RibbonComponent.prototype.ngOnInit = function () {
    };
    RibbonComponent.prototype.resetWidgets = function () {
        this.layoutService.factoryReset();
    };
    RibbonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-ribbon',
                    templateUrl: './ribbon.component.html'
                },] },
    ];
    /** @nocollapse */
    RibbonComponent.ctorParameters = function () { return [
        { type: LayoutService, },
    ]; };
    return RibbonComponent;
}());
export { RibbonComponent };
//# sourceMappingURL=ribbon.component.js.map