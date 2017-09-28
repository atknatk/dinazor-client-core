/**
 * Created by cabbar on 28.03.2017.
 */
import { NgModule } from '@angular/core';
import { DnCrudComponent } from './dn-crud.component';
import { DnCrudDatatableComponent } from './dn-crud-datatable/dn-crud-datatable.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DnDatatableModule } from '../datatable/dn-datatable.module';
import { DnDynamicFormModule } from '../dynamic-form/dn-dynamic-form.module';
import { DnHttpService } from '../../services/http.service';
import { DnWidgetsModule } from '../widget/dn-widgets.module';
var DnCrudModule = /** @class */ (function () {
    function DnCrudModule() {
    }
    DnCrudModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        DnDatatableModule,
                        DnDynamicFormModule,
                        CommonModule,
                        ReactiveFormsModule,
                        DnWidgetsModule
                    ],
                    declarations: [
                        DnCrudComponent,
                        DnCrudDatatableComponent
                    ],
                    exports: [
                        DnCrudComponent,
                        DnCrudDatatableComponent
                    ],
                    providers: [
                        DnHttpService
                    ]
                },] },
    ];
    /** @nocollapse */
    DnCrudModule.ctorParameters = function () { return []; };
    return DnCrudModule;
}());
export { DnCrudModule };
//# sourceMappingURL=dn-crud.module.js.map