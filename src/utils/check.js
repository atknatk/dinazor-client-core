"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Verilen deger null ya da undefined ise true doner
 */
function isNullOrUndefined(value) {
    return value === null || value === undefined;
}
exports.isNullOrUndefined = isNullOrUndefined;
function isNullOrUndefinedOrEmpty(obj) {
    if (isNullOrUndefined(obj)) {
        return true;
    }
    if (obj === '') {
        return true;
    }
    return false;
}
exports.isNullOrUndefinedOrEmpty = isNullOrUndefinedOrEmpty;
function isString(x) {
    return (typeof x) === 'string';
}
exports.isString = isString;
