/**
 * Created by cabbar on 19.04.2017.
 */
import { Injectable } from '@angular/core';
import { DnStorageService } from '../storage.service';
import { config } from '../../dinazor.config';
var DnAuthGuard = /** @class */ (function () {
    function DnAuthGuard(dnStorageService) {
        this.dnStorageService = dnStorageService;
    }
    DnAuthGuard.prototype.canActivate = function (route, state) {
        if (this.dnStorageService.getItem(config.DINAZOR_USER_KEY)) {
            return true;
        }
        console.log('Yetkisiz işlem callback çağır');
        // this.router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}});
        return false;
    };
    DnAuthGuard.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DnAuthGuard.ctorParameters = function () { return [
        { type: DnStorageService, },
    ]; };
    return DnAuthGuard;
}());
export { DnAuthGuard };
//# sourceMappingURL=auth-guard.service.js.map