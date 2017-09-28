"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by cabbar on 27.03.2017.
 */
var core_1 = require("@angular/core");
var util_1 = require("util");
var dn_question_required_validator_1 = require("./dn-question-validator/dn-question-required-validator");
var dn_question_select_1 = require("./dn-question/dn-question-select");
var dn_question_textbox_1 = require("./dn-question/dn-question-textbox");
require("inputmask/dist/inputmask/inputmask.extensions");
require("inputmask/dist/inputmask/inputmask.date.extensions");
require("inputmask/dist/inputmask/inputmask.phone.extensions");
var inputmask_numeric_extensions_1 = require("inputmask/dist/inputmask/inputmask.numeric.extensions");
// import Inputmask from 'inputmask/dist/jquery.inputmask.bundle';
var check_1 = require("../../utils/check");
var dn_select2_service_1 = require("../select/select2/dn-select2.service");
var dn_select2_component_1 = require("../select/select2/dn-select2.component");
var DnDynamicFormQuestionComponent = /** @class */ (function () {
    function DnDynamicFormQuestionComponent(service, el) {
        this.service = service;
        this.el = el;
        this.result = [];
        this.changeSelectEvent = new core_1.EventEmitter();
    }
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
    Object.defineProperty(DnDynamicFormQuestionComponent.prototype, "isHide", {
        get: function () {
            return this.form.controls[this.question.key].valid;
        },
        enumerable: true,
        configurable: true
    });
    DnDynamicFormQuestionComponent.prototype.getLabel = function () {
        var label = this.question.label;
        if (util_1.isUndefined(this.question.validator))
            return label;
        this.question.validator.forEach(function (item) {
            if (item instanceof dn_question_required_validator_1.DnQuestionRequiredValidator && item.isActive) {
                label += '<span class=\'label-required\'>*</span>';
                return;
            }
        });
        return label;
    };
    DnDynamicFormQuestionComponent.prototype.getClass = function () {
        var requiredClass = '';
        if (this.question instanceof dn_question_textbox_1.DnTextboxQuestion && this.question.type === 'checkbox') {
            requiredClass += 'dn-checkbox checkbox style-0';
        }
        if (util_1.isUndefined(this.question.validator))
            return requiredClass;
        this.question.validator.forEach(function (item) {
            if (item instanceof dn_question_required_validator_1.DnQuestionRequiredValidator && item.isActive) {
                requiredClass += item.class;
                return;
            }
        });
        return requiredClass;
    };
    DnDynamicFormQuestionComponent.prototype.initData = function () {
        var _this = this;
        var question = this.question;
        if (question instanceof dn_question_select_1.DnSelectQuestion) {
            var url = question.serviceUrl;
            if (util_1.isNullOrUndefined(url) || url === '') {
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
        if (util_1.isNullOrUndefined(url))
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
        if (this.question instanceof dn_question_select_1.DnSelectQuestion) {
            this.question.onSelect(item);
        }
    };
    DnDynamicFormQuestionComponent.prototype.onRemove = function (item) {
        if (util_1.isNullOrUndefined(item))
            return;
        console.log('Item removed: ' + item.name);
        var input = $(this.el.nativeElement).find('input');
        input.val('');
        if (this.question instanceof dn_question_select_1.DnSelectQuestion) {
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
            if (x instanceof dn_question_required_validator_1.DnQuestionRequiredValidator) {
                result = true;
            }
        });
        return result;
    };
    DnDynamicFormQuestionComponent.prototype.initMask = function () {
        var _this = this;
        if (this.question instanceof dn_question_textbox_1.DnTextboxQuestion) {
            var mask = this.question.mask;
            if (mask) {
                this.extendMask();
                var onincomplete = function () {
                    if (_this.form || util_1.isNullOrUndefined(_this.question.key))
                        return;
                    _this.form.controls[_this.question.key].patchValue(null);
                };
                var inputMask = {
                    showMaskOnHover: false,
                    onincomplete: onincomplete
                };
                if (mask) {
                    if (check_1.isString(mask) && (mask === 'dnCurrency' ||
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
                    im = mask === 'dnDatetime' ? new inputmask_numeric_extensions_1.default('datetime', this.getDatetime(onincomplete))
                        : new inputmask_numeric_extensions_1.default(inputMask);
                    im.mask(this.input.nativeElement);
                }
            }
        }
    };
    DnDynamicFormQuestionComponent.prototype.extendMask = function () {
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
    __decorate([
        core_1.ViewChild(dn_select2_component_1.DnSelect2Component)
    ], DnDynamicFormQuestionComponent.prototype, "dnSelect", void 0);
    __decorate([
        core_1.Input()
    ], DnDynamicFormQuestionComponent.prototype, "question", void 0);
    __decorate([
        core_1.Input()
    ], DnDynamicFormQuestionComponent.prototype, "form", void 0);
    __decorate([
        core_1.Input()
    ], DnDynamicFormQuestionComponent.prototype, "result", void 0);
    __decorate([
        core_1.Output()
    ], DnDynamicFormQuestionComponent.prototype, "changeSelectEvent", void 0);
    __decorate([
        core_1.ViewChild('input')
    ], DnDynamicFormQuestionComponent.prototype, "input", void 0);
    DnDynamicFormQuestionComponent = __decorate([
        core_1.Component({
            selector: 'dn-df-question',
            templateUrl: './dn-dynamic-form-question.component.html',
            styleUrls: ['./dn-dynamic-form-question.component.css'],
            providers: [dn_select2_service_1.DnSelect2Service]
        })
    ], DnDynamicFormQuestionComponent);
    return DnDynamicFormQuestionComponent;
}());
exports.DnDynamicFormQuestionComponent = DnDynamicFormQuestionComponent;
