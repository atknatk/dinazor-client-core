"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by cabbar on 27.03.2017.
 */
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var check_1 = require("../../../utils/check");
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
        return new forms_1.FormGroup(group);
    };
    DnQuestionControlService.prototype.addFormGroup = function (group, q, service) {
        var arr = q.question.key.split('.');
        if (arr.length === 2) {
            if (check_1.isNullOrUndefined(group[arr[0]])) {
                group[arr[0]] = new forms_1.FormGroup({});
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
        return q.question.required ? new forms_1.FormControl(q.question.value || '', forms_1.Validators.required)
            : new forms_1.FormControl({
                value: q.question.value || '',
                disabled: q.question.disabled
            });
    };
    DnQuestionControlService = __decorate([
        core_1.Injectable()
    ], DnQuestionControlService);
    return DnQuestionControlService;
}());
exports.DnQuestionControlService = DnQuestionControlService;
