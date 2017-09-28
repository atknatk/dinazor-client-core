/**
 * Created by cabbar on 27.03.2017.
 */
import { Component, ElementRef, EventEmitter, Input, Output, ViewChildren } from '@angular/core';
import { DnQuestionControlService } from './dn-question/dn-question-control.service';
import { DnQuestionRequiredValidator } from './dn-question-validator/dn-question-required-validator';
import { DnQuestionRegexValidator } from './dn-question-validator/dn-question-regex-validator';
import { DnQuestionLengthValidator } from './dn-question-validator/dn-question-lenght-validator';
import { DnQuestionIdenticalValidator } from './dn-question-validator/dn-question-identical-validator';
import { DnQuestionDifferentValidator } from './dn-question-validator/dn-question-different-validator';
import { isNullOrUndefined, isUndefined } from 'util';
import { DnDynamicFormQuestionComponent } from './dn-dynamic-form-question.component';
import { DnSelectQuestion } from './dn-question/dn-question-select';
var DnDynamicFormComponent = /** @class */ (function () {
    function DnDynamicFormComponent(qcs, el) {
        this.qcs = qcs;
        this.el = el;
        this.payLoadData = new EventEmitter();
    }
    Object.defineProperty(DnDynamicFormComponent.prototype, "formData", {
        set: function (data) {
            if (data) {
                this.resetForm();
                this.form.patchValue(data);
            }
            else if (this.form) {
                this.resetForm();
            }
        },
        enumerable: true,
        configurable: true
    });
    DnDynamicFormComponent.prototype.ngAfterViewInit = function () {
        /*  if (this.validatorOptions && this.validatorOptions.isSetupValidate) {
              System.import('script-loader!smartadmin-plugins/bower_components/bootstrapvalidator/dist/js/
              bootstrapValidator.min.js').then(() => {
                  this.attach();
              });
          }*/
        // this.form.valueChanges.subscribe(data => {
        //   console.log('Form changes', data)
        //   //this.output = data
        // })
    };
    DnDynamicFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = this.qcs.getFormGroup(this.formBase, this.dnform);
        this.formBase.getForm = function () {
            return _this.form;
        };
        if (this.formBase.isSetupValidate) {
            this.$form = $(this.el.nativeElement);
            this.validatorOptions = {
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh',
                    required: 'glyphicon glyphicon-asterisk',
                },
                isSetupValidate: true
            };
            this.initValidator();
        }
    };
    DnDynamicFormComponent.prototype.onSubmit = function () {
        if (this.formBase.isSetupValidate) {
            var bootstrapValidator = this.$form.data('bootstrapValidator');
            if (bootstrapValidator) {
                bootstrapValidator.validate();
                if (bootstrapValidator.isValid()) {
                    this.$form.submit();
                    this.payLoadData.emit(this.form.value);
                }
            }
            else {
                this.payLoadData.emit(this.form.value);
            }
        }
        else {
            this.payLoadData.emit(this.form.value);
        }
    };
    DnDynamicFormComponent.prototype.clearForm = function () {
        this.resetForm();
    };
    DnDynamicFormComponent.prototype.resetForm = function () {
        this.form.reset();
        if (this.formBase.isSetupValidate) {
            var bootstrapValidator = this.$form.data('bootstrapValidator');
            if (bootstrapValidator) {
                var fields = bootstrapValidator.fields;
                var $parent = void 0;
                var $icon = void 0;
                for (var field in fields) {
                    if (fields.hasOwnProperty(field)) {
                        $parent = $('[name="' + field + '"]').parents('.form-group');
                        $icon = $parent.find('.form-control-feedback[data-bv-icon-for="' + field + '"]');
                        $icon.tooltip('destroy');
                    }
                }
                bootstrapValidator.resetForm(true);
            }
        }
    };
    DnDynamicFormComponent.prototype.initValidator = function () {
        var fields = {};
        this.formBase.questionRows.forEach(function (rows) {
            if (isNullOrUndefined(rows.row))
                return;
            rows.row.forEach(function (questionRow) {
                if (isUndefined(questionRow.question.validator))
                    return;
                fields[questionRow.question.key] = {
                    group: '.col-md-' + questionRow.rowSize,
                    validators: {}
                };
                questionRow.question.validator.forEach(function (validator) {
                    if (!validator.isActive)
                        return;
                    if (validator instanceof DnQuestionRequiredValidator) {
                        fields[questionRow.question.key]['validators']['notEmpty'] = {
                            message: validator.message || 'Lütfen ' + questionRow.question.label + ' alanını doldurunuz'
                        };
                    }
                    else if (validator instanceof DnQuestionRegexValidator) {
                        fields[questionRow.question.key]['validators']['regexp'] = {
                            regexp: validator.regex,
                            message: validator.message || 'Lütfen ' + questionRow.question.label +
                                ' alanını doğru bir şekilde doldurunuz'
                        };
                    }
                    else if (validator instanceof DnQuestionLengthValidator) {
                        fields[questionRow.question.key]['validators']['stringLength'] = {
                            max: validator.maxLength,
                            min: validator.minLength,
                            message: validator.message || 'Lütfen ' + questionRow.question.label +
                                ' alanına en az ' + validator.minLength + ' en fazla ' + validator.maxLength +
                                ' karakter giriniz'
                        };
                    }
                    else if (validator instanceof DnQuestionIdenticalValidator) {
                        fields[questionRow.question.key]['validators']['identical'] = {
                            field: validator.field,
                            message: validator.message
                        };
                    }
                    else if (validator instanceof DnQuestionDifferentValidator) {
                        fields[questionRow.question.key]['validators']['different'] = {
                            field: validator.field,
                            message: validator.message
                        };
                    }
                });
            });
        });
        this.validatorOptions['fields'] = fields;
    };
    DnDynamicFormComponent.prototype.changeSelectEventEmit = function (data) {
        if (data.question instanceof DnSelectQuestion) {
            var question_1 = data.question;
            if (question_1.triggerSelectIds && question_1.triggerSelectIds.length > 0) {
                this.childs.toArray().forEach(function (item) {
                    if (item.question instanceof DnSelectQuestion) {
                        if (isNullOrUndefined(item.question.serviceUrlFn)) {
                            return;
                        }
                        var trigerModel = {
                            triggeredSelectId: question_1.id,
                            item: data.item
                        };
                        var serviceUrl = item.question.serviceUrlFn(trigerModel);
                        if (!isNullOrUndefined(serviceUrl)) {
                            item.initDataUrl(serviceUrl, data.item);
                        }
                    }
                });
            }
            else {
                var urlInc_1 = '[' + data.question.id + ']';
                this.childs.toArray().forEach(function (item) {
                    if (item.question instanceof DnSelectQuestion) {
                        var url = item.question.serviceUrl;
                        if (url.includes(urlInc_1)) {
                            // let serviceUrl =  url.substring(0,url.indexOf('[')) + data.item.id +
                            // url.substring(url.indexOf(']')+1,url.length)
                            var serviceUrl = url.replace(urlInc_1, data.item.id);
                            item.initDataUrl(serviceUrl, data.item);
                        }
                    }
                });
            }
        }
    };
    DnDynamicFormComponent.prototype.attach = function () {
        this.$form = $(this.el.nativeElement);
        this.$form
            .bootstrapValidator(this.validatorOptions || {});
        //   .on('status.field.bv', function (e, data) {
        //     // Remove the required icon when the field updates its status
        //   let $parent = data.element.parents('.form-group'),
        //     $icon = $parent.find('.form-control-feedback[data-bv-icon-for='' + data.field + '']'),
        //     options = data.bv.getOptions(),                      // Entire options
        //     validators = data.bv.getOptions(data.field).validators; // The field validators
        //
        //   if (validators.notEmpty && options.feedbackIcons && options.feedbackIcons.required) {
        //     $icon.removeClass(options.feedbackIcons.required).addClass('fa');
        //   }
        // })
        //   .on('error.validator.bv', function (e, data) {
        //   // $(e.target)    --> The field element
        //   // data.bv        --> The BootstrapValidator instance
        //   // data.field     --> The field name
        //   // data.element   --> The field element
        //   // data.validator --> The current validator name
        //   data.element
        //     .data('bv.messages')
        //     // Hide all the messages
        //     .find('.help-block[data-bv-for='' + data.field + '']').hide()
        //   // Show only message associated with current validator
        //     .filter('[data-bv-validator='' + data.validator + '']').show();
        // })
        //   .on('success.field.bv', function (e, data) {
        //   // If the field is empty
        //   if (data.element.val() === '') {
        //     let $parent = data.element.parents('.form-group');
        //
        //     // Remove the has-success class
        //     $parent.removeClass('has-success');
        //
        //     // Hide the success icon
        //     $parent.find('.form-control-feedback[data-bv-icon-for='' + data.field + '']').hide();
        //   }
        // });
        this.$form.submit(function (ev) {
            ev.preventDefault();
        });
    };
    DnDynamicFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-dynamic-form',
                    templateUrl: './dn-dynamic-form.component.html',
                    providers: [DnQuestionControlService]
                },] },
    ];
    /** @nocollapse */
    DnDynamicFormComponent.ctorParameters = function () { return [
        { type: DnQuestionControlService, },
        { type: ElementRef, },
    ]; };
    DnDynamicFormComponent.propDecorators = {
        'formBase': [{ type: Input },],
        'dnform': [{ type: Input },],
        'payLoadData': [{ type: Output },],
        'childs': [{ type: ViewChildren, args: [DnDynamicFormQuestionComponent,] },],
        'formData': [{ type: Input },],
    };
    return DnDynamicFormComponent;
}());
export { DnDynamicFormComponent };
//# sourceMappingURL=dn-dynamic-form.component.js.map