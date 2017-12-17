import { Attribute, Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { DnLoggerService } from '../../../../services/log/logger.service';
import { isNullOrUndefined } from '../../../../utils/check';
import { noop } from '../../../../utils/common';
import { DnSelect2Item } from '../dn-select2-item';
import { DnSelect2Component } from '../dn-select2.component';
import { DnSelect2Service } from '../dn-select2.service';

/**
 * Created by cabbar on 15.05.2017.
 */

const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DnSelect2ContainerComponent),
    multi: true
};
declare let $: any;

@Component({
    selector: 'dn-select2-container',
    exportAs: 'dnSelect2Container',
    template: `
        <fieldset>
            <div class='form-group no-margin-bottom'>
                <label #termLabel
                       class='control-label col-md-{{labelRow}}'
                       [ngClass]="formErrors && formErrors[formControlName] ? 'dn-error' : null">
                    <ng-content></ng-content>
                </label>
                <div class='col-md-{{inputRow}}' [ngClass]='inputRowCss'>
                    <dn-select2 #termSelect
                                [(ngModel)]='value'
                                (blur)='onBlur()'
                                [name]='name'
                                [serviceUrl]='serviceUrl'
                                [displaySelect]='displaySelect'
                                [selectedText]='selectedText'
                                [referenceMode]='referenceMode'
                                [multiple]='multiple'
                                [minimumInputLength]='minimumInputLength'
                                [placeholder]='placeholder'
                                (onSelect)='onSelectEvent($event)'
                                (onRemove)='onRemoveEvent($event)'
                                [disabled]="isDisabled"
                                [css]="'form-control ' + inputCss"></dn-select2>
                    <small *ngIf='formErrors && formErrors[formControlName]' class='dn-error'>
                        {{ formErrors[formControlName] }}
                    </small>
                </div>
            </div>
        </fieldset>
    `,
    providers: [VALUE_ACCESSOR]
})
export class DnSelect2ContainerComponent implements ControlValueAccessor, OnInit {

    formErrors;
    formControlName;
    isDisabled = false;
    @Output() onSelect: EventEmitter<DnSelect2Item> = new EventEmitter<DnSelect2Item>();
    @Output() onRemove: EventEmitter<DnSelect2Item> = new EventEmitter<DnSelect2Item>();
    @Input() form: FormGroup;
    @Input() minimumInputLength = 0;
    @Input() placeholder: string = this.minimumInputLength === 0 ? 'Seçiniz..' : 'Minimum ' + this.minimumInputLength + ' karakter giriniz';
    @Input() multiple = false;
    @Input() serviceUrl: string;
    @Input() label: string;
    @Input() name: string;
    // @Input() validators: DnQuestionValidatorBase[];
    @Input() message: any[];
    @Input() labelRow: number = 4;
    @Input() inputRow: number = 8;
    @Input() inputRowCss: string;
    @Input() inputCss: string;
    @Input() number: boolean = false;
    @Input() referenceMode: 'entity' | 'id' = 'entity';
    @ViewChild('termLabel') private termLabel;
    @ViewChild('termSelect') private termSelect: DnSelect2Component<any>;
    @Input() displaySelect: (_: DnSelect2Item) => string = res => res.entity['code'] + ' - ' + res.name;
    @Input() selectedText: (_: DnSelect2Item) => string = res => res.entity['code'];

    private innerValue: any = '';
    private validationMessages;
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    private control: FormControl;

    constructor(@Attribute('formControlName') _formControlName,
                @Attribute('disabled') private disabled,
                private _log: DnLoggerService) {
        this.formControlName = _formControlName;
        if (isNullOrUndefined(this.serviceUrl)) this.serviceUrl = _formControlName;
    }

    get value(): any {
        return this.innerValue;
    }

    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
            // let obj: any = {entity: v};
            // obj.name = v.name;
            // obj.id = v.id;
            // this.termSelect.onItemSelected(obj);
        }
    }

    getSelect2(): DnSelect2Component<any> {
        return this.termSelect;
    }

    getService(): DnSelect2Service {
        return this.termSelect.getService();
    }

    /* getValidatorForm(validators: DnQuestionValidatorBase[]): ValidatorFn[] {
         let data: ValidatorFn[] = [];
         validators.forEach(validator => {
             if (validator instanceof DnQuestionRequiredValidator) {
                 data.push(Validators.required);
             }
         });
         return data;
     }*/

    initializeValidationData() {
        this.formErrors = {};
        this.formErrors[this.formControlName] = '';
        this.validationMessages = {};
        this.validationMessages[this.formControlName] = {
            required: 'Lütfen ' + this.termLabel.nativeElement.innerText + ' alanını seçiniz!'
        };
    }

    ngOnInit(): void {
        this._log.debug('DnSelect2ContainerComponent yükleniyor.(ngOnInit)', this.formControlName);

        this.isDisabled = this.disabled === '';
        if (this.form) {
            this.control = this.form.controls[this.formControlName] as FormControl;
            if (isNullOrUndefined(this.control)) {
                this._log.debug(`DnSelect2ContainerComponent forma control ekleniyor.(ngOnInit)`, this.formControlName);
                this.form.addControl(this.formControlName, new FormControl(null));
                this.control = this.form.controls[this.formControlName] as FormControl;
                if (this.control.disabled) this.control.disable();
            } else {
                if (this.isDisabled) this.control.disable();
            }
            // this.initializeValidationData();
            // this.initValidation();
        }
    }

    onBlur() {
        this.onTouchedCallback();
    }

    onItemSelected(item: DnSelect2Item) {
        this.termSelect.onItemSelected(item);
    }

    onRemoveEvent(item: DnSelect2Item) {
        this.onRemove.emit(item);
    }

    onSelectEvent(item: DnSelect2Item) {
        this.onSelect.emit(item);
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this._log.debug(`DnSelect2ContainerComponent setDisabledState status: ${isDisabled}.(setDisabledState)`,
            this.formControlName);
        this.isDisabled = isDisabled;
    }

    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    private css() {
        const css: string[] = [];
        if (this.inputCss) {
            this.inputCss += ' ' + css.join(' ');
        } else {
            this.inputCss = css.join(' ');
        }
    }
}
