/**
 * Created by cabbar on 18.04.2017.
 */
export declare class DnResultBase {
    status: number;
    label: string;
    message: string;
    objectId: number;
    isSuccess: boolean;
    constructor(options?: {
        status?: number;
        label?: string;
        message?: string;
        objectId?: number;
        isSuccess?: boolean;
    });
}
