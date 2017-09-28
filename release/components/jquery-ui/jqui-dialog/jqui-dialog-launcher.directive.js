import { Directive, HostListener, Input } from '@angular/core';
var JquiDialogLauncher = /** @class */ (function () {
    function JquiDialogLauncher() {
    }
    JquiDialogLauncher.prototype.onClick = function (e) {
        $(this.dnJquiDialogLauncher).dialog('open');
    };
    JquiDialogLauncher.decorators = [
        { type: Directive, args: [{
                    selector: '[dnJquiDialogLauncher]'
                },] },
    ];
    /** @nocollapse */
    JquiDialogLauncher.ctorParameters = function () { return []; };
    JquiDialogLauncher.propDecorators = {
        'dnJquiDialogLauncher': [{ type: Input },],
        'onClick': [{ type: HostListener, args: ['click', ['$event'],] },],
    };
    return JquiDialogLauncher;
}());
export { JquiDialogLauncher };
//# sourceMappingURL=jqui-dialog-launcher.directive.js.map