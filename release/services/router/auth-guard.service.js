/**
 * Created by cabbar on 19.04.2017.
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DnStorageService } from '../storage.service';
import { config } from '../../dinazor.config';
var DnAuthGuard = /** @class */ (function () {
    function DnAuthGuard(router, dnStorageService) {
        this.router = router;
        this.dnStorageService = dnStorageService;
    }
    DnAuthGuard.prototype.canActivate = function (route, state) {
        if (this.dnStorageService.getItem(config.DINAZOR_USER_KEY)) {
            return true;
        }
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    DnAuthGuard.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DnAuthGuard.ctorParameters = function () { return [
        { type: Router, },
        { type: DnStorageService, },
    ]; };
    return DnAuthGuard;
}());
export { DnAuthGuard };
//# sourceMappingURL=auth-guard.service.js.map