/**
 * Verilen deger null ya da undefined ise true doner
 */
export function isNullOrUndefined(value) {
    return value === null || value === undefined;
}
export function isNullOrUndefinedOrEmpty(obj) {
    if (isNullOrUndefined(obj)) {
        return true;
    }
    if (obj === '') {
        return true;
    }
    return false;
}
export function isString(x) {
    return (typeof x) === 'string';
}
//# sourceMappingURL=check.js.map