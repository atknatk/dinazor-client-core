"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by cabbar on 19.04.2017.
 */
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var check_1 = require("../../utils/check");
var dinazor_config_1 = require("../../dinazor.config");
var DnAuthService = /** @class */ (function () {
    function DnAuthService(dnService, dnStorageService) {
        this.dnService = dnService;
        this.dnStorageService = dnStorageService;
        this.user = this.dnStorageService.getItem(dinazor_config_1.config.DINAZOR_USER_KEY);
    }
    DnAuthService.prototype.login = function (username, password) {
        var data = {
            username: username,
            password: password,
            client: {
                hddSerialNo: 'hdd',
                biosVersion: '1.1.1',
                username: username,
                password: password,
                clientIdentifier: '1.1.1hddaatika123'
            }
        };
        this.dnService.setUrl('Authorization');
        return this.dnService.post(data);
    };
    DnAuthService.prototype.logout = function () {
        var token;
        var user = this.dnStorageService.getItem(dinazor_config_1.config.DINAZOR_USER_KEY);
        token = user.token;
        this.dnService.setUrl('Authorization');
        this.dnService.delete(token).subscribe();
        this.dnStorageService.removeItem(dinazor_config_1.config.DINAZOR_USER_KEY);
    };
    DnAuthService.prototype.isAuthorized = function (roles) {
        if (check_1.isNullOrUndefined(roles))
            return false;
        if (roles.length === 1 && roles[0] === -1)
            return true;
        return this.user.roleList.filter(function (elem) {
            return roles.indexOf(elem) > -1;
        }).length > 0;
    };
    DnAuthService = __decorate([
        core_1.Injectable()
    ], DnAuthService);
    return DnAuthService;
}());
exports.DnAuthService = DnAuthService;
