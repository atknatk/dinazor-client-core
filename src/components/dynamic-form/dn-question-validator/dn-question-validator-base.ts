/**
 * Created by cabbar on 05.04.2017.
 */
export class DnQuestionValidatorBase {
    message: string;
    isActive: boolean;

    constructor(options: {
        message?: string,
        isActive?: boolean
    } = {}) {
        this.message = options.message;
        this.isActive = options.isActive == null ? true : options.isActive;
    }
}
