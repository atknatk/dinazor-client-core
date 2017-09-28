import { Attribute, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNullOrUndefined } from '../../../../utils/check';
import { noop } from '../../../../utils/common';
/**
 * Created by cabbar on 15.05.2017.
 */
var VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DnSelect2ContainerComponent; }),
    multi: true
};
var DnSelect2ContainerComponent = /** @class */ (function () {
    function DnSelect2ContainerComponent(_formControlName, disabled, _el) {
        this.disabled = disabled;
        this._el = _el;
        this.isDisabled = false;
        this.onSelect = new EventEmitter();
        this.onRemove = new EventEmitter();
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
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.formControlName = _formControlName;
        if (isNullOrUndefined(this.serviceUrl))
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
    /*private css(validators: DnQuestionValidatorBase[]) {
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
    /*  private initValidation() {
          if (this.validators && this.validators.length > 0 && !isNullOrUndefined(this.control)) {
              this.form.controls[this.formControlName].setValidators(this.getValidatorForm(this.validators));
              this.css(this.validators);
              this.subscribeToChangesAndLoadDataFromObservable();
          }
      }

      private subscribeToChangesAndLoadDataFromObservable() {
          if (this.control) {
              let observable = this.control.valueChanges
                  .debounceTime(100)
                  .distinctUntilChanged();
              this.subscribeToResults(observable);

          }
      }*/
    DnSelect2ContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-select2-container',
                    exportAs: 'dnSelect2Container',
                    template: "\n        <fieldset>\n            <div class='form-group no-margin-bottom'>\n                <label #termLabel\n                       class='control-label col-md-{{labelRow}}'\n                       [ngClass]=\"formErrors && formErrors[formControlName] ? 'dn-error' : null\">\n                    <ng-content></ng-content>\n                </label>\n                <div class='col-md-{{inputRow}}' [ngClass]='inputRowCss'>\n                    <dn-select2 #termSelect\n                                [(ngModel)]='value'\n                                (blur)='onBlur()'\n                                [name]='name'\n                                [serviceUrl]='serviceUrl'\n                                [displaySelect]='displaySelect'\n                                [selectedText]='selectedText'\n                                [referenceMode]='referenceMode'\n                                [multiple]='multiple'\n                                [minimumInputLength]='minimumInputLength'\n                                [placeholder]='placeholder'\n                                (onSelect)='onSelectEvent($event)'\n                                (onRemove)='onRemoveEvent($event)'\n                                [disabled]=\"isDisabled\"\n                                [css]=\"'form-control ' + inputCss\"></dn-select2>\n                    <small *ngIf='formErrors && formErrors[formControlName]' class='dn-error'>\n                        {{ formErrors[formControlName] }}\n                    </small>\n                </div>\n            </div>\n        </fieldset>\n    ",
                    providers: [VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DnSelect2ContainerComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Attribute, args: ['formControlName',] },] },
        { type: undefined, decorators: [{ type: Attribute, args: ['disabled',] },] },
        { type: ElementRef, },
    ]; };
    DnSelect2ContainerComponent.propDecorators = {
        'onSelect': [{ type: Output },],
        'onRemove': [{ type: Output },],
        'form': [{ type: Input },],
        'minimumInputLength': [{ type: Input },],
        'placeholder': [{ type: Input },],
        'multiple': [{ type: Input },],
        'serviceUrl': [{ type: Input },],
        'label': [{ type: Input },],
        'name': [{ type: Input },],
        'message': [{ type: Input },],
        'labelRow': [{ type: Input },],
        'inputRow': [{ type: Input },],
        'inputRowCss': [{ type: Input },],
        'inputCss': [{ type: Input },],
        'number': [{ type: Input },],
        'referenceMode': [{ type: Input },],
        'termLabel': [{ type: ViewChild, args: ['termLabel',] },],
        'termSelect': [{ type: ViewChild, args: ['termSelect',] },],
        'displaySelect': [{ type: Input },],
        'selectedText': [{ type: Input },],
    };
    return DnSelect2ContainerComponent;
}());
export { DnSelect2ContainerComponent };
//# sourceMappingURL=dn-select2-container.component.js.map