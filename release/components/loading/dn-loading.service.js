import { Injectable, Inject, Optional } from '@angular/core';
import { DnLoadingConfig } from './dn-loading.config';
var DnLoadingConfigService = /** @class */ (function () {
    function DnLoadingConfigService(config) {
        this.config = config;
        this.loadingConfig = config || new DnLoadingConfig();
    }
    DnLoadingConfigService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DnLoadingConfigService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: ['loadingConfig',] },] },
    ]; };
    return DnLoadingConfigService;
}());
export { DnLoadingConfigService };
//# sourceMappingURL=dn-loading.service.js.map