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
    useExisting: core_1.forwardRef(function () { return DnSelect2SmartContainerComponent; }),
    multi: true
};
var DnSelect2SmartContainerComponent = /** @class */ (function () {
    function DnSelect2SmartContainerComponent(formControlName, disabled, _el) {
        this.formControlName = formControlName;
        this.disabled = disabled;
        this._el = _el;
        this.onSelect = new core_1.EventEmitter();
        this.onRemove = new core_1.EventEmitter();
        this.minimumInputLength = 0;
        this.placeholder = this.minimumInputLength === 0 ? 'Seçiniz..' : 'Minimum ' + this.minimumInputLength + ' karakter giriniz';
        this.labelRow = 4;
        this.inputRow = 8;
        this.col = 12;
        this.number = false;
        this.referenceMode = 'entity';
        this.hasLabel = true;
        this.isDisabled = false;
        this.innerValue = '';
        this.onTouchedCallback = common_1.noop;
        this.onChangeCallback = common_1.noop;
        this.displaySelect = function (res) { return res.entity['code'] + ' - ' + res.name; };
        this.selectedText = function (res) { return res.entity['code']; };
        if (check_1.isNullOrUndefined(this.serviceUrl))
            this.serviceUrl = formControlName;
    }
    Object.defineProperty(DnSelect2SmartContainerComponent.prototype, "value", {
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
    DnSelect2SmartContainerComponent.prototype.getSelect2 = function () {
        return this.termSelect;
    };
    DnSelect2SmartContainerComponent.prototype.getService = function () {
        return this.termSelect.getService();
    };
    DnSelect2SmartContainerComponent.prototype.initializeValidationData = function () {
        if (this.termLabel && this.termLabel.nativeElement) {
            this.formErrors = {};
            this.formErrors[this.formControlName] = '';
            this.validationMessages = {};
            this.validationMessages[this.formControlName] = {
                required: 'Lütfen ' + this.termLabel.nativeElement.innerText + ' alanını seçiniz!'
            };
        }
    };
    DnSelect2SmartContainerComponent.prototype.ngOnInit = function () {
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
    DnSelect2SmartContainerComponent.prototype.onBlur = function () {
        this.onTouchedCallback();
    };
    DnSelect2SmartContainerComponent.prototype.onItemSelected = function (item) {
        this.termSelect.onItemSelected(item);
    };
    DnSelect2SmartContainerComponent.prototype.onRemoveEvent = function (item) {
        this.onRemove.emit(item);
    };
    DnSelect2SmartContainerComponent.prototype.onSelectEvent = function (item) {
        this.onSelect.emit(item);
    };
    DnSelect2SmartContainerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DnSelect2SmartContainerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    DnSelect2SmartContainerComponent.prototype.subscribeToResults = function (observable) {
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
    DnSelect2SmartContainerComponent.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    /* private initValidation() {
         if (this.validators && this.validators.length > 0 && !isNullOrUndefined(this.control)) {
             this.form.controls[this.formControlName].setValidators(this.getValidatorForm(this.validators));
             this.css(this.validators);
             this.subscribeToChangesAndLoadDataFromObservable();
         }
     }*/
    DnSelect2SmartContainerComponent.prototype.css = function () {
        var css = [];
        if (this.inputCss) {
            this.inputCss += ' ' + css.join(' ');
        }
        else {
            this.inputCss = css.join(' ');
        }
    };
    DnSelect2SmartContainerComponent.prototype.subscribeToChangesAndLoadDataFromObservable = function () {
        if (this.control) {
            var observable = this.control.valueChanges
                .debounceTime(100)
                .distinctUntilChanged();
            this.subscribeToResults(observable);
        }
    };
    __decorate([
        core_1.Output()
    ], DnSelect2SmartContainerComponent.prototype, "onSelect", void 0);
    __decorate([
        core_1.Output()
    ], DnSelect2SmartContainerComponent.prototype, "onRemove", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2SmartContainerComponent.prototype, "form", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2SmartContainerComponent.prototype, "minimumInputLength", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2SmartContainerComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2SmartContainerComponent.prototype, "serviceUrl", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2SmartContainerComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2SmartContainerComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2SmartContainerComponent.prototype, "message", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2SmartContainerComponent.prototype, "labelRow", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2SmartContainerComponent.prototype, "inputRow", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2SmartContainerComponent.prototype, "col", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2SmartContainerComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2SmartContainerComponent.prototype, "inputCss", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2SmartContainerComponent.prototype, "number", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2SmartContainerComponent.prototype, "referenceMode", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2SmartContainerComponent.prototype, "hasLabel", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2SmartContainerComponent.prototype, "isDisabled", void 0);
    __decorate([
        core_1.ViewChild('termLabel')
    ], DnSelect2SmartContainerComponent.prototype, "termLabel", void 0);
    __decorate([
        core_1.ViewChild('termSelect')
    ], DnSelect2SmartContainerComponent.prototype, "termSelect", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2SmartContainerComponent.prototype, "displaySelect", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2SmartContainerComponent.prototype, "selectedText", void 0);
    DnSelect2SmartContainerComponent = __decorate([
        core_1.Component({
            selector: 'dn-select2-smart',
            template: "\n        <section class=\"dn-select2-smart-container col col-{{col}}\">\n            <label *ngIf=\"hasLabel\" #termLabel class=\"label\">\n                <ng-content></ng-content>\n            </label>\n            <label class=\"input\"> <i *ngIf=\"icon\" class=\"icon-append\" [ngClass]=\"icon\"></i>\n                <label class=\"input\">\n                    <dn-select2 #termSelect\n                                [(ngModel)]='value'\n                                (blur)='onBlur()'\n                                [name]='name'\n                                [serviceUrl]='serviceUrl'\n                                [displaySelect]='displaySelect'\n                                [selectedText]='selectedText'\n                                [referenceMode]='referenceMode'\n                                [multiple]='false'\n                                [minimumInputLength]='minimumInputLength'\n                                [placeholder]='placeholder'\n                                (onSelect)='onSelectEvent($event)'\n                                (onRemove)='onRemoveEvent($event)'\n                                [disabled]=\"isDisabled\"\n                                [css]=\"'input-sm select2-smart-selection-container ' + inputCss\"></dn-select2>\n                </label>\n            </label>\n        </section>",
            styleUrls: ['dn-select2-smart-container.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [VALUE_ACCESSOR]
        }),
        __param(0, core_1.Attribute('formControlName')),
        __param(1, core_1.Attribute('disabled'))
    ], DnSelect2SmartContainerComponent);
    return DnSelect2SmartContainerComponent;
}());
exports.DnSelect2SmartContainerComponent = DnSelect2SmartContainerComponent;
