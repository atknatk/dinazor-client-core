import { Attribute, Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import 'inputmask/dist/inputmask/inputmask.date.extensions';
import 'inputmask/dist/inputmask/inputmask.extensions';
import Inputmask from 'inputmask/dist/inputmask/inputmask.numeric.extensions';
import 'inputmask/dist/inputmask/inputmask.phone.extensions';
import { Observable } from 'rxjs/Rx';
import { isNullOrUndefined, isString } from '../../utils/check';
import { noop } from '../../utils/common';

/**
 * Created by cabbar on 15.05.2017.
 */

const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DnInputComponent),
    multi: true
};
declare let $: any;

@Component({
    selector: 'dn-input',
    template: `
        <fieldset>
            <div class='form-group no-margin-bottom'>
                <label #termLabel
                       [hidden]="labelRow == 0"
                       class='control-label col-md-{{labelRow}}'
                       [ngClass]='labelRowCss'>
                    <ng-content></ng-content>
                </label>
                <div class='col-md-{{inputRow}}' [ngClass]='inputRowCss'>
                    <input #termInput
                           [(ngModel)]='value'
                           type='text'
                           (blur)='onBlur()'
                           [formControl]='term'
                           class='form-control'
                           (keypress)='keyPress($event)'
                           [ngClass]="inputCss"/>
                </div>
            </div>
        </fieldset>
    `,
    providers: [VALUE_ACCESSOR]
})
export class DnInputComponent implements ControlValueAccessor, OnInit {

    term: FormControl = new FormControl();
    @Input() form: FormGroup;
    @Input() mask: any;
    @Input() label: string;
    @Input() name: string;
    @Input() message: any[];
    @Input() labelRow: number = 4;
    @Input() inputRow: number = 8;
    @Input() labelRowCss: string = '';
    @Input() inputRowCss: string = '';
    @Input() inputCss: string = '';
    @Input() number: boolean = false;
    @Input() isDisabled: boolean = false;
    @ViewChild('termLabel') private termLabel;
    @ViewChild('termInput') private termInput;

    private innerValue: any = '';
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
    }

    get value(): any {
        return this.innerValue;
    }

    @Input()
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    css() {
        const css: string[] = [];
        if (this.inputCss) {
            this.inputCss += ' ' + css.join(' ');
        } else {
            this.inputCss = css.join(' ');
        }
    }


    initMask() {
        let ths = this;
        this.extendMask();
        const onincomplete = function() {
            if (ths && ths.form || isNullOrUndefined(ths.formControlName)) return;
            ths.form.controls[ths.formControlName].patchValue(null);
            ths.value = null;
        };

        const inputMask: any = {
            showMaskOnHover: false,
            onincomplete: onincomplete
        };

        if (this.mask) {
            if (isString(this.mask) && (this.mask === 'dnCurrency' ||
                    this.mask === 'dnDecimal' || this.mask === 'dnDatetime' ||
                    this.mask === 'email' || this.mask === 'decimal' ||
                    this.mask === 'numeric' || this.mask === 'integer' ||
                    this.mask === 'percentage' ||
                    this.mask.indexOf('dd/') > -1 ||
                    this.mask.indexOf('datetime') > -1)) {
                inputMask.alias = this.mask;
            } else {
                inputMask.mask = this.mask;
            }
            const im = this.mask === 'dnDatetime' ? new Inputmask('datetime', this.getDatetime(onincomplete)) : new Inputmask(inputMask);
            im.mask(this.termInput.nativeElement);
        }
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

    ngOnInit(): void {
        this.setDisabled();
        this.initMask();
        if (isNullOrUndefined(this.form)) return;
        if (isNullOrUndefined(this.form.controls[this.formControlName])) {
            this.form.addControl(this.formControlName, new FormControl(null));
        }
        this.formControl = this.form.get(this.formControlName);

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
            this.term.disable();
            if (!isNullOrUndefined(this.formControl))
                this.formControl.disable();
        }
    }

    subscribeToResults(observable: Observable<string>) {
        observable.subscribe();
    }

    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    private extendMask() {
        Inputmask.extendAliases({
            dnCurrency: {
                autoUnmask: true,
                alias: 'numeric',
                groupSeparator: ',',
                autoGroup: true,
                digits: 2,
                digitsOptional: false,
                placeholder: '0',
                showMaskOnHover: false
            }
        });

        Inputmask.extendAliases({
            dnDecimal: {
                autoUnmask: true,
                alias: 'decimal',
                groupSeparator: ',',
                autoGroup: true,
                placeholder: '',
                showMaskOnHover: false
            }
        });
    }

    private getDatetime(onincomplete) {
        return {
            mask: '1/2/y h:s',
            placeholder: 'dd/mm/yyyy hh:mm',
            separator: '/',
            alias: 'dd/mm/yyyy',
            onincomplete: onincomplete,
            showMaskOnHover: false
        };
    }


    private subscribeToChangesAndLoadDataFromObservable() {
        const observable = this.term.valueChanges
            .debounceTime(100)
            .distinctUntilChanged();
        this.subscribeToResults(observable);
    }
}

