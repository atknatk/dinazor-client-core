import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DnDatatableComponent } from './dn-datatable.component';
// require('smartadmin-plugins/bower_components/datatables.net-colreorder-bs/css/colReorder.bootstrap.min.css');
var DnDatatableModule = /** @class */ (function () {
    function DnDatatableModule() {
    }
    DnDatatableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [DnDatatableComponent],
                    exports: [DnDatatableComponent],
                },] },
    ];
    /** @nocollapse */
    DnDatatableModule.ctorParameters = function () { return []; };
    return DnDatatableModule;
}());
export { DnDatatableModule };
//# sourceMappingURL=dn-datatable.module.js.map