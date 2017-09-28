/**
 * Created by cabbar on 27.03.2017.
 */
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { isNullOrUndefined, isUndefined } from 'util';
import { DnQuestionRequiredValidator } from './dn-question-validator/dn-question-required-validator';
import { DnSelectQuestion } from './dn-question/dn-question-select';
import { DnTextboxQuestion } from './dn-question/dn-question-textbox';
import 'inputmask/dist/inputmask/inputmask.extensions';
import 'inputmask/dist/inputmask/inputmask.date.extensions';
import 'inputmask/dist/inputmask/inputmask.phone.extensions';
import Inputmask from 'inputmask/dist/inputmask/inputmask.numeric.extensions';
// import Inputmask from 'inputmask/dist/jquery.inputmask.bundle';
import { isString } from '../../utils/check';
import { DnSelect2Service } from '../select/select2/dn-select2.service';
import { DnSelect2Component } from '../select/select2/dn-select2.component';
var DnDynamicFormQuestionComponent = /** @class */ (function () {
    function DnDynamicFormQuestionComponent(service, el) {
        this.service = service;
        this.el = el;
        this.result = [];
        this.changeSelectEvent = new EventEmitter();
    }
    Object.defineProperty(DnDynamicFormQuestionComponent.prototype, "isHide", {
        get: function () {
            return this.form.controls[this.question.key].valid;
        },
        enumerable: true,
        configurable: true
    });
    DnDynamicFormQuestionComponent.prototype.ngOnInit = function () {
        this.initData();
    };
    DnDynamicFormQuestionComponent.prototype.ngAfterViewInit = function () {
        this.$form = $(this.el.nativeElement).closest('dn-dynamic-form');
        this.initMask();
    };
    DnDynamicFormQuestionComponent.prototype.isValid = function () {
        return this.form.controls[this.question.key].valid;
    };
    DnDynamicFormQuestionComponent.prototype.getLabel = function () {
        var label = this.question.label;
        if (isUndefined(this.question.validator))
            return label;
        this.question.validator.forEach(function (item) {
            if (item instanceof DnQuestionRequiredValidator && item.isActive) {
                label += '<span class=\'label-required\'>*</span>';
                return;
            }
        });
        return label;
    };
    DnDynamicFormQuestionComponent.prototype.getClass = function () {
        var requiredClass = '';
        if (this.question instanceof DnTextboxQuestion && this.question.type === 'checkbox') {
            requiredClass += 'dn-checkbox checkbox style-0';
        }
        if (isUndefined(this.question.validator))
            return requiredClass;
        this.question.validator.forEach(function (item) {
            if (item instanceof DnQuestionRequiredValidator && item.isActive) {
                requiredClass += item.class;
                return;
            }
        });
        return requiredClass;
    };
    DnDynamicFormQuestionComponent.prototype.initData = function () {
        var _this = this;
        var question = this.question;
        if (question instanceof DnSelectQuestion) {
            var url = question.serviceUrl;
            if (isNullOrUndefined(url) || url === '') {
                this.result = question.options;
            }
            else {
                if (url.indexOf('[') > -1 && url.indexOf(']') > -1) {
                    // return;
                    // let id =  url.substring(url.indexOf('[')+1,url.indexOf(']'))
                    // $('#'+id)
                    // url.substring(0,url.indexOf('[')) + 'test' + url.substring(url.indexOf(']')+1,url.length)
                }
                else {
                    this.service.loadDataFromService(url);
                }
                this.listItems = function (term) { return _this.service.listData(term, _this.dnSelect.displaySelect); };
                this.listItemsMax = function (term) {
                    return _this.service.listDataMax(term, 3, _this.dnSelect.displaySelect).map(function (response) {
                        _this.count = response.count;
                        return response.results;
                    });
                };
                this.getItems = function (ids) { return _this.service.getItems(ids); };
                this.entityToIqSelect2Item = function (entity) {
                    return {
                        id: entity.id,
                        name: entity.name,
                        entity: entity
                    };
                };
            }
        }
    };
    DnDynamicFormQuestionComponent.prototype.initDataUrl = function (url, item) {
        var _this = this;
        this.dnSelect.removeSelected();
        this.service.loadDataFromService(url);
        if (isNullOrUndefined(url))
            return;
        this.listItems = function (term) { return _this.service.listData(term, _this.dnSelect.displaySelect); };
        this.listItemsMax = function (term) {
            return _this.service.listDataMax(term, 3, _this.dnSelect.displaySelect).map(function (response) {
                _this.count = response.count;
                return response.results;
            });
        };
        this.getItems = function (ids) { return _this.service.getItems(ids); };
        this.entityToIqSelect2Item = function (entity) {
            return {
                id: entity.id,
                name: entity.name,
                entity: entity
            };
        };
    };
    DnDynamicFormQuestionComponent.prototype.onSelect = function (item) {
        this.changeSelectEvent.emit({
            question: this.question,
            item: item,
        });
        if (this.question instanceof DnSelectQuestion) {
            this.question.onSelect(item);
        }
    };
    DnDynamicFormQuestionComponent.prototype.onRemove = function (item) {
        if (isNullOrUndefined(item))
            return;
        console.log('Item removed: ' + item.name);
        var input = $(this.el.nativeElement).find('input');
        input.val('');
        if (this.question instanceof DnSelectQuestion) {
            this.question.onRemove(item);
        }
    };
    DnDynamicFormQuestionComponent.prototype.isSelectRequiredValidator = function () {
        if (this.$form === undefined)
            return false;
        if (this.$form.bootstrapValidator === undefined)
            return false;
        if (this.question.validator === undefined)
            return false;
        var result = false;
        this.question.validator.forEach(function (x) {
            if (x instanceof DnQuestionRequiredValidator) {
                result = true;
            }
        });
        return result;
    };
    DnDynamicFormQuestionComponent.prototype.initMask = function () {
        var _this = this;
        if (this.question instanceof DnTextboxQuestion) {
            var mask = this.question.mask;
            if (mask) {
                this.extendMask();
                var onincomplete = function () {
                    if (_this.form || isNullOrUndefined(_this.question.key))
                        return;
                    _this.form.controls[_this.question.key].patchValue(null);
                };
                var inputMask = {
                    showMaskOnHover: false,
                    onincomplete: onincomplete
                };
                if (mask) {
                    if (isString(mask) && (mask === 'dnCurrency' ||
                        mask === 'dnDecimal' ||
                        mask === 'dnDatetime' ||
                        mask === 'email' ||
                        mask === 'decimal' ||
                        mask === 'numeric' ||
                        mask === 'integer' ||
                        mask === 'percentage' ||
                        mask.indexOf('dd/') > -1 ||
                        mask.indexOf('datetime') > -1)) {
                        inputMask.alias = mask;
                    }
                    else {
                        inputMask.mask = mask;
                    }
                    var im = void 0;
                    im = mask === 'dnDatetime' ? new Inputmask('datetime', this.getDatetime(onincomplete))
                        : new Inputmask(inputMask);
                    im.mask(this.input.nativeElement);
                }
            }
        }
    };
    DnDynamicFormQuestionComponent.prototype.extendMask = function () {
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
    DnDynamicFormQuestionComponent.prototype.getDatetime = function (onincomplete) {
        return {
            mask: '1/2/y h:s',
            placeholder: 'dd/mm/yyyy hh:mm',
            separator: '/',
            alias: 'dd/mm/yyyy',
            onincomplete: onincomplete,
            showMaskOnHover: false
        };
    };
    DnDynamicFormQuestionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-df-question',
                    templateUrl: './dn-dynamic-form-question.component.html',
                    styles: ["\n        label .label-required {\n            color: red;\n        }\n\n        .dn-checkbox {\n            visibility: visible !important;\n            margin: 2px;\n        }\n    "],
                    providers: [DnSelect2Service]
                },] },
    ];
    /** @nocollapse */
    DnDynamicFormQuestionComponent.ctorParameters = function () { return [
        { type: DnSelect2Service, },
        { type: ElementRef, },
    ]; };
    DnDynamicFormQuestionComponent.propDecorators = {
        'dnSelect': [{ type: ViewChild, args: [DnSelect2Component,] },],
        'question': [{ type: Input },],
        'form': [{ type: Input },],
        'result': [{ type: Input },],
        'changeSelectEvent': [{ type: Output },],
        'input': [{ type: ViewChild, args: ['input',] },],
    };
    return DnDynamicFormQuestionComponent;
}());
export { DnDynamicFormQuestionComponent };
//# sourceMappingURL=dn-dynamic-form-question.component.js.map