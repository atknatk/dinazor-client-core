/**
 * Created by cabbar on 19.04.2017.
 */
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { config } from '../../dinazor.config';
import { DnHttpService } from '../../services/http.service';
import { DnStorageService } from '../../services/storage.service';
import { isNullOrUndefined } from '../../utils/check';
var DnAuthService = /** @class */ (function () {
    function DnAuthService(dnService, dnStorageService) {
        this.dnService = dnService;
        this.dnStorageService = dnStorageService;
        this.user = this.dnStorageService.getItem(config.DINAZOR_USER_KEY);
    }
    DnAuthService.prototype.isAuthorized = function (roles) {
        if (isNullOrUndefined(roles))
            return false;
        if (roles.length === 1 && roles[0] === -1)
            return true;
        return this.user.roleList.filter(function (elem) {
            return roles.indexOf(elem) > -1;
        }).length > 0;
    };
    DnAuthService.prototype.login = function (mail, password) {
        var data = {
            mail: mail,
            password: password,
            client: {
                hddSerialNo: 'hdd',
                biosVersion: '1.1.1',
                mail: mail,
                password: password,
                clientIdentifier: '1.1.1hddaatika123'
            }
        };
        return this.dnService.postWithoutToken(data, 'api/Authorization');
    };
    DnAuthService.prototype.logout = function () {
        var user = this.dnStorageService.getItem(config.DINAZOR_USER_KEY);
        var token = user.token;
        this.dnService.deleteWithUrl('api/Authorization?token=' + token).subscribe();
        this.dnStorageService.removeItem(config.DINAZOR_USER_KEY);
    };
    DnAuthService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DnAuthService.ctorParameters = function () { return [
        { type: DnHttpService, },
        { type: DnStorageService, },
    ]; };
    return DnAuthService;
}());
export { DnAuthService };
//# sourceMappingURL=auth.service.js.map