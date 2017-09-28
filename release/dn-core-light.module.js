import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LayoutService } from './layout/layout.service';
import { DnHttpService } from './services/http.service';
import { DnNotificationService } from './services/notification.service';
import { DnAuthService } from './views/auth/auth.service';
import { DnServiceModule } from './services/service.module';
/**
 * Exported Modules
 * @type {Array}
 */
var modules = [
    CommonModule,
    FormsModule,
    HttpModule,
    DnServiceModule
];
var DnCoreLightModule = /** @class */ (function () {
    function DnCoreLightModule() {
    }
    DnCoreLightModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        LayoutService,
                        DnHttpService,
                        DnNotificationService,
                        DnAuthService
                    ],
                    exports: modules.slice(),
                    imports: modules.slice()
                },] },
    ];
    /** @nocollapse */
    DnCoreLightModule.ctorParameters = function () { return []; };
    return DnCoreLightModule;
}());
export { DnCoreLightModule };
//# sourceMappingURL=dn-core-light.module.js.map