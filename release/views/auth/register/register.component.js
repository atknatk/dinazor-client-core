import { Component } from '@angular/core';
import { Router } from '@angular/router';
var DnRegisterComponent = /** @class */ (function () {
    function DnRegisterComponent(router) {
        this.router = router;
    }
    DnRegisterComponent.prototype.ngOnInit = function () {
    };
    DnRegisterComponent.prototype.register = function (event) {
        event.preventDefault();
        this.router.navigate(['/home']);
    };
    DnRegisterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-register',
                    templateUrl: './register.component.html',
                    styles: []
                },] },
    ];
    /** @nocollapse */
    DnRegisterComponent.ctorParameters = function () { return [
        { type: Router, },
    ]; };
    return DnRegisterComponent;
}());
export { DnRegisterComponent };
//# sourceMappingURL=register.component.js.map