import { Directive, ElementRef, Input } from '@angular/core';
/*$.widget('ui.dialog', $.extend({}, $.ui.dialog.prototype, {
    _title: function (title) {
        if (!this.options.title) {
            title.html('&#160;');
        } else {
            title.html(this.options.title);
        }
    }
}));*/
var JquiDialog = /** @class */ (function () {
    function JquiDialog(el) {
        this.el = el;
    }
    JquiDialog.prototype.ngOnInit = function () {
        $(this.el.nativeElement).dialog(this.dnJquiDialog);
    };
    JquiDialog.decorators = [
        { type: Directive, args: [{
                    selector: '[dnJquiDialog]'
                },] },
    ];
    /** @nocollapse */
    JquiDialog.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    JquiDialog.propDecorators = {
        'dnJquiDialog': [{ type: Input },],
    };
    return JquiDialog;
}());
export { JquiDialog };
//# sourceMappingURL=jqui-dialog.directive.js.map