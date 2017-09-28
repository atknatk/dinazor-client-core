import { DnQuestionValidatorBase } from './dn-question-validator-base';

/**
 * Created by cabbar on 06.04.2017.
 */
export class DnQuestionDifferentValidator extends DnQuestionValidatorBase {
    isActive: boolean;
    field: string;

    constructor(options: {
        message?: string,
        isActive?: boolean,
        field?: string
    } = {}) {
        super(options);
        this.isActive = options.isActive == null ? true : options.isActive;
        this.field = options.field || '';
    }
}
