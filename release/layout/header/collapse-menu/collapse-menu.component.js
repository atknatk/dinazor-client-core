import { Component } from '@angular/core';
import { LayoutService } from '../../layout.service';
var CollapseMenuComponent = /** @class */ (function () {
    function CollapseMenuComponent(layoutService) {
        this.layoutService = layoutService;
    }
    CollapseMenuComponent.prototype.onToggle = function () {
        this.layoutService.onCollapseMenu();
    };
    CollapseMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-collapse-menu',
                    templateUrl: './collapse-menu.component.html'
                },] },
    ];
    /** @nocollapse */
    CollapseMenuComponent.ctorParameters = function () { return [
        { type: LayoutService, },
    ]; };
    return CollapseMenuComponent;
}());
export { CollapseMenuComponent };
//# sourceMappingURL=collapse-menu.component.js.map