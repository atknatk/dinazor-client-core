import { DnQuestionValidatorBase } from './dn-question-validator-base';

/**
 * Created by cabbar on 06.04.2017.
 */
export class DnQuestionRegexValidator extends DnQuestionValidatorBase {
    isActive: boolean;
    regex: string;

    constructor(options: {
        message?: string,
        isActive?: boolean,
        regex?: string
    } = {}) {
        super(options);
        this.isActive = options.isActive == null ? true : options.isActive;
        this.regex = options.regex;
    }
}
