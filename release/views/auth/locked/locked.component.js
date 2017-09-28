import { Component } from '@angular/core';
import { Router } from '@angular/router';
var DnLockedComponent = /** @class */ (function () {
    function DnLockedComponent(router) {
        this.router = router;
    }
    DnLockedComponent.prototype.unlock = function (event) {
        event.preventDefault();
        this.router.navigate(['/home']);
    };
    DnLockedComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-locked',
                    templateUrl: './locked.component.html',
                    styleUrls: [
                        './locked.component.css'
                    ]
                },] },
    ];
    /** @nocollapse */
    DnLockedComponent.ctorParameters = function () { return [
        { type: Router, },
    ]; };
    return DnLockedComponent;
}());
export { DnLockedComponent };
//# sourceMappingURL=locked.component.js.map