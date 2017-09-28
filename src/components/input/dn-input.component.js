"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
require("inputmask/dist/inputmask/inputmask.date.extensions");
require("inputmask/dist/inputmask/inputmask.extensions");
var inputmask_numeric_extensions_1 = require("inputmask/dist/inputmask/inputmask.numeric.extensions");
require("inputmask/dist/inputmask/inputmask.phone.extensions");
var check_1 = require("../../utils/check");
var common_1 = require("../../utils/common");
/**
 * Created by cabbar on 15.05.2017.
 */
var VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DnInputComponent; }),
    multi: true
};
var DnInputComponent = /** @class */ (function () {
    function DnInputComponent(formControlName, disabled, el) {
        this.formControlName = formControlName;
        this.disabled = disabled;
        this.el = el;
        this.term = new forms_1.FormControl();
        this.labelRow = 4;
        this.inputRow = 8;
        this.labelRowCss = '';
        this.inputRowCss = '';
        this.inputCss = '';
        this.number = false;
        this.isDisabled = false;
        this.innerValue = '';
        this.validationMessages = {};
        this.onTouchedCallback = common_1.noop;
        this.onChangeCallback = common_1.noop;
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
            if (ths && ths.form || check_1.isNullOrUndefined(ths.formControlName))
                return;
            ths.form.controls[ths.formControlName].patchValue(null);
            ths.value = null;
        };
        var inputMask = {
            showMaskOnHover: false,
            onincomplete: onincomplete
        };
        if (this.mask) {
            if (check_1.isString(this.mask) && (this.mask === 'dnCurrency' ||
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
            var im = this.mask === 'dnDatetime' ? new inputmask_numeric_extensions_1.default('datetime', this.getDatetime(onincomplete)) : new inputmask_numeric_extensions_1.default(inputMask);
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
        if (check_1.isNullOrUndefined(this.form))
            return;
        if (check_1.isNullOrUndefined(this.form.controls[this.formControlName])) {
            this.form.addControl(this.formControlName, new forms_1.FormControl(null));
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
            if (!check_1.isNullOrUndefined(this.formControl))
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
        inputmask_numeric_extensions_1.default.extendAliases({
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
        inputmask_numeric_extensions_1.default.extendAliases({
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
    __decorate([
        core_1.Input()
    ], DnInputComponent.prototype, "form", void 0);
    __decorate([
        core_1.Input()
    ], DnInputComponent.prototype, "mask", void 0);
    __decorate([
        core_1.Input()
    ], DnInputComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input()
    ], DnInputComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input()
    ], DnInputComponent.prototype, "message", void 0);
    __decorate([
        core_1.Input()
    ], DnInputComponent.prototype, "labelRow", void 0);
    __decorate([
        core_1.Input()
    ], DnInputComponent.prototype, "inputRow", void 0);
    __decorate([
        core_1.Input()
    ], DnInputComponent.prototype, "labelRowCss", void 0);
    __decorate([
        core_1.Input()
    ], DnInputComponent.prototype, "inputRowCss", void 0);
    __decorate([
        core_1.Input()
    ], DnInputComponent.prototype, "inputCss", void 0);
    __decorate([
        core_1.Input()
    ], DnInputComponent.prototype, "number", void 0);
    __decorate([
        core_1.Input()
    ], DnInputComponent.prototype, "isDisabled", void 0);
    __decorate([
        core_1.ViewChild('termLabel')
    ], DnInputComponent.prototype, "termLabel", void 0);
    __decorate([
        core_1.ViewChild('termInput')
    ], DnInputComponent.prototype, "termInput", void 0);
    __decorate([
        core_1.Input()
    ], DnInputComponent.prototype, "value", null);
    DnInputComponent = __decorate([
        core_1.Component({
            selector: 'dn-input',
            template: "\n        <fieldset>\n            <div class='form-group no-margin-bottom'>\n                <label #termLabel\n                       [hidden]=\"labelRow == 0\"\n                       class='control-label col-md-{{labelRow}}'\n                       [ngClass]='labelRowCss'>\n                    <ng-content></ng-content>\n                </label>\n                <div class='col-md-{{inputRow}}' [ngClass]='inputRowCss'>\n                    <input #termInput\n                           [(ngModel)]='value'\n                           type='text'\n                           (blur)='onBlur()'\n                           [formControl]='term'\n                           class='form-control'\n                           (keypress)='keyPress($event)'\n                           [ngClass]=\"inputCss\"/>\n                </div>\n            </div>\n        </fieldset>\n    ",
            styleUrls: ['dn-input.component.scss'],
            providers: [VALUE_ACCESSOR]
        }),
        __param(0, core_1.Attribute('formControlName')),
        __param(1, core_1.Attribute('disabled'))
    ], DnInputComponent);
    return DnInputComponent;
}());
exports.DnInputComponent = DnInputComponent;
