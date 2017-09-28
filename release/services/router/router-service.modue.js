/**
 * Exported Modules
 * @type {Array}
 */
import { DnAuthGuard } from './auth-guard.service';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DnCanDeactivateGuard } from './can-deactivate-guard.service';
import { DnSelectivePreloadingStrategy } from './selective-preloading-strategy';
var modules = [
    HttpModule,
];
var DnRouterServiceModue = /** @class */ (function () {
    function DnRouterServiceModue() {
    }
    DnRouterServiceModue.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        DnAuthGuard,
                        DnCanDeactivateGuard,
                        DnSelectivePreloadingStrategy
                    ],
                    exports: modules.slice(),
                    imports: modules.slice()
                },] },
    ];
    /** @nocollapse */
    DnRouterServiceModue.ctorParameters = function () { return []; };
    return DnRouterServiceModue;
}());
export { DnRouterServiceModue };
//# sourceMappingURL=router-service.modue.js.map