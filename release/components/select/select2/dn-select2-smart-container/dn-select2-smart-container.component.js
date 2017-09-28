import { Attribute, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNullOrUndefined } from '../../../../utils/check';
import { noop } from '../../../../utils/common';
/**
 * Created by cabbar on 15.05.2017.
 */
var VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DnSelect2SmartContainerComponent; }),
    multi: true
};
var DnSelect2SmartContainerComponent = /** @class */ (function () {
    function DnSelect2SmartContainerComponent(formControlName, disabled, _el) {
        this.formControlName = formControlName;
        this.disabled = disabled;
        this._el = _el;
        this.onSelect = new EventEmitter();
        this.onRemove = new EventEmitter();
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
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.displaySelect = function (res) { return res.entity['code'] + ' - ' + res.name; };
        this.selectedText = function (res) { return res.entity['code']; };
        if (isNullOrUndefined(this.serviceUrl))
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
            if (isNullOrUndefined(this.control)) {
                this.form.addControl(this.formControlName, new FormControl(null));
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
    DnSelect2SmartContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-select2-smart',
                    template: "\n        <section class=\"dn-select2-smart-container col col-{{col}}\">\n            <label *ngIf=\"hasLabel\" #termLabel class=\"label\">\n                <ng-content></ng-content>\n            </label>\n            <label class=\"input\"> <i *ngIf=\"icon\" class=\"icon-append\" [ngClass]=\"icon\"></i>\n                <label class=\"input\">\n                    <dn-select2 #termSelect\n                                [(ngModel)]='value'\n                                (blur)='onBlur()'\n                                [name]='name'\n                                [serviceUrl]='serviceUrl'\n                                [displaySelect]='displaySelect'\n                                [selectedText]='selectedText'\n                                [referenceMode]='referenceMode'\n                                [multiple]='false'\n                                [minimumInputLength]='minimumInputLength'\n                                [placeholder]='placeholder'\n                                (onSelect)='onSelectEvent($event)'\n                                (onRemove)='onRemoveEvent($event)'\n                                [disabled]=\"isDisabled\"\n                                [css]=\"'input-sm select2-smart-selection-container ' + inputCss\"></dn-select2>\n                </label>\n            </label>\n        </section>",
                    styles: ["\n        .select2-smart-selection-container {\n            padding: 0px 30px 0px 2px !important;\n            min-height: 28px !important;\n            border-color: #BDBDBD !important;\n            border-width: 1px !important;\n            border-style: solid !important;\n        }\n\n\n        .dn-select2-smart-container .select2-input {\n            margin-top: 0 !important;\n        }\n\n\n        .dn-select2-smart-container input {\n            height: 28px;\n            line-height: 28px;\n\n        }\n\n\n        .dn-select2-smart-container .simple-selection input{\n            left: 2px !important;\n            background: #fff !important;\n            color: #404040;\n            appearance: normal;\n            -moz-appearance: none;\n            -webkit-appearance: none;\n            outline: 0;\n            height: 28px;\n            line-height: 28px;\n            /*padding: 5px 10px;*/\n            width: 100%;\n            font-size: 12px !important;\n            line-height: 1.5 !important;;\n        }\n\n\n        .dn-select2-smart-container .select2-results-container {\n            margin-top: -1px !important;\n            overflow-x: hidden;\n        }\n\n        .dn-select2-smart-container .results-msg {\n            margin-top: -1px !important;\n            overflow-x: hidden;\n        }\n\n\n\n        .dn-select2-smart-container .select2-container .search-focused {\n            border-color: #3276B1 !important;;\n            -webkit-box-shadow: none !important;\n            box-shadow: none !important;;\n        }\n\n\n        .dn-select2-smart-container a {\n            color: #404040;\n        }\n\n        .dn-select2-smart-container  .select2-selected {\n            left: 2px !important;\n            background: #fff !important;\n            color: #404040;\n            appearance: normal;\n            -moz-appearance: none;\n            -webkit-appearance: none;\n            outline: 0;\n            width: 100%;\n            font-size: 12px !important;\n            line-height: 1.5 !important;;\n        }\n\n        .dn-select2-smart-container  .simple-selection .select2-selected{\n            padding-top: 4px !important;\n        }\n    "],
                    encapsulation: ViewEncapsulation.None,
                    providers: [VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DnSelect2SmartContainerComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Attribute, args: ['formControlName',] },] },
        { type: undefined, decorators: [{ type: Attribute, args: ['disabled',] },] },
        { type: ElementRef, },
    ]; };
    DnSelect2SmartContainerComponent.propDecorators = {
        'onSelect': [{ type: Output },],
        'onRemove': [{ type: Output },],
        'form': [{ type: Input },],
        'minimumInputLength': [{ type: Input },],
        'placeholder': [{ type: Input },],
        'serviceUrl': [{ type: Input },],
        'label': [{ type: Input },],
        'name': [{ type: Input },],
        'message': [{ type: Input },],
        'labelRow': [{ type: Input },],
        'inputRow': [{ type: Input },],
        'col': [{ type: Input },],
        'icon': [{ type: Input },],
        'inputCss': [{ type: Input },],
        'number': [{ type: Input },],
        'referenceMode': [{ type: Input },],
        'hasLabel': [{ type: Input },],
        'isDisabled': [{ type: Input },],
        'termLabel': [{ type: ViewChild, args: ['termLabel',] },],
        'termSelect': [{ type: ViewChild, args: ['termSelect',] },],
        'displaySelect': [{ type: Input },],
        'selectedText': [{ type: Input },],
    };
    return DnSelect2SmartContainerComponent;
}());
export { DnSelect2SmartContainerComponent };
//# sourceMappingURL=dn-select2-smart-container.component.js.map