import { Directive, ElementRef, Input } from '@angular/core';
var JquiSlider = /** @class */ (function () {
    function JquiSlider(el) {
        this.el = el;
    }
    JquiSlider.prototype.ngOnInit = function () {
        $(this.el.nativeElement).slider(this.saJquiSlider || {});
    };
    JquiSlider.decorators = [
        { type: Directive, args: [{
                    selector: '[saJquiSlider]'
                },] },
    ];
    /** @nocollapse */
    JquiSlider.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    JquiSlider.propDecorators = {
        'saJquiSlider': [{ type: Input },],
    };
    return JquiSlider;
}());
export { JquiSlider };
//# sourceMappingURL=jqui-slider.directive.js.map