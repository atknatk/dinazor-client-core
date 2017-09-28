/**
 * Created by cabbar on 18.04.2017.
 */
export class DnResultBase {
    status: number;
    label: string;
    message: string;
    objectId: number;
    isSuccess: boolean;

    constructor(options: {
        status?: number,
        label?: string,
        message?: string,
        objectId?: number,
        isSuccess?: boolean,
    } = {}) {
        this.status = options.status;
        this.label = options.label;
        this.message = options.message;
        this.objectId = options.objectId;
        this.isSuccess = options.isSuccess;
    }
}
