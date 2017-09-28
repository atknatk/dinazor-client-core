/**
 * Created by cabbar on 27.03.2017.
 */
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isNullOrUndefined } from '../../../utils/check';
var DnQuestionControlService = /** @class */ (function () {
    function DnQuestionControlService() {
    }
    DnQuestionControlService.prototype.getFormGroup = function (formBase, form) {
        if (form && form != null) {
            if (formBase.formGroupName) {
                var fg = this.toFormGroup(formBase);
                form.addControl(formBase.formGroupName, fg);
                return form;
            }
            return this.toFormGroupWithForm(formBase, form);
        }
        return this.toFormGroup(formBase);
    };
    DnQuestionControlService.prototype.toFormGroup = function (formBase) {
        var group = {};
        var ths = this;
        formBase.questionRows.forEach(function (questionRow) {
            if (questionRow.row) {
                questionRow.row.forEach(function (q) {
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
    };
    DnQuestionControlService.prototype.addFormGroup = function (group, q, service) {
        var arr = q.question.key.split('.');
        if (arr.length === 2) {
            if (isNullOrUndefined(group[arr[0]])) {
                group[arr[0]] = new FormGroup({});
            }
            group[arr[0]].addControl(arr[1], service.getFormControl(q));
        }
        return group;
    };
    DnQuestionControlService.prototype.toFormGroupWithForm = function (formBase, form) {
        var ths = this;
        formBase.questionRows.forEach(function (questionRow) {
            if (questionRow.row) {
                questionRow.row.forEach(function (q) {
                    form.addControl(q.question.key, ths.getFormControl(q));
                });
            }
        });
        return form;
    };
    DnQuestionControlService.prototype.getFormControl = function (q) {
        return q.question.required ? new FormControl(q.question.value || '', Validators.required)
            : new FormControl({
                value: q.question.value || '',
                disabled: q.question.disabled
            });
    };
    DnQuestionControlService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DnQuestionControlService.ctorParameters = function () { return []; };
    return DnQuestionControlService;
}());
export { DnQuestionControlService };
//# sourceMappingURL=dn-question-control.service.js.map