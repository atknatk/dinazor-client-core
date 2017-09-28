import { Directive, ElementRef, Input } from '@angular/core';
var JquiTabs = /** @class */ (function () {
    function JquiTabs(el) {
        this.el = el;
    }
    JquiTabs.prototype.ngOnInit = function () {
        $('ul a', this.el.nativeElement).each(function (idx, el) {
            var href = $(el).attr('href'), newHref = window.location.protocol + '//' + window.location.hostname
                + (window.location.port ? ':' + window.location.port : '') +
                window.location.pathname + href;
            if (href.indexOf('#') == 0) {
                $(el).attr('href', newHref);
            }
        });
        $(this.el.nativeElement).tabs(this.saJquiTabs || {});
    };
    JquiTabs.decorators = [
        { type: Directive, args: [{
                    selector: '[saJquiTabs]'
                },] },
    ];
    /** @nocollapse */
    JquiTabs.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    JquiTabs.propDecorators = {
        'saJquiTabs': [{ type: Input },],
    };
    return JquiTabs;
}());
export { JquiTabs };
//# sourceMappingURL=jqui-tabs.directive.js.map