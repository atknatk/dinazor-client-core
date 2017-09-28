import { DnQuestionValidatorBase } from './dn-question-validator-base';
/**
 * Created by cabbar on 06.04.2017.
 */
export declare class DnQuestionRegexValidator extends DnQuestionValidatorBase {
    isActive: boolean;
    regex: string;
    constructor(options?: {
        message?: string;
        isActive?: boolean;
        regex?: string;
    });
}
