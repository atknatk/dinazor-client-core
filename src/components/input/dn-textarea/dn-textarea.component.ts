import { Attribute, Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { isNullOrUndefined } from '../../../utils/check';
import { noop } from '../../../utils/common';

/**
 * Created by cabbar on 15.05.2017.
 */
const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DnTextareaComponent),
    multi: true
};
declare let $: any;

@Component({
    selector: 'dn-textarea',
    template: `
        <fieldset>
            <div class='form-group no-margin-bottom'>
                <label #termLabel
                       class='control-label col-md-{{labelRow}}'
                       [ngClass]="labelCss">
                    <ng-content></ng-content>
                </label>
                <div class='col-md-{{inputRow}}' [ngClass]='inputRowCss'>
          <textarea #termTextarea
                    [(ngModel)]='value'
                    type='text'
                    (blur)='onBlur()'
                    [formControl]='term'
                    rows='{{rows}}'
                    class='form-control'
                    [ngClass]="inputCss"></textarea>
                </div>
            </div>
        </fieldset>
    `,
    providers: [VALUE_ACCESSOR]
})
export class DnTextareaComponent implements ControlValueAccessor, OnInit {

    term: FormControl = new FormControl();
    @Input() form: FormGroup;
    @Input() label: string;
    @Input() name: string;
    @Input() message: any[];
    @Input() labelRow: number = 4;
    @Input() inputRow: number = 8;
    @Input() inputCss: string;
    @Input() inputRowCss: string;
    @Input() labelCss: string;

    @Input() rows: number = 1;
    @ViewChild('termLabel') private termLabel;
    @ViewChild('termTextarea') private termTextarea;

    private innerValue: any = '';
    private formErrors;
    private validationMessages;
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    constructor(@Attribute('formControlName') public formControlName, @Attribute('disabled') public disabled) {
        if (disabled === '') this.term.disable();
    }

    get value(): any {
        return this.innerValue;
    };

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

    ngOnInit(): void {
        if (isNullOrUndefined(this.form)) return;
        if (isNullOrUndefined(this.form.controls[this.formControlName])) {
            this.form.addControl(this.formControlName, new FormControl(null));
        }
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

    subscribeToResults(observable: Observable<string>) {
        observable.subscribe();
    }

    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    private subscribeToChangesAndLoadDataFromObservable() {
        const observable = this.term.valueChanges
            .debounceTime(100)
            .distinctUntilChanged();
        this.subscribeToResults(observable);
    }

}
