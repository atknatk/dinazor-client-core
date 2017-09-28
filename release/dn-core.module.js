import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DinazorLayoutModule } from './layout/layout.module';
import { LayoutService } from './layout/layout.service';
import { DnHttpService } from './services/http.service';
import { ViewsModule } from './views/views.module';
import { ComponentsModule } from './components/components.module';
import { DnNotificationService } from './services/notification.service';
import { DirectivesModule } from './directive/directives.module';
import { DnServiceModule } from './services/service.module';
/**
 * Exported Modules
 * @type {Array}
 */
var modules = [
    CommonModule,
    FormsModule,
    HttpModule,
    DinazorLayoutModule,
    ViewsModule,
    ComponentsModule,
    DirectivesModule,
    DnServiceModule
];
var DnCoreModule = /** @class */ (function () {
    function DnCoreModule() {
    }
    DnCoreModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        LayoutService,
                        DnHttpService,
                        DnNotificationService
                    ],
                    exports: modules.slice(),
                    imports: modules.slice()
                },] },
    ];
    /** @nocollapse */
    DnCoreModule.ctorParameters = function () { return []; };
    return DnCoreModule;
}());
export { DnCoreModule };
//# sourceMappingURL=dn-core.module.js.map