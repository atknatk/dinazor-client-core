import { Attribute, Component, forwardRef, Input, ViewChild } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNullOrUndefined } from '../../../utils/check';
import { noop } from '../../../utils/common';
/**
 * Created by cabbar on 15.05.2017.
 */
var VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DnTextareaComponent; }),
    multi: true
};
var DnTextareaComponent = /** @class */ (function () {
    function DnTextareaComponent(formControlName, disabled) {
        this.formControlName = formControlName;
        this.disabled = disabled;
        this.term = new FormControl();
        this.labelRow = 4;
        this.inputRow = 8;
        this.rows = 1;
        this.innerValue = '';
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        if (disabled === '')
            this.term.disable();
    }
    Object.defineProperty(DnTextareaComponent.prototype, "value", {
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
    ;
    DnTextareaComponent.prototype.css = function () {
        var css = [];
        if (this.inputCss) {
            this.inputCss += ' ' + css.join(' ');
        }
        else {
            this.inputCss = css.join(' ');
        }
    };
    DnTextareaComponent.prototype.ngOnInit = function () {
        if (isNullOrUndefined(this.form))
            return;
        if (isNullOrUndefined(this.form.controls[this.formControlName])) {
            this.form.addControl(this.formControlName, new FormControl(null));
        }
    };
    DnTextareaComponent.prototype.onBlur = function () {
        this.onTouchedCallback();
    };
    DnTextareaComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DnTextareaComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    DnTextareaComponent.prototype.subscribeToResults = function (observable) {
        observable.subscribe();
    };
    DnTextareaComponent.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    DnTextareaComponent.prototype.subscribeToChangesAndLoadDataFromObservable = function () {
        var observable = this.term.valueChanges
            .debounceTime(100)
            .distinctUntilChanged();
        this.subscribeToResults(observable);
    };
    DnTextareaComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-textarea',
                    template: "\n        <fieldset>\n            <div class='form-group no-margin-bottom'>\n                <label #termLabel\n                       class='control-label col-md-{{labelRow}}'\n                       [ngClass]=\"labelCss\">\n                    <ng-content></ng-content>\n                </label>\n                <div class='col-md-{{inputRow}}' [ngClass]='inputRowCss'>\n          <textarea #termTextarea\n                    [(ngModel)]='value'\n                    type='text'\n                    (blur)='onBlur()'\n                    [formControl]='term'\n                    rows='{{rows}}'\n                    class='form-control'\n                    [ngClass]=\"inputCss\"></textarea>\n                </div>\n            </div>\n        </fieldset>\n    ",
                    providers: [VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DnTextareaComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Attribute, args: ['formControlName',] },] },
        { type: undefined, decorators: [{ type: Attribute, args: ['disabled',] },] },
    ]; };
    DnTextareaComponent.propDecorators = {
        'form': [{ type: Input },],
        'label': [{ type: Input },],
        'name': [{ type: Input },],
        'message': [{ type: Input },],
        'labelRow': [{ type: Input },],
        'inputRow': [{ type: Input },],
        'inputCss': [{ type: Input },],
        'inputRowCss': [{ type: Input },],
        'labelCss': [{ type: Input },],
        'rows': [{ type: Input },],
        'termLabel': [{ type: ViewChild, args: ['termLabel',] },],
        'termTextarea': [{ type: ViewChild, args: ['termTextarea',] },],
    };
    return DnTextareaComponent;
}());
export { DnTextareaComponent };
//# sourceMappingURL=dn-textarea.component.js.map