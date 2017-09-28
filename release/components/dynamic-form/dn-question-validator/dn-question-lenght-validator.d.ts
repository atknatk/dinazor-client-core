import { DnQuestionValidatorBase } from './dn-question-validator-base';
/**
 * Created by cabbar on 06.04.2017.
 */
export declare class DnQuestionLengthValidator extends DnQuestionValidatorBase {
    minLength: number;
    maxLength: number;
    constructor(options?: {
        message?: string;
        isActive?: boolean;
        minLength?: number;
        maxLength?: number;
    });
}
