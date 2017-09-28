import { Directive, ElementRef, Input } from '@angular/core';
var JquiAutocomplete = /** @class */ (function () {
    function JquiAutocomplete(el) {
        this.el = el;
    }
    JquiAutocomplete.prototype.ngOnInit = function () {
        $(this.el.nativeElement).autocomplete(this.saJquiAutocomplete || {});
    };
    JquiAutocomplete.decorators = [
        { type: Directive, args: [{
                    selector: '[saJquiAutocomplete]'
                },] },
    ];
    /** @nocollapse */
    JquiAutocomplete.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    JquiAutocomplete.propDecorators = {
        'saJquiAutocomplete': [{ type: Input },],
    };
    return JquiAutocomplete;
}());
export { JquiAutocomplete };
//# sourceMappingURL=jqui-autocomplete.directive.js.map