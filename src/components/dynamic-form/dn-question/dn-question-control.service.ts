/**
 * Created by cabbar on 27.03.2017.
 */
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DnQuestionBase } from './dn-question-base';
import { DnQuestionFormBase } from './dn-question-form-base';
import { DnQuestionRowBase } from './dn-question-row-base';
import { isNullOrUndefined } from '../../../utils/check';

@Injectable()
export class DnQuestionControlService {

    getFormGroup(formBase: DnQuestionFormBase<DnQuestionBase<any>>, form: FormGroup) {
        if (form && form != null) {
            if (formBase.formGroupName) {
                const fg: FormGroup = this.toFormGroup(formBase);
                form.addControl(formBase.formGroupName, fg);
                return form;
            }
            return this.toFormGroupWithForm(formBase, form);
        }
        return this.toFormGroup(formBase);
    }

    private toFormGroup(formBase: DnQuestionFormBase<DnQuestionBase<any>>) {
        const group: any = {};
        const ths = this;

        formBase.questionRows.forEach(questionRow => {
            if (questionRow.row) {
                questionRow.row.forEach(q => {
                    // if (q.question.key.indexOf('.') > -1) {
                    //   group = this.addFormGroup(group, q, ths);
                    // } else {
                    group[q.question.key] = ths.getFormControl(q);
                    // }

                });
            }
        });

        // questions.forEach(question => {
        //   group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
        //     : new FormControl(question.value || '');
        // });
        // this.dbform.addControl('sinirdakiTasimaSekli', new FormControl('', [Validators.required]));
        return new FormGroup(group);
    }

    private addFormGroup(group: any, q: DnQuestionRowBase<any>, service: DnQuestionControlService): any {
        const arr = q.question.key.split('.');
        if (arr.length === 2) {
            if (isNullOrUndefined(group[arr[0]])) {
                group[arr[0]] = new FormGroup({});
            }
            (group[arr[0]] as FormGroup).addControl(arr[1], service.getFormControl(q));
        }
        return group;
    }

    private toFormGroupWithForm(formBase: DnQuestionFormBase<DnQuestionBase<any>>, form: FormGroup) {
        let ths = this;
        formBase.questionRows.forEach(questionRow => {
            if (questionRow.row) {
                questionRow.row.forEach(q => {
                    form.addControl(q.question.key, ths.getFormControl(q));
                });
            }
        });
        return form;
    }

    private getFormControl(q: DnQuestionRowBase<any>) {
        return q.question.required ? new FormControl(q.question.value || '', Validators.required)
            : new FormControl({
                value: q.question.value || '',
                disabled: q.question.disabled
            });
    }

}
