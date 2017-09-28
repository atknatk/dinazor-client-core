import { OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
export declare class DnTextareaComponent implements ControlValueAccessor, OnInit {
    formControlName: any;
    disabled: any;
    term: FormControl;
    form: FormGroup;
    label: string;
    name: string;
    message: any[];
    labelRow: number;
    inputRow: number;
    inputCss: string;
    inputRowCss: string;
    labelCss: string;
    rows: number;
    private termLabel;
    private termTextarea;
    private innerValue;
    private formErrors;
    private validationMessages;
    private onTouchedCallback;
    private onChangeCallback;
    constructor(formControlName: any, disabled: any);
    value: any;
    css(): void;
    ngOnInit(): void;
    onBlur(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    subscribeToResults(observable: Observable<string>): void;
    writeValue(value: any): void;
    private subscribeToChangesAndLoadDataFromObservable();
}
