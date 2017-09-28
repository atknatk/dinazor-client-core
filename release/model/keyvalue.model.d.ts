/**
 * Created by cabbar on 30.03.2017.
 */
export declare class DnKeyValueBase<T> {
    key: T;
    value: string;
    constructor(options?: {
        key?: T;
        value?: string;
    });
}
