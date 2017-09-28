import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { isNullOrUndefined } from '../utils/check';
var DnStorageService = /** @class */ (function () {
    function DnStorageService() {
        this.key = CryptoJS.enc.Utf8.parse('7061737323313233');
        this.iv = CryptoJS.enc.Utf8.parse('7061737323313233');
    }
    DnStorageService.prototype.getItem = function (key) {
        var encrypted = localStorage.getItem(key);
        return this.decrypt(encrypted);
    };
    DnStorageService.prototype.removeItem = function (key) {
        localStorage.removeItem(key);
    };
    DnStorageService.prototype.setItem = function (key, value) {
        var encrypted = this.encrypt(JSON.stringify(value));
        localStorage.setItem(key, encrypted);
    };
    DnStorageService.prototype.decrypt = function (encrypted) {
        if (isNullOrUndefined(encrypted))
            return;
        var bytes = CryptoJS.AES.decrypt(encrypted, this.key, {
            keySize: 128 / 8,
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    };
    DnStorageService.prototype.encrypt = function (decrypted) {
        if (isNullOrUndefined(decrypted))
            return;
        return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(decrypted), this.key, {
            keySize: 128 / 8,
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
    };
    DnStorageService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DnStorageService.ctorParameters = function () { return []; };
    return DnStorageService;
}());
export { DnStorageService };
//# sourceMappingURL=storage.service.js.map