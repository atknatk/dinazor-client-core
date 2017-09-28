/**
 * Created by cabbar on 27.03.2017.
 */
import { DnQuestionValidatorBase } from '../dn-question-validator/dn-question-validator-base';
export declare class DnQuestionBase<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    validator: DnQuestionValidatorBase[];
    id: string;
    disabled: boolean;
    columnLabelSize: number;
    columnQuestionSize: number;
    constructor(options?: {
        value?: T;
        key?: string;
        label?: string;
        required?: boolean;
        order?: number;
        controlType?: string;
        validator?: DnQuestionValidatorBase[];
        id?: string;
        disabled?: boolean;
        columnLabelSize?: number;
        columnQuestionSize?: number;
    });
}
