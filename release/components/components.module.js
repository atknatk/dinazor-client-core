import { NgModule } from '@angular/core';
import { DnHttpService } from '../services/http.service';
import { DnNotificationService } from '../services/notification.service';
import { DnStorageService } from '../services/storage.service';
import { DnAuthService } from '../views/auth/auth.service';
import { DnCrudModule } from './crud/dn-crud.module';
import { DnDatatableModule } from './datatable/dn-datatable.module';
import { DnInputModule } from './input/dn-input.module';
import { JqueryUiModule } from './jquery-ui/jquery-ui.module';
import { DnLoadingModule } from './loading/dn-loading.module';
import { DnSelect2Module } from './select/select2/dn-select2.module';
import { DnWidgetsModule } from './widget/dn-widgets.module';
var modules = [
    DnDatatableModule,
    DnInputModule,
    DnLoadingModule,
    DnSelect2Module,
    DnCrudModule,
    DnWidgetsModule,
    JqueryUiModule
];
var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule.decorators = [
        { type: NgModule, args: [{
                    imports: modules.slice(),
                    exports: modules.slice(),
                    providers: [
                        DnAuthService,
                        DnNotificationService,
                        DnHttpService,
                        DnStorageService
                    ]
                },] },
    ];
    /** @nocollapse */
    ComponentsModule.ctorParameters = function () { return []; };
    return ComponentsModule;
}());
export { ComponentsModule };
//# sourceMappingURL=components.module.js.map