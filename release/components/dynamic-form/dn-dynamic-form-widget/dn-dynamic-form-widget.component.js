/**
 * Created by cabbar on 27.03.2017.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
var DnDynamicFormWidgetComponent = /** @class */ (function () {
    function DnDynamicFormWidgetComponent() {
        this.payLoadData = new EventEmitter();
    }
    DnDynamicFormWidgetComponent.prototype.onSubmit = function (payLoadData) {
        this.payLoadData.emit(payLoadData);
    };
    DnDynamicFormWidgetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-dynamic-form-widget',
                    templateUrl: './dn-dynamic-form-widget.component.html',
                },] },
    ];
    /** @nocollapse */
    DnDynamicFormWidgetComponent.ctorParameters = function () { return []; };
    DnDynamicFormWidgetComponent.propDecorators = {
        'dnWidget': [{ type: Input },],
        'payLoadData': [{ type: Output },],
    };
    return DnDynamicFormWidgetComponent;
}());
export { DnDynamicFormWidgetComponent };
//# sourceMappingURL=dn-dynamic-form-widget.component.js.map