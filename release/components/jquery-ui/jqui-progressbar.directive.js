import { Directive, ElementRef, Input } from '@angular/core';
var JquiProgressbar = /** @class */ (function () {
    function JquiProgressbar(el) {
        this.el = el;
    }
    JquiProgressbar.prototype.ngOnInit = function () {
        $(this.el.nativeElement).progressbar(this.saJquiProgressbar || {});
    };
    JquiProgressbar.decorators = [
        { type: Directive, args: [{
                    selector: '[saJquiProgressbar]',
                },] },
    ];
    /** @nocollapse */
    JquiProgressbar.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    JquiProgressbar.propDecorators = {
        'saJquiProgressbar': [{ type: Input },],
    };
    return JquiProgressbar;
}());
export { JquiProgressbar };
//# sourceMappingURL=jqui-progressbar.directive.js.map