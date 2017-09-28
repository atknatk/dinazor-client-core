import { Inject, Injectable, Optional } from '@angular/core';
import { DnLoginConfig } from './login.config';
var DnLoginConfigService = /** @class */ (function () {
    function DnLoginConfigService(config) {
        this.config = config;
        this.loginConfig = config || new DnLoginConfig();
    }
    DnLoginConfigService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DnLoginConfigService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: ['loginConfig',] },] },
    ]; };
    return DnLoginConfigService;
}());
export { DnLoginConfigService };
//# sourceMappingURL=login-config.service.js.map