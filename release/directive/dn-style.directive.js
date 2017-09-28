/**
 * Created by cabbar on 30.03.2017.
 */
import { Directive, ElementRef, Input, Renderer } from '@angular/core';
var DnStyleDirective = /** @class */ (function () {
    function DnStyleDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    DnStyleDirective.prototype.ngOnInit = function () {
        if (this.styles) {
            for (var _i = 0, _a = this.styles; _i < _a.length; _i++) {
                var style = _a[_i];
                this.renderer.setElementStyle(this.el.nativeElement, style.key, style.value);
            }
        }
    };
    DnStyleDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[dnStyle]'
                },] },
    ];
    /** @nocollapse */
    DnStyleDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer, },
    ]; };
    DnStyleDirective.propDecorators = {
        'styles': [{ type: Input, args: ['dnStyle',] },],
    };
    return DnStyleDirective;
}());
export { DnStyleDirective };
//# sourceMappingURL=dn-style.directive.js.map