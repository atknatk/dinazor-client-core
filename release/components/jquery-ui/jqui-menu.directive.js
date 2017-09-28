import { Directive, ElementRef, Input } from '@angular/core';
var JquiMenu = /** @class */ (function () {
    function JquiMenu(el) {
        this.el = el;
    }
    JquiMenu.prototype.ngOnInit = function () {
        $(this.el.nativeElement).menu(this.saJquiMenu || {});
    };
    JquiMenu.decorators = [
        { type: Directive, args: [{
                    selector: '[saJquiMenu]'
                },] },
    ];
    /** @nocollapse */
    JquiMenu.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    JquiMenu.propDecorators = {
        'saJquiMenu': [{ type: Input },],
    };
    return JquiMenu;
}());
export { JquiMenu };
//# sourceMappingURL=jqui-menu.directive.js.map