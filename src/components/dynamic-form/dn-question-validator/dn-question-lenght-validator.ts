import { DnQuestionValidatorBase } from './dn-question-validator-base';

/**
 * Created by cabbar on 06.04.2017.
 */
export class DnQuestionLengthValidator extends DnQuestionValidatorBase {
    minLength: number;
    maxLength: number;

    constructor(options: {
        message?: string,
        isActive?: boolean,
        minLength?: number,
        maxLength?: number
    } = {}) {
        super(options);
        this.minLength = options.minLength || 0;
        this.maxLength = options.maxLength || Number.MAX_VALUE;
    }
}
