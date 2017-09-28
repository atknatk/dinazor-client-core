import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DnHttpService } from './http.service';
import { DnNotificationService } from './notification.service';
import { DnStorageService } from './storage.service';
import { InjectionService } from './injection.service';
/**
 * Exported Modules
 * @type {Array}
 */
var modules = [
    HttpModule,
];
var DnServiceModule = /** @class */ (function () {
    function DnServiceModule() {
    }
    DnServiceModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        DnHttpService,
                        DnNotificationService,
                        DnStorageService,
                        InjectionService
                    ],
                    exports: modules.slice(),
                    imports: modules.slice()
                },] },
    ];
    /** @nocollapse */
    DnServiceModule.ctorParameters = function () { return []; };
    return DnServiceModule;
}());
export { DnServiceModule };
//# sourceMappingURL=service.module.js.map