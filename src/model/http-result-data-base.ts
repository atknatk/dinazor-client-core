import { DnResultBase } from './http-result-base';

export class DnResultDataBase<T> extends DnResultBase {
    data: T;

    constructor(options: {
        data?: T,
        status?: number,
        label?: string,
        message?: string,
        objectId?: number,
        isSuccess?: boolean,
    } = {}) {
        super(options);
        this.data = options.data;
    }
}
