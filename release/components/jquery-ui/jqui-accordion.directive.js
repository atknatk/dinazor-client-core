import { Directive, ElementRef, Input } from '@angular/core';
var JquiAccordion = /** @class */ (function () {
    function JquiAccordion(el) {
        this.el = el;
    }
    JquiAccordion.prototype.ngOnInit = function () {
        var options = Object.assign({
            autoHeight: false,
            heightStyle: 'content',
            collapsible: true,
            animate: 300,
            icons: {
                header: 'fa fa-plus',
                activeHeader: 'fa fa-minus' // custom icon class
            },
            header: 'h4'
        }, (this.saJquiAccordion || {}));
        $(this.el.nativeElement).accordion(options);
    };
    JquiAccordion.decorators = [
        { type: Directive, args: [{
                    selector: '[saJquiAccordion]'
                },] },
    ];
    /** @nocollapse */
    JquiAccordion.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    JquiAccordion.propDecorators = {
        'saJquiAccordion': [{ type: Input },],
    };
    return JquiAccordion;
}());
export { JquiAccordion };
//# sourceMappingURL=jqui-accordion.directive.js.map