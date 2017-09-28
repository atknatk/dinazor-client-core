import {
    Attribute,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    ViewChild, ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { isNullOrUndefined } from '../../../../utils/check';
import { DnSelect2Item } from '../dn-select2-item';
import { DnSelect2Component } from '../dn-select2.component';
import { DnSelect2Service } from '../dn-select2.service';
import { noop } from '../../../../utils/common';

/**
 * Created by cabbar on 15.05.2017.
 */

const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DnSelect2SmartContainerComponent),
    multi: true
};
declare let $: any;

@Component({
    selector: 'dn-select2-smart',
    template: `
        <section class="dn-select2-smart-container col col-{{col}}">
            <label *ngIf="hasLabel" #termLabel class="label">
                <ng-content></ng-content>
            </label>
            <label class="input"> <i *ngIf="icon" class="icon-append" [ngClass]="icon"></i>
                <label class="input">
                    <dn-select2 #termSelect
                                [(ngModel)]='value'
                                (blur)='onBlur()'
                                [name]='name'
                                [serviceUrl]='serviceUrl'
                                [displaySelect]='displaySelect'
                                [selectedText]='selectedText'
                                [referenceMode]='referenceMode'
                                [multiple]='false'
                                [minimumInputLength]='minimumInputLength'
                                [placeholder]='placeholder'
                                (onSelect)='onSelectEvent($event)'
                                (onRemove)='onRemoveEvent($event)'
                                [disabled]="isDisabled"
                                [css]="'input-sm select2-smart-selection-container ' + inputCss"></dn-select2>
                </label>
            </label>
        </section>`,
    styles: [`
        .select2-smart-selection-container {
            padding: 0px 30px 0px 2px !important;
            min-height: 28px !important;
            border-color: #BDBDBD !important;
            border-width: 1px !important;
            border-style: solid !important;
        }


        .dn-select2-smart-container .select2-input {
            margin-top: 0 !important;
        }


        .dn-select2-smart-container input {
            height: 28px;
            line-height: 28px;

        }


        .dn-select2-smart-container .simple-selection input{
            left: 2px !important;
            background: #fff !important;
            color: #404040;
            appearance: normal;
            -moz-appearance: none;
            -webkit-appearance: none;
            outline: 0;
            height: 28px;
            line-height: 28px;
            /*padding: 5px 10px;*/
            width: 100%;
            font-size: 12px !important;
            line-height: 1.5 !important;;
        }


        .dn-select2-smart-container .select2-results-container {
            margin-top: -1px !important;
            overflow-x: hidden;
        }

        .dn-select2-smart-container .results-msg {
            margin-top: -1px !important;
            overflow-x: hidden;
        }



        .dn-select2-smart-container .select2-container .search-focused {
            border-color: #3276B1 !important;;
            -webkit-box-shadow: none !important;
            box-shadow: none !important;;
        }


        .dn-select2-smart-container a {
            color: #404040;
        }

        .dn-select2-smart-container  .select2-selected {
            left: 2px !important;
            background: #fff !important;
            color: #404040;
            appearance: normal;
            -moz-appearance: none;
            -webkit-appearance: none;
            outline: 0;
            width: 100%;
            font-size: 12px !important;
            line-height: 1.5 !important;;
        }

        .dn-select2-smart-container  .simple-selection .select2-selected{
            padding-top: 4px !important;
        }
    `],
    encapsulation: ViewEncapsulation.None,
    providers: [VALUE_ACCESSOR]
})
export class DnSelect2SmartContainerComponent implements ControlValueAccessor, OnInit {

    @Output() onSelect: EventEmitter<DnSelect2Item> = new EventEmitter<DnSelect2Item>();
    @Output() onRemove: EventEmitter<DnSelect2Item> = new EventEmitter<DnSelect2Item>();
    @Input() form: FormGroup;
    @Input() minimumInputLength = 0;
    @Input() placeholder: string = this.minimumInputLength === 0 ? 'Seçiniz..' : 'Minimum ' + this.minimumInputLength + ' karakter giriniz';
    @Input() serviceUrl: string;
    @Input() label: string;
    @Input() name: string;
    // @Input() validators: DnQuestionValidatorBase[];
    @Input() message: any[];
    @Input() labelRow: number = 4;
    @Input() inputRow: number = 8;
    @Input() col: number = 12;
    @Input() icon: string;
    @Input() inputCss: string;
    @Input() number: boolean = false;
    @Input() referenceMode: 'entity' | 'id' = 'entity';
    @Input() hasLabel: boolean = true;
    @Input() isDisabled = false;
    @ViewChild('termLabel') termLabel;
    @ViewChild('termSelect') termSelect: DnSelect2Component<any>;
    private innerValue: any = '';
    private formErrors;
    private validationMessages;
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    private control: FormControl;
    @Input() displaySelect: (_: DnSelect2Item) => string = res => res.entity['code'] + ' - ' + res.name;
    @Input() selectedText: (_: DnSelect2Item) => string = res => res.entity['code'];

    constructor(@Attribute('formControlName') private formControlName,
                @Attribute('disabled') private disabled,
                private _el: ElementRef) {
        if (isNullOrUndefined(this.serviceUrl)) this.serviceUrl = formControlName;

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

    /*  getValidatorForm(validators: DnQuestionValidatorBase[]): ValidatorFn[] {
          let data: ValidatorFn[] = [];
          validators.forEach(validator => {
              if (validator instanceof DnQuestionRequiredValidator) {
                  data.push(Validators.required);
              }
          });
          return data;
      }
  */
    getSelect2(): DnSelect2Component<any> {
        return this.termSelect;
    }

    getService(): DnSelect2Service {
        return this.termSelect.getService();
    }

    initializeValidationData() {
        if (this.termLabel && this.termLabel.nativeElement) {
            this.formErrors = {};
            this.formErrors[this.formControlName] = '';
            this.validationMessages = {};
            this.validationMessages[this.formControlName] = {
                required: 'Lütfen ' + this.termLabel.nativeElement.innerText + ' alanını seçiniz!'
            };
        }
    }

    ngOnInit(): void {
        this.isDisabled = this.disabled === '';
        if (this.form) {
            this.control = this.form.controls[this.formControlName] as FormControl;
            if (isNullOrUndefined(this.control)) {
                this.form.addControl(this.formControlName, new FormControl(null));
                this.control = this.form.controls[this.formControlName] as FormControl;
            }
            if (this.isDisabled) this.control.disable();
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

    subscribeToResults(observable: Observable<string>) {
        observable.subscribe(item => {
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

    /* private initValidation() {
         if (this.validators && this.validators.length > 0 && !isNullOrUndefined(this.control)) {
             this.form.controls[this.formControlName].setValidators(this.getValidatorForm(this.validators));
             this.css(this.validators);
             this.subscribeToChangesAndLoadDataFromObservable();
         }
     }*/

    private css() {
        const css: string[] = [];
        if (this.inputCss) {
            this.inputCss += ' ' + css.join(' ');
        } else {
            this.inputCss = css.join(' ');
        }
    }

    private subscribeToChangesAndLoadDataFromObservable() {
        if (this.control) {
            const observable = this.control.valueChanges
                .debounceTime(100)
                .distinctUntilChanged();
            this.subscribeToResults(observable);

        }
    }

    /*    private css(validators: DnQuestionValidatorBase[]) {
            let css: string[] = [];
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
        }*/
}
