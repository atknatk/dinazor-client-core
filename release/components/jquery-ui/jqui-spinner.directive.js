import { Directive, ElementRef, Input } from '@angular/core';
var JquiSpinner = /** @class */ (function () {
    function JquiSpinner(el) {
        this.el = el;
    }
    JquiSpinner.prototype.ngOnInit = function () {
        $(this.el.nativeElement).spinner(this.saJquiSpinner || {});
    };
    JquiSpinner.decorators = [
        { type: Directive, args: [{
                    selector: '[saJquiSpinner]'
                },] },
    ];
    /** @nocollapse */
    JquiSpinner.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    JquiSpinner.propDecorators = {
        'saJquiSpinner': [{ type: Input },],
    };
    return JquiSpinner;
}());
export { JquiSpinner };
//# sourceMappingURL=jqui-spinner.directive.js.map