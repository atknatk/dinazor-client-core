/**
 * Verilen deger null ya da undefined ise true doner
 */
export function isNullOrUndefined<T>(value: T | null | undefined): value is null | undefined {
    return value === null || value === undefined;
}

export function isNullOrUndefinedOrEmpty(obj): boolean {
    if (isNullOrUndefined(obj)) {
        return true;
    }

    if (obj === '') {
        return true;
    }
    return false;
}

export function isString(x: any): boolean {
    return (typeof x) === 'string';
}
