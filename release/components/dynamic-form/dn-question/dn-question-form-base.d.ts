import { DnQuestionRowList } from './dn-question-row-list';
import { DnQuestionFormButton } from './dn-question-form-button';
import { FormGroup } from '@angular/forms';
import { DnKeyValueBase } from '../../../model/keyvalue.model';
/**
 * Created by cabbar on 27.03.2017.
 */
export declare class DnQuestionFormBase<T> {
    id: string;
    questionRows: DnQuestionRowList[];
    submitButtonLabel: string;
    submitButtonEvent: string;
    submitButtonClass: string;
    submitContainerClass: string;
    submitContainerStyle: Array<DnKeyValueBase<string>>;
    isSetupValidate: boolean;
    formButtonList: DnQuestionFormButton[];
    formGroup: FormGroup;
    formGroupName: string;
    getForm: () => any;
    constructor(options?: {
        id?: string;
        questionRows?: DnQuestionRowList[];
        submitButtonLabel?: string;
        submitButtonEvent?: string;
        submitButtonClass?: string;
        submitContainerClass?: string;
        submitContainerStyle?: Array<DnKeyValueBase<string>>;
        isSetupValidate?: boolean;
        formButtonList?: DnQuestionFormButton[];
        formGroup?: FormGroup;
        formGroupName?: string;
    });
}
