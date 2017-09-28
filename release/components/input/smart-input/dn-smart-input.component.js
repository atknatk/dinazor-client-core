import { Attribute, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import 'inputmask/dist/inputmask/inputmask.date.extensions';
import 'inputmask/dist/inputmask/inputmask.extensions';
import Inputmask from 'inputmask/dist/inputmask/inputmask.numeric.extensions';
import 'inputmask/dist/inputmask/inputmask.phone.extensions';
import { isNullOrUndefined, isString } from '../../../utils/check';
import { noop } from '../../../utils/common';
/**
 * Created by cabbar on 15.05.2017.
 */
var VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DnSmartInputComponent; }),
    multi: true
};
var DnSmartInputComponent = /** @class */ (function () {
    function DnSmartInputComponent(formControlName, disabled, el) {
        this.formControlName = formControlName;
        this.disabled = disabled;
        this.el = el;
        this.term = new FormControl();
        this.labelShow = true;
        this.col = 12;
        this.placeholder = '';
        this.inputCss = '';
        this.number = false;
        this.isDisabled = false;
        this.innerValue = '';
        this.formErrors = {};
        this.validationMessages = {};
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(DnSmartInputComponent.prototype, "nativeElement", {
        get: function () {
            return this.el.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DnSmartInputComponent.prototype, "value", {
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
    DnSmartInputComponent.prototype.css = function () {
        var css = [];
        if (this.inputCss) {
            this.inputCss += ' ' + css.join(' ');
        }
        else {
            this.inputCss = css.join(' ');
        }
    };
    DnSmartInputComponent.prototype.initMask = function () {
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
    DnSmartInputComponent.prototype.keyPress = function (event) {
        if (this.number) {
            var pattern = /[0-9\+\-\ ]/;
            var inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                // invalid character, prevent input
                event.preventDefault();
            }
        }
    };
    DnSmartInputComponent.prototype.ngOnInit = function () {
        this.setDisabled();
        this.initMask();
        if (isNullOrUndefined(this.form))
            return;
        if (isNullOrUndefined(this.form.controls[this.formControlName])) {
            this.form.addControl(this.formControlName, new FormControl(null));
        }
        this.formControl = this.form.get(this.formControlName);
    };
    DnSmartInputComponent.prototype.onBlur = function () {
        this.onTouchedCallback();
    };
    DnSmartInputComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DnSmartInputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    DnSmartInputComponent.prototype.setDisabled = function () {
        if (this.disabled === '' || this.isDisabled) {
            this.isDisabled = true;
            this.term.disable();
            if (!isNullOrUndefined(this.formControl))
                this.formControl.disable();
        }
    };
    DnSmartInputComponent.prototype.subscribeToResults = function (observable) {
        observable.subscribe();
    };
    DnSmartInputComponent.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    DnSmartInputComponent.prototype.extendMask = function () {
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
    DnSmartInputComponent.prototype.getDatetime = function (onincomplete) {
        return {
            mask: '1/2/y h:s',
            placeholder: 'dd/mm/yyyy hh:mm',
            separator: '/',
            alias: 'dd/mm/yyyy',
            onincomplete: onincomplete,
            showMaskOnHover: false
        };
    };
    DnSmartInputComponent.prototype.subscribeToChangesAndLoadDataFromObservable = function () {
        var observable = this.term.valueChanges
            .debounceTime(100)
            .distinctUntilChanged();
        this.subscribeToResults(observable);
    };
    DnSmartInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-smart-input',
                    template: "\n        <section class=\"col col-{{col}}\">\n            <label #termLabel class=\"label\">\n                <ng-content></ng-content>\n            </label>\n            <label class=\"input\" [ngClass]=\"isDisabled ? 'state-disabled':''\">\n                <i *ngIf=\"icon\" class=\"icon-append\" [ngClass]=\"icon\"></i>\n                <input #termInput\n                       [(ngModel)]='value'\n                       type=\"text\"\n                       (blur)='onBlur()'\n                       [formControl]='term'\n                       (keypress)='keyPress($event)'\n                       class=\"input-sm\"\n                       name=\"{{formControlName}}\"\n                       placeholder=\"{{placeholder}}\">\n            </label>\n        </section>",
                    providers: [VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DnSmartInputComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Attribute, args: ['formControlName',] },] },
        { type: undefined, decorators: [{ type: Attribute, args: ['disabled',] },] },
        { type: ElementRef, },
    ]; };
    DnSmartInputComponent.propDecorators = {
        'form': [{ type: Input },],
        'mask': [{ type: Input },],
        'labelShow': [{ type: Input },],
        'name': [{ type: Input },],
        'message': [{ type: Input },],
        'col': [{ type: Input },],
        'placeholder': [{ type: Input },],
        'icon': [{ type: Input },],
        'inputCss': [{ type: Input },],
        'number': [{ type: Input },],
        'isDisabled': [{ type: Input },],
        'termLabel': [{ type: ViewChild, args: ['termLabel',] },],
        'termInput': [{ type: ViewChild, args: ['termInput',] },],
        'value': [{ type: Input },],
    };
    return DnSmartInputComponent;
}());
export { DnSmartInputComponent };
//# sourceMappingURL=dn-smart-input.component.js.map