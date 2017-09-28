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
var check_1 = require("../../../utils/check");
var common_1 = require("../../../utils/common");
/**
 * Created by cabbar on 15.05.2017.
 */
var VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DnSmartInputComponent; }),
    multi: true
};
var DnSmartInputComponent = /** @class */ (function () {
    function DnSmartInputComponent(formControlName, disabled, el) {
        this.formControlName = formControlName;
        this.disabled = disabled;
        this.el = el;
        this.term = new forms_1.FormControl();
        this.labelShow = true;
        this.col = 12;
        this.placeholder = '';
        this.inputCss = '';
        this.number = false;
        this.isDisabled = false;
        this.innerValue = '';
        this.formErrors = {};
        this.validationMessages = {};
        this.onTouchedCallback = common_1.noop;
        this.onChangeCallback = common_1.noop;
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
        if (check_1.isNullOrUndefined(this.form))
            return;
        if (check_1.isNullOrUndefined(this.form.controls[this.formControlName])) {
            this.form.addControl(this.formControlName, new forms_1.FormControl(null));
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
            if (!check_1.isNullOrUndefined(this.formControl))
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
    __decorate([
        core_1.Input()
    ], DnSmartInputComponent.prototype, "form", void 0);
    __decorate([
        core_1.Input()
    ], DnSmartInputComponent.prototype, "mask", void 0);
    __decorate([
        core_1.Input()
    ], DnSmartInputComponent.prototype, "labelShow", void 0);
    __decorate([
        core_1.Input()
    ], DnSmartInputComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input()
    ], DnSmartInputComponent.prototype, "message", void 0);
    __decorate([
        core_1.Input()
    ], DnSmartInputComponent.prototype, "col", void 0);
    __decorate([
        core_1.Input()
    ], DnSmartInputComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input()
    ], DnSmartInputComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input()
    ], DnSmartInputComponent.prototype, "inputCss", void 0);
    __decorate([
        core_1.Input()
    ], DnSmartInputComponent.prototype, "number", void 0);
    __decorate([
        core_1.Input()
    ], DnSmartInputComponent.prototype, "isDisabled", void 0);
    __decorate([
        core_1.ViewChild('termLabel')
    ], DnSmartInputComponent.prototype, "termLabel", void 0);
    __decorate([
        core_1.ViewChild('termInput')
    ], DnSmartInputComponent.prototype, "termInput", void 0);
    __decorate([
        core_1.Input()
    ], DnSmartInputComponent.prototype, "value", null);
    DnSmartInputComponent = __decorate([
        core_1.Component({
            selector: 'dn-smart-input',
            template: "\n        <section class=\"col col-{{col}}\">\n            <label #termLabel class=\"label\">\n                <ng-content></ng-content>\n            </label>\n            <label class=\"input\" [ngClass]=\"isDisabled ? 'state-disabled':''\">\n                <i *ngIf=\"icon\" class=\"icon-append\" [ngClass]=\"icon\"></i>\n                <input #termInput\n                       [(ngModel)]='value'\n                       type=\"text\"\n                       (blur)='onBlur()'\n                       [formControl]='term'\n                       (keypress)='keyPress($event)'\n                       class=\"input-sm\"\n                       name=\"{{formControlName}}\"\n                       placeholder=\"{{placeholder}}\">\n            </label>\n        </section>",
            providers: [VALUE_ACCESSOR]
        }),
        __param(0, core_1.Attribute('formControlName')), __param(1, core_1.Attribute('disabled'))
    ], DnSmartInputComponent);
    return DnSmartInputComponent;
}());
exports.DnSmartInputComponent = DnSmartInputComponent;
