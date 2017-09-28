import { Attribute, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import 'inputmask/dist/inputmask/inputmask.date.extensions';
import 'inputmask/dist/inputmask/inputmask.extensions';
import Inputmask from 'inputmask/dist/inputmask/inputmask.numeric.extensions';
import 'inputmask/dist/inputmask/inputmask.phone.extensions';
import { isNullOrUndefined, isString } from '../../utils/check';
import { noop } from '../../utils/common';
/**
 * Created by cabbar on 15.05.2017.
 */
var VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DnInputComponent; }),
    multi: true
};
var DnInputComponent = /** @class */ (function () {
    function DnInputComponent(formControlName, disabled, el) {
        this.formControlName = formControlName;
        this.disabled = disabled;
        this.el = el;
        this.term = new FormControl();
        this.labelRow = 4;
        this.inputRow = 8;
        this.labelRowCss = '';
        this.inputRowCss = '';
        this.inputCss = '';
        this.number = false;
        this.isDisabled = false;
        this.innerValue = '';
        this.validationMessages = {};
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(DnInputComponent.prototype, "nativeElement", {
        get: function () {
            return this.el.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DnInputComponent.prototype, "value", {
        get: function () {
            return this.innerValue;
        },
        set: function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    DnInputComponent.prototype.css = function () {
        var css = [];
        if (this.inputCss) {
            this.inputCss += ' ' + css.join(' ');
        }
        else {
            this.inputCss = css.join(' ');
        }
    };
    DnInputComponent.prototype.initMask = function () {
        var ths = this;
        this.extendMask();
        var onincomplete = function () {
            if (ths && ths.form || isNullOrUndefined(ths.formControlName))
                return;
            ths.form.controls[ths.formControlName].patchValue(null);
            ths.value = null;
        };
        var inputMask = {
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
            }
            else {
                inputMask.mask = this.mask;
            }
            var im = this.mask === 'dnDatetime' ? new Inputmask('datetime', this.getDatetime(onincomplete)) : new Inputmask(inputMask);
            im.mask(this.termInput.nativeElement);
        }
    };
    DnInputComponent.prototype.keyPress = function (event) {
        if (this.number) {
            var pattern = /[0-9\+\-\ ]/;
            var inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                // invalid character, prevent input
                event.preventDefault();
            }
        }
    };
    DnInputComponent.prototype.ngOnInit = function () {
        this.setDisabled();
        this.initMask();
        if (isNullOrUndefined(this.form))
            return;
        if (isNullOrUndefined(this.form.controls[this.formControlName])) {
            this.form.addControl(this.formControlName, new FormControl(null));
        }
        this.formControl = this.form.get(this.formControlName);
    };
    DnInputComponent.prototype.onBlur = function () {
        this.onTouchedCallback();
    };
    DnInputComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DnInputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    DnInputComponent.prototype.setDisabled = function () {
        if (this.disabled === '' || this.isDisabled) {
            this.term.disable();
            if (!isNullOrUndefined(this.formControl))
                this.formControl.disable();
        }
    };
    DnInputComponent.prototype.subscribeToResults = function (observable) {
        observable.subscribe();
    };
    DnInputComponent.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    DnInputComponent.prototype.extendMask = function () {
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
    };
    DnInputComponent.prototype.getDatetime = function (onincomplete) {
        return {
            mask: '1/2/y h:s',
            placeholder: 'dd/mm/yyyy hh:mm',
            separator: '/',
            alias: 'dd/mm/yyyy',
            onincomplete: onincomplete,
            showMaskOnHover: false
        };
    };
    DnInputComponent.prototype.subscribeToChangesAndLoadDataFromObservable = function () {
        var observable = this.term.valueChanges
            .debounceTime(100)
            .distinctUntilChanged();
        this.subscribeToResults(observable);
    };
    DnInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-input',
                    template: "\n        <fieldset>\n            <div class='form-group no-margin-bottom'>\n                <label #termLabel\n                       [hidden]=\"labelRow == 0\"\n                       class='control-label col-md-{{labelRow}}'\n                       [ngClass]='labelRowCss'>\n                    <ng-content></ng-content>\n                </label>\n                <div class='col-md-{{inputRow}}' [ngClass]='inputRowCss'>\n                    <input #termInput\n                           [(ngModel)]='value'\n                           type='text'\n                           (blur)='onBlur()'\n                           [formControl]='term'\n                           class='form-control'\n                           (keypress)='keyPress($event)'\n                           [ngClass]=\"inputCss\"/>\n                </div>\n            </div>\n        </fieldset>\n    ",
                    providers: [VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DnInputComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Attribute, args: ['formControlName',] },] },
        { type: undefined, decorators: [{ type: Attribute, args: ['disabled',] },] },
        { type: ElementRef, },
    ]; };
    DnInputComponent.propDecorators = {
        'form': [{ type: Input },],
        'mask': [{ type: Input },],
        'label': [{ type: Input },],
        'name': [{ type: Input },],
        'message': [{ type: Input },],
        'labelRow': [{ type: Input },],
        'inputRow': [{ type: Input },],
        'labelRowCss': [{ type: Input },],
        'inputRowCss': [{ type: Input },],
        'inputCss': [{ type: Input },],
        'number': [{ type: Input },],
        'isDisabled': [{ type: Input },],
        'termLabel': [{ type: ViewChild, args: ['termLabel',] },],
        'termInput': [{ type: ViewChild, args: ['termInput',] },],
        'value': [{ type: Input },],
    };
    return DnInputComponent;
}());
export { DnInputComponent };
//# sourceMappingURL=dn-input.component.js.map