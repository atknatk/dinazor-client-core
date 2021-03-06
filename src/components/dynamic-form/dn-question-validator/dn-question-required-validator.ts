import { DnQuestionValidatorBase } from './dn-question-validator-base';

/**
 * Created by cabbar on 05.04.2017.
 */
export class DnQuestionRequiredValidator extends DnQuestionValidatorBase {
    class?: string;

    constructor(options: {
        message?: string,
        isActive?: boolean,
        class?: string
    } = {}) {
        super(options);
        this.class = options.class;
    }
}
