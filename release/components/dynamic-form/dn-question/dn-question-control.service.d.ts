import { FormGroup } from '@angular/forms';
import { DnQuestionBase } from './dn-question-base';
import { DnQuestionFormBase } from './dn-question-form-base';
export declare class DnQuestionControlService {
    getFormGroup(formBase: DnQuestionFormBase<DnQuestionBase<any>>, form: FormGroup): FormGroup;
    private toFormGroup(formBase);
    private addFormGroup(group, q, service);
    private toFormGroupWithForm(formBase, form);
    private getFormControl(q);
}
