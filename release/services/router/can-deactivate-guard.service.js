import { Injectable } from '@angular/core';
var DnCanDeactivateGuard = /** @class */ (function () {
    function DnCanDeactivateGuard() {
    }
    DnCanDeactivateGuard.prototype.canDeactivate = function (component) {
        return component.canDeactivate ? component.canDeactivate() : true;
    };
    DnCanDeactivateGuard.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DnCanDeactivateGuard.ctorParameters = function () { return []; };
    return DnCanDeactivateGuard;
}());
export { DnCanDeactivateGuard };
//# sourceMappingURL=can-deactivate-guard.service.js.map