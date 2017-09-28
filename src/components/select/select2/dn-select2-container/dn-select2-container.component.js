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
var check_1 = require("../../../../utils/check");
var common_1 = require("../../../../utils/common");
/**
 * Created by cabbar on 15.05.2017.
 */
var VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DnSelect2ContainerComponent; }),
    multi: true
};
var DnSelect2ContainerComponent = /** @class */ (function () {
    function DnSelect2ContainerComponent(_formControlName, disabled, _el) {
        this.disabled = disabled;
        this._el = _el;
        this.isDisabled = false;
        this.onSelect = new core_1.EventEmitter();
        this.onRemove = new core_1.EventEmitter();
        this.minimumInputLength = 0;
        this.placeholder = this.minimumInputLength === 0 ? 'Seçiniz..' : 'Minimum ' + this.minimumInputLength + ' karakter giriniz';
        this.multiple = false;
        this.labelRow = 4;
        this.inputRow = 8;
        this.number = false;
        this.referenceMode = 'entity';
        this.displaySelect = function (res) { return res.entity['code'] + ' - ' + res.name; };
        this.selectedText = function (res) { return res.entity['code']; };
        this.innerValue = '';
        this.onTouchedCallback = common_1.noop;
        this.onChangeCallback = common_1.noop;
        this.formControlName = _formControlName;
        if (check_1.isNullOrUndefined(this.serviceUrl))
            this.serviceUrl = _formControlName;
    }
    Object.defineProperty(DnSelect2ContainerComponent.prototype, "value", {
        get: function () {
            return this.innerValue;
        },
        set: function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
                // let obj: any = {entity: v};
                // obj.name = v.name;
                // obj.id = v.id;
                // this.termSelect.onItemSelected(obj);
            }
        },
        enumerable: true,
        configurable: true
    });
    DnSelect2ContainerComponent.prototype.getSelect2 = function () {
        return this.termSelect;
    };
    DnSelect2ContainerComponent.prototype.getService = function () {
        return this.termSelect.getService();
    };
    /* getValidatorForm(validators: DnQuestionValidatorBase[]): ValidatorFn[] {
         let data: ValidatorFn[] = [];
         validators.forEach(validator => {
             if (validator instanceof DnQuestionRequiredValidator) {
                 data.push(Validators.required);
             }
         });
         return data;
     }*/
    DnSelect2ContainerComponent.prototype.initializeValidationData = function () {
        this.formErrors = {};
        this.formErrors[this.formControlName] = '';
        this.validationMessages = {};
        this.validationMessages[this.formControlName] = {
            required: 'Lütfen ' + this.termLabel.nativeElement.innerText + ' alanını seçiniz!'
        };
    };
    DnSelect2ContainerComponent.prototype.ngOnInit = function () {
        this.isDisabled = this.disabled === '';
        if (this.form) {
            this.control = this.form.controls[this.formControlName];
            if (check_1.isNullOrUndefined(this.control)) {
                this.form.addControl(this.formControlName, new forms_1.FormControl(null));
                this.control = this.form.controls[this.formControlName];
            }
            if (this.isDisabled)
                this.control.disable();
            // this.initializeValidationData();
            // this.initValidation();
        }
    };
    DnSelect2ContainerComponent.prototype.onBlur = function () {
        this.onTouchedCallback();
    };
    DnSelect2ContainerComponent.prototype.onItemSelected = function (item) {
        this.termSelect.onItemSelected(item);
    };
    DnSelect2ContainerComponent.prototype.onRemoveEvent = function (item) {
        this.onRemove.emit(item);
    };
    DnSelect2ContainerComponent.prototype.onSelectEvent = function (item) {
        this.onSelect.emit(item);
    };
    DnSelect2ContainerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DnSelect2ContainerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    DnSelect2ContainerComponent.prototype.subscribeToResults = function (observable) {
        var _this = this;
        observable.subscribe(function (item) {
            if (!_this.form) {
                return;
            }
            var form = _this.form;
            for (var field in _this.formErrors) {
                if (_this.formErrors.hasOwnProperty(field)) {
                    _this.formErrors[field] = '';
                    var control = form.get(field);
                    if (control && control.dirty && !control.valid) {
                        var messages = _this.validationMessages[field];
                        for (var key in control.errors) {
                            if (control.errors.hasOwnProperty(key)) {
                                _this.formErrors[field] += messages[key] + ' ';
                            }
                        }
                    }
                }
            }
        });
    };
    DnSelect2ContainerComponent.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    DnSelect2ContainerComponent.prototype.css = function () {
        var css = [];
        if (this.inputCss) {
            this.inputCss += ' ' + css.join(' ');
        }
        else {
            this.inputCss = css.join(' ');
        }
    };
    __decorate([
        core_1.Output()
    ], DnSelect2ContainerComponent.prototype, "onSelect", void 0);
    __decorate([
        core_1.Output()
    ], DnSelect2ContainerComponent.prototype, "onRemove", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2ContainerComponent.prototype, "form", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2ContainerComponent.prototype, "minimumInputLength", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2ContainerComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2ContainerComponent.prototype, "multiple", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2ContainerComponent.prototype, "serviceUrl", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2ContainerComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2ContainerComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2ContainerComponent.prototype, "message", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2ContainerComponent.prototype, "labelRow", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2ContainerComponent.prototype, "inputRow", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2ContainerComponent.prototype, "inputRowCss", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2ContainerComponent.prototype, "inputCss", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2ContainerComponent.prototype, "number", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2ContainerComponent.prototype, "referenceMode", void 0);
    __decorate([
        core_1.ViewChild('termLabel')
    ], DnSelect2ContainerComponent.prototype, "termLabel", void 0);
    __decorate([
        core_1.ViewChild('termSelect')
    ], DnSelect2ContainerComponent.prototype, "termSelect", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2ContainerComponent.prototype, "displaySelect", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2ContainerComponent.prototype, "selectedText", void 0);
    DnSelect2ContainerComponent = __decorate([
        core_1.Component({
            selector: 'dn-select2-container',
            exportAs: 'dnSelect2Container',
            template: "\n        <fieldset>\n            <div class='form-group no-margin-bottom'>\n                <label #termLabel\n                       class='control-label col-md-{{labelRow}}'\n                       [ngClass]=\"formErrors && formErrors[formControlName] ? 'dn-error' : null\">\n                    <ng-content></ng-content>\n                </label>\n                <div class='col-md-{{inputRow}}' [ngClass]='inputRowCss'>\n                    <dn-select2 #termSelect\n                                [(ngModel)]='value'\n                                (blur)='onBlur()'\n                                [name]='name'\n                                [serviceUrl]='serviceUrl'\n                                [displaySelect]='displaySelect'\n                                [selectedText]='selectedText'\n                                [referenceMode]='referenceMode'\n                                [multiple]='multiple'\n                                [minimumInputLength]='minimumInputLength'\n                                [placeholder]='placeholder'\n                                (onSelect)='onSelectEvent($event)'\n                                (onRemove)='onRemoveEvent($event)'\n                                [disabled]=\"isDisabled\"\n                                [css]=\"'form-control ' + inputCss\"></dn-select2>\n                    <small *ngIf='formErrors && formErrors[formControlName]' class='dn-error'>\n                        {{ formErrors[formControlName] }}\n                    </small>\n                </div>\n            </div>\n        </fieldset>\n    ",
            styleUrls: ['dn-select2-container.component.scss'],
            providers: [VALUE_ACCESSOR]
        }),
        __param(0, core_1.Attribute('formControlName')),
        __param(1, core_1.Attribute('disabled'))
    ], DnSelect2ContainerComponent);
    return DnSelect2ContainerComponent;
}());
exports.DnSelect2ContainerComponent = DnSelect2ContainerComponent;
