import { Component } from '@angular/core';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
        this.searchMobileActive = false;
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent.prototype.onSubmit = function () {
        // this.router.navigate(['/miscellaneous/search']);
    };
    HeaderComponent.prototype.toggleSearchMobile = function () {
        this.searchMobileActive = !this.searchMobileActive;
        $('body').toggleClass('search-mobile', this.searchMobileActive);
    };
    HeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-header',
                    templateUrl: './header.component.html',
                },] },
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return []; };
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map