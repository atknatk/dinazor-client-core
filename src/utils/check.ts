/**
 * Created by cabbar on 13.05.2017.
 */
export function isNullOrUndefined(obj): boolean {
    if (obj == null) {
        return true;
    }

    if (obj === null) {
        return true;
    }

    if (typeof obj === 'undefined') {
        return true;
    }
    return false;
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

export function isNullOrUndefinedOrNaN(obj): boolean {
    if (isNullOrUndefined(obj)) {
        return true;
    }

    if (isNaN(obj)) {
        return true;
    }
    return false;
}

export function isString(x: any): boolean {
    return (typeof x) === 'string';
}
