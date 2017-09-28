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
var check_1 = require("../../../utils/check");
/**
 * Created by cabbar on 15.05.2017.
 */
exports.noop = function () {
};
var VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DnTextareaComponent; }),
    multi: true
};
var DnTextareaComponent = /** @class */ (function () {
    function DnTextareaComponent(formControlName, disabled) {
        this.formControlName = formControlName;
        this.disabled = disabled;
        this.term = new forms_1.FormControl();
        this.labelRow = 4;
        this.inputRow = 8;
        this.rows = 1;
        this.innerValue = '';
        this.onTouchedCallback = exports.noop;
        this.onChangeCallback = exports.noop;
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
        if (check_1.isNullOrUndefined(this.form))
            return;
        if (check_1.isNullOrUndefined(this.form.controls[this.formControlName])) {
            this.form.addControl(this.formControlName, new forms_1.FormControl(null));
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
    __decorate([
        core_1.Input()
    ], DnTextareaComponent.prototype, "form", void 0);
    __decorate([
        core_1.Input()
    ], DnTextareaComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input()
    ], DnTextareaComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input()
    ], DnTextareaComponent.prototype, "message", void 0);
    __decorate([
        core_1.Input()
    ], DnTextareaComponent.prototype, "labelRow", void 0);
    __decorate([
        core_1.Input()
    ], DnTextareaComponent.prototype, "inputRow", void 0);
    __decorate([
        core_1.Input()
    ], DnTextareaComponent.prototype, "inputCss", void 0);
    __decorate([
        core_1.Input()
    ], DnTextareaComponent.prototype, "inputRowCss", void 0);
    __decorate([
        core_1.Input()
    ], DnTextareaComponent.prototype, "labelCss", void 0);
    __decorate([
        core_1.Input()
    ], DnTextareaComponent.prototype, "rows", void 0);
    __decorate([
        core_1.ViewChild('termLabel')
    ], DnTextareaComponent.prototype, "termLabel", void 0);
    __decorate([
        core_1.ViewChild('termTextarea')
    ], DnTextareaComponent.prototype, "termTextarea", void 0);
    DnTextareaComponent = __decorate([
        core_1.Component({
            selector: 'dn-textarea',
            template: "\n        <fieldset>\n            <div class='form-group no-margin-bottom'>\n                <label #termLabel\n                       class='control-label col-md-{{labelRow}}'\n                       [ngClass]=\"labelCss\">\n                    <ng-content></ng-content>\n                </label>\n                <div class='col-md-{{inputRow}}' [ngClass]='inputRowCss'>\n          <textarea #termTextarea\n                    [(ngModel)]='value'\n                    type='text'\n                    (blur)='onBlur()'\n                    [formControl]='term'\n                    rows='{{rows}}'\n                    class='form-control'\n                    [ngClass]=\"inputCss\"></textarea>\n                </div>\n            </div>\n        </fieldset>\n    ",
            providers: [VALUE_ACCESSOR]
        }),
        __param(0, core_1.Attribute('formControlName')), __param(1, core_1.Attribute('disabled'))
    ], DnTextareaComponent);
    return DnTextareaComponent;
}());
exports.DnTextareaComponent = DnTextareaComponent;
