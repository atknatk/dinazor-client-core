/**
 * Created by cabbar on 27.03.2017.
 */
import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    ViewChildren
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DnQuestionControlService } from './dn-question/dn-question-control.service';
import { DnQuestionFormBase } from './dn-question/dn-question-form-base';
import { DnQuestionBase } from './dn-question/dn-question-base';
import { DnQuestionRowList } from './dn-question/dn-question-row-list';
import { DnQuestionRowBase } from './dn-question/dn-question-row-base';
import { DnQuestionValidatorBase } from './dn-question-validator/dn-question-validator-base';
import { DnQuestionRequiredValidator } from './dn-question-validator/dn-question-required-validator';
import { DnQuestionRegexValidator } from './dn-question-validator/dn-question-regex-validator';
import { DnQuestionLengthValidator } from './dn-question-validator/dn-question-lenght-validator';
import { DnQuestionIdenticalValidator } from './dn-question-validator/dn-question-identical-validator';
import { DnQuestionDifferentValidator } from './dn-question-validator/dn-question-different-validator';
import { isNullOrUndefined, isUndefined } from 'util';
import { DnDynamicFormQuestionComponent } from './dn-dynamic-form-question.component';
import { DnSelectQuestion } from './dn-question/dn-question-select';
import { DnSelectTriggerModel } from './dn-question/dn-select-trigger-model';

declare let $: any;

@Component({
    selector: 'dn-dynamic-form',
    templateUrl: './dn-dynamic-form.component.html',
    providers: [DnQuestionControlService]
})
export class DnDynamicFormComponent implements OnInit, AfterViewInit {

    form: FormGroup;

    @Input() formBase: DnQuestionFormBase<DnQuestionBase<any>>;
    @Input() dnform: FormGroup;
    @Output() payLoadData: EventEmitter<string> = new EventEmitter();
    @ViewChildren(DnDynamicFormQuestionComponent) childs: QueryList<DnDynamicFormQuestionComponent>;

    validatorOptions;
    private $form: any;

    constructor(private qcs: DnQuestionControlService, private  el: ElementRef) {

    }

    @Input()
    set formData(data: any) {
        if (data) {
            this.resetForm();
            this.form.patchValue(data);
        } else if (this.form) {
            this.resetForm();
        }
    }

    ngAfterViewInit(): void {
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

    }

