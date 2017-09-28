import { Component } from '@angular/core';
import { Router } from '@angular/router';
var DnForgotComponent = /** @class */ (function () {
    function DnForgotComponent(router) {
        this.router = router;
        this.loginInfo = {};
    }
    DnForgotComponent.prototype.submit = function (event) {
        event.preventDefault();
        this.router.navigate(['/auth/login']);
    };
    DnForgotComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-forgot',
                    templateUrl: './forgot.component.html',
                    styles: []
                },] },
    ];
    /** @nocollapse */
    DnForgotComponent.ctorParameters = function () { return [
        { type: Router, },
    ]; };
    return DnForgotComponent;
}());
export { DnForgotComponent };
//# sourceMappingURL=forgot.component.js.map