import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DnLoadingComponent } from './dn-loading.component';
import { DnLoadingConfigService } from './dn-loading.service';
import { DnLoadingContentComponent } from './dn-loading-content.component';
var DnLoadingModule = /** @class */ (function () {
    function DnLoadingModule() {
    }
    DnLoadingModule.forRoot = function (loadingConfig) {
        return {
            ngModule: DnLoadingModule,
            providers: [{ provide: 'loadingConfig', useValue: loadingConfig }]
        };
    };
    DnLoadingModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [DnLoadingComponent, DnLoadingContentComponent],
                    declarations: [DnLoadingComponent, DnLoadingContentComponent],
                    providers: [DnLoadingConfigService],
                },] },
    ];
    /** @nocollapse */
    DnLoadingModule.ctorParameters = function () { return []; };
    return DnLoadingModule;
}());
export { DnLoadingModule };
//# sourceMappingURL=dn-loading.module.js.map