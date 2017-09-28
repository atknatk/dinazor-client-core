import { DnQuestionValidatorBase } from './dn-question-validator-base';
/**
 * Created by cabbar on 06.04.2017.
 */
export declare class DnQuestionIdenticalValidator extends DnQuestionValidatorBase {
    isActive: boolean;
    field: string;
    constructor(options?: {
        message?: string;
        isActive?: boolean;
        field?: string;
    });
}