    ngOnInit() {
        this.form = this.qcs.getFormGroup(this.formBase, this.dnform);
        this.formBase.getForm = () => {
            return this.form;
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

    }

    onSubmit() {
        if (this.formBase.isSetupValidate) {
            const bootstrapValidator = this.$form.data('bootstrapValidator');
            if (bootstrapValidator) {
                bootstrapValidator.validate();
                if (bootstrapValidator.isValid()) {
                    this.$form.submit();
                    this.payLoadData.emit(this.form.value);
                }
            } else {
                this.payLoadData.emit(this.form.value);
            }
        } else {
            this.payLoadData.emit(this.form.value);
        }
    }

    clearForm() {
        this.resetForm();
    }

    resetForm() {
        this.form.reset();
        if (this.formBase.isSetupValidate) {
            const bootstrapValidator = this.$form.data('bootstrapValidator');
            if (bootstrapValidator) {
                const fields = bootstrapValidator.fields;
                let $parent;
                let $icon;
                for (const field in fields) {
                    if (fields.hasOwnProperty(field)) {
                        $parent = $('[name="' + field + '"]').parents('.form-group');
                        $icon = $parent.find('.form-control-feedback[data-bv-icon-for="' + field + '"]');
                        $icon.tooltip('destroy');
                    }
                }
                bootstrapValidator.resetForm(true);
            }
        }
    }

    initValidator() {
        const fields: any = {};
        this.formBase.questionRows.forEach((rows: DnQuestionRowList) => {
            if (isNullOrUndefined(rows.row)) return;
            rows.row.forEach((questionRow: DnQuestionRowBase<any>) => {
                if (isUndefined(questionRow.question.validator)) return;
                fields[questionRow.question.key] = {
                    group: '.col-md-' + questionRow.rowSize,
                    validators: {}
                };

                questionRow.question.validator.forEach((validator: DnQuestionValidatorBase) => {

                    if (!validator.isActive) return;
                    if (validator instanceof DnQuestionRequiredValidator) {
                        fields[questionRow.question.key]['validators']['notEmpty'] = {
                            message: validator.message || 'Lütfen ' + questionRow.question.label + ' alanını doldurunuz'
                        };
                    } else if (validator instanceof DnQuestionRegexValidator) {
                        fields[questionRow.question.key]['validators']['regexp'] = {
                            regexp: validator.regex,
                            message: validator.message || 'Lütfen ' + questionRow.question.label +
                            ' alanını doğru bir şekilde doldurunuz'
                        };
                    } else if (validator instanceof DnQuestionLengthValidator) {
                        fields[questionRow.question.key]['validators']['stringLength'] = {
                            max: validator.maxLength,
                            min: validator.minLength,
                            message: validator.message || 'Lütfen ' + questionRow.question.label +
                            ' alanına en az ' + validator.minLength + ' en fazla ' + validator.maxLength +
                            ' karakter giriniz'
                        };
                    } else if (validator instanceof DnQuestionIdenticalValidator) {
                        fields[questionRow.question.key]['validators']['identical'] = {
                            field: validator.field,
                            message: validator.message
                        };
                    } else if (validator instanceof DnQuestionDifferentValidator) {
                        fields[questionRow.question.key]['validators']['different'] = {
                            field: validator.field,
                            message: validator.message
                        };
                    }
                });

            });
        });
        this.validatorOptions['fields'] = fields;
    }

    changeSelectEventEmit(data) {
        if (data.question instanceof DnSelectQuestion) {
            const question: DnSelectQuestion = data.question;
            if (question.triggerSelectIds && question.triggerSelectIds.length > 0) {
                this.childs.toArray().forEach((item: DnDynamicFormQuestionComponent) => {
                    if (item.question instanceof DnSelectQuestion) {
                        if (isNullOrUndefined(item.question.serviceUrlFn)) {
                            return;
                        }
                        const trigerModel: DnSelectTriggerModel = {
                            triggeredSelectId: question.id,
                            item: data.item
                        };
                        const serviceUrl = item.question.serviceUrlFn(trigerModel);
                        if (!isNullOrUndefined(serviceUrl)) {
                            item.initDataUrl(serviceUrl, data.item);
                        }
                    }
                });
            } else {
                const urlInc = '[' + data.question.id + ']';
                this.childs.toArray().forEach((item: DnDynamicFormQuestionComponent) => {
                    if (item.question instanceof DnSelectQuestion) {
                        const url: string = item.question.serviceUrl;
                        if (url.includes(urlInc)) {
                            // let serviceUrl =  url.substring(0,url.indexOf('[')) + data.item.id +
                            // url.substring(url.indexOf(']')+1,url.length)
                            const serviceUrl = url.replace(urlInc, data.item.id);
                            item.initDataUrl(serviceUrl, data.item);
                        }
                    }
                });
            }
        }

    }

    private attach() {
        this.$form = $(this.el.nativeElement);
        this.$form
        //   .find('[name]=gumrukIdaresi').change(function (e) {
        //   ths.$form.bootstrapValidator('revalidateField', 'gumrukIdaresi');
        // }).end()
        //   .on('init.field.bv', function (e, data) {
        //   // data.bv      --> The BootstrapValidator instance
        //   // data.field   --> The field name
        //   // data.element --> The field element
        //
        //   let $parent = data.element.parents('.form-group'),
        //     $icon = $parent.find('.form-control-feedback[data-bv-icon-for='' + data.field + '']'),
        //     options = data.bv.getOptions(),                      // Entire options
        //     validators = data.bv.getOptions(data.field).validators; // The field validators
        //
        //   if (validators.notEmpty && options.feedbackIcons && options.feedbackIcons.required) {
        //     // The field uses notEmpty validator
        //     // Add required icon
        //     $icon.addClass(options.feedbackIcons.required).show();
        //   }
        // })
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
        this.$form.submit((ev) => {
            ev.preventDefault();
        });
    }

}
