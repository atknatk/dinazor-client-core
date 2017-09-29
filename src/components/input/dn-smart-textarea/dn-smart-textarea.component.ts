import { Attribute, Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    FormControl,
    FormGroup,
    NG_VALUE_ACCESSOR,
    ValidatorFn,
    Validators
} from '@angular/forms';
import 'inputmask/dist/inputmask/inputmask.date.extensions';
import 'inputmask/dist/inputmask/inputmask.extensions';
import 'inputmask/dist/inputmask/inputmask.phone.extensions';
import { Observable } from 'rxjs/Observable';
import { isNullOrUndefined } from '../../../utils/check';
import { DnQuestionRequiredValidator } from '../../dynamic-form/dn-question-validator/dn-question-required-validator';
import { DnQuestionValidatorBase } from '../../dynamic-form/dn-question-validator/dn-question-validator-base';

/**
 * Created by cabbar on 15.05.2017.
 */
export const noop = () => {
};
const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DnSmartTextareaComponent),
    multi: true
};
declare let $: any;

@Component({
    selector: 'dn-smart-textarea',
    template: `
        <section class="col col-{{col}}">
            <label #termLabel class="label">
                <ng-content></ng-content>
            </label>
            <label class="textarea" [ngClass]="labelCss()">
                <i *ngIf="icon" class="icon-append" [ngClass]="icon"></i>
                <textarea #termInput
                          [(ngModel)]='value'
                          type="text"
                          (blur)='onBlur()'
                          [formControl]='term'
                          (keypress)='keyPress($event)'
                          class="custom-scroll"
                          name="{{formControlName}}"
                          rows="{{rows}}"
                          placeholder="{{placeholder}}"></textarea>
            </label>
        </section>`,
    providers: [VALUE_ACCESSOR]
})
export class DnSmartTextareaComponent implements ControlValueAccessor, OnInit {

    term: FormControl = new FormControl();
    @Input() form: FormGroup;
    @Input() labelShow: boolean = true;
    @Input() name: string;
    @Input() validators: DnQuestionValidatorBase[];
    @Input() message: any[];
    @Input() col: number = 12;
    @Input() rows: number = 2;
    @Input() placeholder: string = '';
    @Input() icon: string;
    @Input() inputCss: string = '';
    @Input() number: boolean = false;
    @Input() isResizable: boolean = true;
    @Input() isDisabled: boolean = false;
    @ViewChild('termLabel') private termLabel;
    @ViewChild('termInput') private termInput;

    private innerValue: any = '';
    private formErrors = {};
    private validationMessages = {};
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    private formControl: AbstractControl;

    constructor(@Attribute('formControlName') public formControlName,
                @Attribute('disabled') public disabled,
                private el: ElementRef) {
    }

    get nativeElement(): any {
        return this.el.nativeElement;
    };

    get value(): any {
        return this.innerValue;
    };

    @Input()
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    css(validators: DnQuestionValidatorBase[]) {
        const css: string[] = [];
        validators.forEach(validator => {
            if (validator instanceof DnQuestionRequiredValidator) {
                if (css.indexOf('dn-reqiured') == -1) {
                    css.push('dn-reqiured');
                }
            }
        });
        if (this.inputCss) {
            this.inputCss += ' ' + css.join(' ');
        } else {
            this.inputCss = css.join(' ');
        }
    }

    getValidatorForm(validators: DnQuestionValidatorBase[]): ValidatorFn[] {
        const data: ValidatorFn[] = [];
        validators.forEach(validator => {
            if (validator instanceof DnQuestionRequiredValidator) {
                data.push(Validators.required);
            }
        });
        return data;
    }

    initializeValidationData() {
        this.formErrors = {};
        this.formErrors[this.formControlName] = '';
        this.validationMessages = {};
        this.validationMessages[this.formControlName] = {
            required: 'Lütfen ' + this.termLabel.nativeElement.innerText + ' alanını doldurunuz!'
        };
    }

    keyPress(event: any) {
        if (this.number) {
            const pattern = /[0-9\+\-\ ]/;
            const inputChar = String.fromCharCode(event.charCode);

            if (!pattern.test(inputChar)) {
                // invalid character, prevent input
                event.preventDefault();
            }
        }
    }

    labelCss(): string {
        let css: string = '';
        css += this.isDisabled ? 'state-disabled ' : '';
        css += this.isResizable ? 'textarea-resizable' : '';
        return css;
    }

    ngOnInit(): void {
        this.setDisabled();
        if (isNullOrUndefined(this.form)) return;
        if (isNullOrUndefined(this.form.controls[this.formControlName])) {
            this.form.addControl(this.formControlName, new FormControl(null));
        }
        this.formControl = this.form.get(this.formControlName);
        this.initializeValidationData();
        this.initValidation();

    }

    onBlur() {
        this.onTouchedCallback();
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    setDisabled() {
        if (this.disabled === '' || this.isDisabled) {
            this.isDisabled = true;
            this.term.disable();
            if (!isNullOrUndefined(this.formControl))
                this.formControl.disable();
        }
    }

    subscribeToResults(observable: Observable<string>) {
        observable.subscribe(() => {
            if (!this.form) {
                return;
            }
            const form = this.form;
            for (const field in this.formErrors) {
                if (this.formErrors.hasOwnProperty(field)) {
                    this.formErrors[field] = '';
                    const control = form.get(field);
                    if (control && control.dirty && !control.valid) {
                        const messages = this.validationMessages[field];
                        for (const key in control.errors) {
                            if (control.errors.hasOwnProperty(key)) {
                                this.formErrors[field] += messages[key] + ' ';
                            }
                        }
                    }
                }
            }
        });
    }

    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    private initValidation() {
        if (this.validators && this.validators.length > 0 &&
            !isNullOrUndefined(this.form.controls[this.formControlName])) {
            this.form.controls[this.formControlName].setValidators(this.getValidatorForm(this.validators));
            this.css(this.validators);
            this.subscribeToChangesAndLoadDataFromObservable();
        }
    }

    private subscribeToChangesAndLoadDataFromObservable() {
        const observable = this.term.valueChanges
            .debounceTime(100)
            .distinctUntilChanged();
        this.subscribeToResults(observable);
    }

}
