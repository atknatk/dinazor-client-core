import { DnResultBase } from './http-result-base';
export declare class DnResultDataBase<T> extends DnResultBase {
    data: T;
    constructor(options?: {
        data?: T;
        status?: number;
        label?: string;
        message?: string;
        objectId?: number;
        isSuccess?: boolean;
    });
}
