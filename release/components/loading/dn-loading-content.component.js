import { Component, Input } from '@angular/core';
/**
 * Created by Cabbar on 20.06.2017.
 */
var DnLoadingContentComponent = /** @class */ (function () {
    function DnLoadingContentComponent() {
    }
    DnLoadingContentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-loading-content',
                    template: "\n    <div id=\"content\">\n      <dn-loading [show]=\"show\"></dn-loading>\n      <ng-content></ng-content>\n    </div>"
                },] },
    ];
    /** @nocollapse */
    DnLoadingContentComponent.ctorParameters = function () { return []; };
    DnLoadingContentComponent.propDecorators = {
        'show': [{ type: Input },],
    };
    return DnLoadingContentComponent;
}());
export { DnLoadingContentComponent };
//# sourceMappingURL=dn-loading-content.component.js.map