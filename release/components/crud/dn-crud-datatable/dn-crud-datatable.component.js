/**
 * Created by cabbar on 28.03.2017.
 */
import { Component, Input } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
var DnCrudDatatableComponent = /** @class */ (function () {
    function DnCrudDatatableComponent() {
        console.log(this.columns);
    }
    DnCrudDatatableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-crud-datatable',
                    templateUrl: './dn-crud-datatable.component.html',
                    styles: []
                },] },
    ];
    /** @nocollapse */
    DnCrudDatatableComponent.ctorParameters = function () { return []; };
    DnCrudDatatableComponent.propDecorators = {
        'columns': [{ type: Input },],
    };
    return DnCrudDatatableComponent;
}());
export { DnCrudDatatableComponent };
//# sourceMappingURL=dn-crud-datatable.component.js.map