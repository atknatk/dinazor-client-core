"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by cabbar on 12.04.2017.
 */
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Rx_1 = require("rxjs/Rx");
var util_1 = require("util");
var check_1 = require("../../../utils/check");
var dn_select2_messages_1 = require("./dn-select2-messages");
var dn_select2_service_1 = require("./dn-select2.service");
var common_1 = require("../../../utils/common");
var KEY_CODE_DOWN_ARROW = 40;
var KEY_CODE_UP_ARROW = 38;
var KEY_CODE_ENTER = 13;
var KEY_CODE_TAB = 9;
var KEY_CODE_DELETE = 8;
var VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DnSelect2Component; }),
    multi: true
};
var DnSelect2Component = /** @class */ (function () {
    function DnSelect2Component(service, el) {
        this.service = service;
        this.el = el;
        this.MORE_RESULTS_MSG = 'Toplam ' + dn_select2_messages_1.DnSelect2Messages.TOTAL_COUNT_VAR + ' sounçtan ' + dn_select2_messages_1.DnSelect2Messages.PARTIAL_COUNT_VAR +
            ' tanesi gösteriliyor. Daha doğru sonuç görüntülemek için aramanızı daraltın.';
        this.NO_RESULTS_MSG = 'Sonuç bulunamadı';
        this.messages = {
            moreResultsAvailableMsg: this.MORE_RESULTS_MSG,
            noResultsAvailableMsg: this.NO_RESULTS_MSG
        };
        this.term = new forms_1.FormControl();
        this.resultsVisible = false;
        this.selectedItems = [];
        this.searchFocused = false;
        this.onTouchedCallback = common_1.noop;
        this.onChangeCallback = common_1.noop;
        this.requestInProgress = false;
        this.referenceMode = 'entity';
        this.multiple = false;
        this.searchDelay = 250;
        this.placeholder = this.placeholder;
        this.minimumInputLength = 0;
        this.searchable = false;
        this.disabled = false;
        this.searchIcon = 'caret';
        this.searchIconMulti = 'fa fa-search';
        this.deleteIcon = 'glyphicon glyphicon-remove';
        this.clientMode = false;
        this.onSelect = new core_1.EventEmitter();
        this.onRemove = new core_1.EventEmitter();
        this.onAfterViewInitCallback = common_1.noop;
        this.placeholderSelected = '';
        if (check_1.isNullOrUndefined(this.placeholder)) {
            this.placeholder = 'Seçiniz..';
        }
        this.loadData();
    }
    DnSelect2Component.prototype.focus = function () {
        this.termInput.nativeElement.focus();
    };
    DnSelect2Component.prototype.focusInput = function () {
        if (!this.disabled) {
            this.termInput.nativeElement.focus();
            this.resultsVisible = false;
        }
        this.searchFocused = !this.disabled;
    };
    DnSelect2Component.prototype.focusInputAndShowResults = function () {
        if (!this.disabled) {
            this.termInput.nativeElement.focus();
            this.subscribeToResults(Rx_1.Observable.of(''));
        }
        this.searchFocused = !this.disabled;
    };
    DnSelect2Component.prototype.getCountMessage = function () {
        var msg = this.messages && this.messages.moreResultsAvailableMsg ? this.messages.moreResultsAvailableMsg : this.MORE_RESULTS_MSG;
        msg = msg.replace(dn_select2_messages_1.DnSelect2Messages.PARTIAL_COUNT_VAR, String(this.listData.length));
        msg = msg.replace(dn_select2_messages_1.DnSelect2Messages.TOTAL_COUNT_VAR, String(this.resultsCount));
        return msg;
    };
    DnSelect2Component.prototype.getCss = function () {
        return 'select2-selection-container ' + (this.css === undefined ? '' : this.css);
    };
    DnSelect2Component.prototype.getInputWidth = function () {
        var searchEmpty = this.selectedItems.length === 0 && (this.term.value === null || this.term.value.length === 0);
        var length = this.term.value === null ? 0 : this.term.value.length;
        if (!this.multiple) {
            return '100%';
        }
        else {
            return searchEmpty ? '100%' : (1 + length * .6) + 'em';
        }
    };
    DnSelect2Component.prototype.getMinHeight = function () {
        var isInputSm = this.css === undefined ? false : this.css.indexOf('input-sm') !== -1;
        return isInputSm ? '30px' : '32px';
        // return isInputSm ? '30px' : '34px';
    };
    DnSelect2Component.prototype.getPlaceholder = function () {
        return this.selectedItems.length > 0 ? this.placeholderSelected : this.placeholder;
    };
    DnSelect2Component.prototype.getSelectText = function (item) {
        if (this.selectedText !== undefined) {
            return this.selectedText(item);
        }
        return item.name;
    };
    DnSelect2Component.prototype.getService = function () {
        return this.service;
    };
    DnSelect2Component.prototype.isHideable = function () {
        return !this.multiple && this.placeholderSelected !== '';
    };
    DnSelect2Component.prototype.ngAfterViewInit = function () {
        this.subscribeToChangesAndLoadDataFromObservable();
        this.onAfterViewInitCallback();
    };
    DnSelect2Component.prototype.ngDoCheck = function () {
        if (this.oldServiceUrl !== this.serviceUrl) {
            this.oldServiceUrl = this.serviceUrl;
            if (this.selectedItems && this.selectedItems.length > 0) {
                this.removeItem(this.selectedItems[0]);
            }
            this.loadData();
            this.term.patchValue('', { emitEvent: false });
        }
    };
    DnSelect2Component.prototype.onBlur = function () {
        // Eğer yazıp seçmeden onBlur yaparsa aktif olanı seçiyor.
        /*    if (this.results && this.selectedItems && this.selectedItems.length == 0) {
              this.results.selectCurrentItem();
            }*/
        if (this.selectedItems && this.selectedItems.length == 0) {
            this.term.patchValue(null, { emitEvent: false });
        }
        this.searchFocused = false;
        this.resultsVisible = false;
        this.onTouchedCallback();
    };
    DnSelect2Component.prototype.onFocus = function () {
        this.searchFocused = true;
    };
    DnSelect2Component.prototype.onItemSelected = function (item) {
        var _this = this;
        if (this.multiple) {
            this.selectedItems.push(item);
            var index = this.listData.indexOf(item, 0);
            if (index > -1) {
                this.listData.splice(index, 1);
            }
        }
        else {
            this.selectedItems.length = 0;
            this.selectedItems.push(item);
        }
        this.onChangeCallback('id' === this.referenceMode ? this.getSelectedIds() : this.getEntities());
        this.term.patchValue('', { emitEvent: false });
        setTimeout(function () { return _this.focusInput(); }, 1);
        this.resultsVisible = false;
        this.onSelect.emit(item);
        // this.selectValidatation(item);
        if (!this.multiple) {
            this.setPlaceholderText(item);
        }
    };
    DnSelect2Component.prototype.onKeyDown = function (ev) {
        if (this.results) {
            if (ev.keyCode === KEY_CODE_TAB) {
                this.results.selectCurrentItem();
            }
        }
        if (ev.keyCode === KEY_CODE_DELETE) {
            if ((!this.term.value || this.term.value.length === 0) && this.selectedItems.length > 0) {
                this.removeItem(this.selectedItems[this.selectedItems.length - 1]);
            }
        }
    };
    DnSelect2Component.prototype.onKeyPress = function (ev) {
        if (ev.keyCode === KEY_CODE_ENTER) {
            ev.preventDefault();
        }
    };
    DnSelect2Component.prototype.onKeyUp = function (ev) {
        if (this.results) {
            if (ev.keyCode === KEY_CODE_DOWN_ARROW) {
                this.results.activeNext();
            }
            else if (ev.keyCode === KEY_CODE_UP_ARROW) {
                this.results.activePrevious();
            }
            else if (ev.keyCode === KEY_CODE_ENTER) {
                this.results.selectCurrentItem();
            }
        }
        else {
            if (this.minimumInputLength === 0) {
                if (ev.keyCode === KEY_CODE_ENTER || ev.keyCode === KEY_CODE_DOWN_ARROW) {
                    this.focusInputAndShowResults();
                }
            }
        }
    };
    DnSelect2Component.prototype.outFocus = function () {
        /*if (this.results) {
          this.results.selectCurrentItem();
        }*/
    };
    DnSelect2Component.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DnSelect2Component.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    DnSelect2Component.prototype.removeItem = function (item) {
        var index = this.selectedItems.indexOf(item, 0);
        if (index > -1) {
            this.selectedItems.splice(index, 1);
        }
        this.onChangeCallback('id' === this.referenceMode ? this.getSelectedIds() : this.getEntities());
        this.onRemove.emit(item);
        this.removeValidatation();
        if (!this.multiple) {
            this.placeholderSelected = '';
        }
    };
    DnSelect2Component.prototype.removeSelected = function () {
        if (this.selectedItems.length === 1) {
            this.onRemove.emit(this.selectedItems[0]);
            this.selectedItems = [];
        }
        else {
            this.selectedItems = [];
            this.onRemove.emit();
        }
        this.onChangeCallback('id' === this.referenceMode ? this.getSelectedIds() : this.getEntities());
        if (!this.multiple) {
            this.placeholderSelected = '';
        }
    };
    DnSelect2Component.prototype.removeValidatation = function () {
        var input = $(this.el.nativeElement).find('input');
        var $form = $(this.el.nativeElement).closest('dn-dynamic-form');
        if (!$form) {
            $form = $(this.el.nativeElement).closest('form');
        }
        if (!$form)
            return;
        var validator = $form.data('bootstrapValidator');
        if (validator) {
            input.val('');
            validator.updateStatus(this.name, 'NOT_VALIDATED')
                .validateField(this.name);
            var icon = $(this.el.nativeElement).find('[data-bv-icon-for=\'' + input.attr('name') + '\']');
            if (!util_1.isUndefined(icon)) {
                icon.hide();
            }
        }
    };
    DnSelect2Component.prototype.selectValidatation = function (item) {
        var input = $(this.el.nativeElement).find('input');
        var form = $(this.el.nativeElement).closest('dn-dynamic-form');
        if (!form) {
            form = $(this.el.nativeElement).closest('form');
        }
        if (!form)
            return;
        var validator = form.data('bootstrapValidator');
        if (validator) {
            input.val(this.getSelectText(item));
            validator.updateStatus(this.name, 'NOT_VALIDATED')
                .validateField(this.name);
            var icon = $(this.el.nativeElement).find('[data-bv-icon-for=\'' + name + '\']');
            if (!util_1.isUndefined(icon)) {
                icon.hide();
            }
        }
    };
    DnSelect2Component.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    DnSelect2Component.prototype.writeValue = function (selectedValues) {
        if (this.serviceUrl !== undefined && this.dnSelect2ItemAdapter === undefined) {
            this.loadData();
        }
        if (selectedValues) {
            if (this.referenceMode === 'id') {
                this.populateItemsFromIds(selectedValues);
            }
            else {
                this.populateItemsFromEntities(selectedValues);
            }
            if (!this.multiple) {
                if (this.referenceMode === 'id') {
                    var clonedSelected = JSON.parse(JSON.stringify(selectedValues));
                    this.selectValidatation(clonedSelected);
                }
                else {
                    var clonedEntity = JSON.parse(JSON.stringify(selectedValues));
                    var clonedSelected = JSON.parse(JSON.stringify(selectedValues));
                    clonedSelected.entity = clonedEntity;
                    this.selectValidatation(clonedSelected);
                }
            }
            else if (selectedValues[0]) {
                this.selectValidatation(selectedValues[0]);
            }
        }
        else {
            this.selectedItems = [];
        }
    };
    DnSelect2Component.prototype.adaptItems = function (items) {
        var _this = this;
        var convertedItems = [];
        items.map(function (item) { return _this.dnSelect2ItemAdapter(item); })
            .filter(function (dnSelect2Item) { return !_this.alreadySelected(dnSelect2Item); })
            .forEach(function (dnSelect2Item) { return convertedItems.push(dnSelect2Item); });
        return convertedItems;
    };
    DnSelect2Component.prototype.alreadySelected = function (item) {
        var result = false;
        this.selectedItems.forEach(function (selectedItem) {
            if (selectedItem.id === item.id) {
                result = true;
            }
        });
        return result;
    };
    DnSelect2Component.prototype.bindData = function () {
        this.dataSourceProvider = this.service.listData.bind(this.service);
        this.selectedProvider = this.service.getItems.bind(this.service);
        this.dnSelect2ItemAdapter = function (entity) {
            return {
                id: entity.id,
                name: entity.name,
                entity: entity
            };
        };
    };
    DnSelect2Component.prototype.containsText = function (item, term) {
        if (this.displaySelect === undefined) {
            return item.name.toUpperCase().indexOf(term.toUpperCase()) !== -1;
        }
        else {
            return this.displaySelect(item).toUpperCase().indexOf(term.toUpperCase()) !== -1;
        }
    };
    DnSelect2Component.prototype.fetchAndfilterLocalData = function (term) {
        var _this = this;
        if (!this.fullDataList) {
            return this.fetchData('')
                .flatMap(function (items) {
                _this.fullDataList = items;
                return _this.filterLocalData(term);
            });
        }
        else {
            return this.filterLocalData(term);
        }
    };
    DnSelect2Component.prototype.fetchData = function (term) {
        var _this = this;
        if (check_1.isNullOrUndefined(this.dataSourceProvider)) {
            var filteredList = [];
            return Rx_1.Observable.of(filteredList);
        }
        else {
            return this
                .dataSourceProvider(term, this.displaySelect)
                .map(function (items) { return _this.adaptItems(items); });
        }
    };
    DnSelect2Component.prototype.filterLocalData = function (term) {
        var _this = this;
        return Rx_1.Observable.of(this.fullDataList.filter(function (item) { return _this.containsText(item, term) && !_this.alreadySelected(item); }));
    };
    DnSelect2Component.prototype.getEntities = function () {
        if (this.multiple) {
            var entities_1 = [];
            this.selectedItems.forEach(function (item) {
                entities_1.push(item.entity);
            });
            return entities_1;
        }
        else {
            return this.selectedItems.length === 0 ? null : this.selectedItems[0].entity;
        }
    };
    DnSelect2Component.prototype.getSelectedIds = function () {
        if (this.multiple) {
            var ids_1 = [];
            this.selectedItems.forEach(function (item) { return ids_1.push(item.id); });
            return ids_1;
        }
        else {
            return this.selectedItems.length === 0 ? null : this.selectedItems[0].id;
        }
    };
    DnSelect2Component.prototype.handleMultipleWithEntities = function (selectedValues) {
        var _this = this;
        selectedValues.forEach(function (entity) {
            var item = _this.dnSelect2ItemAdapter(entity);
            var ids = _this.getSelectedIds();
            if (ids.indexOf(item.id) === -1) {
                _this.selectedItems.push(item);
            }
        });
    };
    DnSelect2Component.prototype.handleMultipleWithIds = function (selectedValues) {
        var _this = this;
        if (selectedValues !== undefined && this.selectedProvider !== undefined) {
            var uniqueIds_1 = [];
            selectedValues.forEach(function (id) {
                if (uniqueIds_1.indexOf(id) === -1) {
                    uniqueIds_1.push(id);
                }
            });
            this.selectedProvider(uniqueIds_1).subscribe(function (items) {
                _this.selectedItems = items.map(_this.dnSelect2ItemAdapter);
            });
        }
    };
    DnSelect2Component.prototype.handleSingleWithId = function (id) {
        var _this = this;
        if (id !== undefined && this.selectedProvider !== undefined) {
            this.selectedProvider([id]).subscribe(function (items) {
                items.forEach(function (item) {
                    var dnSelect2Item = _this.dnSelect2ItemAdapter(item);
                    _this.selectedItems = [dnSelect2Item];
                    _this.setPlaceholderText(dnSelect2Item);
                });
            });
        }
    };
    DnSelect2Component.prototype.loadData = function () {
        if (!this.searchable) {
            if (this.serviceUrl !== undefined) {
                this.service.loadDataFromService(this.serviceUrl);
                this.bindData();
            }
            else if (!check_1.isNullOrUndefined(this.data)) {
                this.service.loadDataFromLocal(this.data);
                this.bindData();
            }
        }
    };
    DnSelect2Component.prototype.loadDataFromObservable = function (term) {
        return this.clientMode ? this.fetchAndfilterLocalData(term) : this.fetchData(term);
    };
    DnSelect2Component.prototype.populateItemsFromEntities = function (selectedValues) {
        if (this.multiple) {
            this.handleMultipleWithEntities(selectedValues);
        }
        else {
            var dnSelect2Item = this.dnSelect2ItemAdapter(selectedValues);
            this.selectedItems = [dnSelect2Item];
            this.setPlaceholderText(dnSelect2Item);
        }
    };
    DnSelect2Component.prototype.populateItemsFromIds = function (selectedValues) {
        if (this.multiple) {
            this.handleMultipleWithIds(selectedValues);
        }
        else {
            this.handleSingleWithId(selectedValues);
        }
    };
    DnSelect2Component.prototype.setPlaceholderText = function (item) {
        this.placeholderSelected = this.getSelectText(item);
    };
    DnSelect2Component.prototype.subscribeToChangesAndLoadDataFromObservable = function () {
        var observable = this.term.valueChanges
            .debounceTime(this.searchDelay)
            .distinctUntilChanged();
        this.subscribeToResults(observable);
    };
    DnSelect2Component.prototype.subscribeToResults = function (observable) {
        var _this = this;
        observable
            .do(function () { return _this.resultsVisible = false; })
            .filter(function (term) { return term.length >= _this.minimumInputLength; })
            .switchMap(function (term) { return _this.loadDataFromObservable(term); })
            .do(function () { return _this.resultsVisible = _this.searchFocused; })
            .subscribe(function (items) { return _this.listData = items; });
    };
    __decorate([
        core_1.Input()
    ], DnSelect2Component.prototype, "messages", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2Component.prototype, "dataSourceProvider", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2Component.prototype, "selectedProvider", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2Component.prototype, "dnSelect2ItemAdapter", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2Component.prototype, "referenceMode", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2Component.prototype, "multiple", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2Component.prototype, "searchDelay", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2Component.prototype, "css", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2Component.prototype, "name", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2Component.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2Component.prototype, "minimumInputLength", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2Component.prototype, "searchable", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2Component.prototype, "disabled", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2Component.prototype, "searchIcon", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2Component.prototype, "searchIconMulti", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2Component.prototype, "displaySelect", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2Component.prototype, "selectedText", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2Component.prototype, "deleteIcon", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2Component.prototype, "serviceUrl", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2Component.prototype, "data", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2Component.prototype, "resultsCount", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2Component.prototype, "clientMode", void 0);
    __decorate([
        core_1.Output()
    ], DnSelect2Component.prototype, "onSelect", void 0);
    __decorate([
        core_1.Output()
    ], DnSelect2Component.prototype, "onRemove", void 0);
    __decorate([
        core_1.ViewChild('results')
    ], DnSelect2Component.prototype, "results", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2Component.prototype, "onAfterViewInitCallback", void 0);
    __decorate([
        core_1.ViewChild('termInput')
    ], DnSelect2Component.prototype, "termInput", void 0);
    DnSelect2Component = __decorate([
        core_1.Component({
            selector: 'dn-select2',
            template: "\n        <div class=\"select2-container\" [ngClass]=\"{'readonly': disabled}\">\n            <a>\n                <ul [class]=\"getCss()\"\n                    [style.min-height]=\"getMinHeight()\"\n                    (click)=\"focusInputAndShowResults()\"\n                    [class.simple-selection]=\"!multiple\"\n                    [class.multiple-selection]=\"multiple\"\n                    [class.search-focused]=\"searchFocused\"\n                    [class.requestInProgress]=\"requestInProgress\">\n                    <li *ngFor=\"let item of selectedItems\"\n                        class=\"select2-selected\"\n                        [class.label]=\"multiple\"\n                        [class.label-info]=\"multiple\">\n                        <span class=\"selectedItemText\">{{getSelectText(item)}}</span>\n                        <a class=\"select2-selection-remove\" (click)=\"removeItem(item)\" *ngIf=\"!disabled\">\n                            <i [class]=\"deleteIcon\" [class.text-info]=\"!multiple\"></i>\n                        </a>\n                    </li>\n                    <li class=\"select2-input\">\n                        <input #termInput\n                               type=\"text\"\n                               [placeholder]=\"getPlaceholder()\"\n                               [formControl]=\"term\"\n                               [style.width]=\"getInputWidth()\"\n                               [class.hideable]='isHideable()'\n                               (focus)=\"onFocus()\"\n                               (focusout)=\"outFocus()\"\n                               (blur)=\"onBlur()\"\n                               (keyup)=\"onKeyUp($event)\"\n                               (keydown)=\"onKeyDown($event)\"\n                               (keypress)=\"onKeyPress($event)\"\n                               *ngIf=\"!disabled\"\n                               [name]=\"name\"\n                        />\n                    </li>\n                </ul>\n                <span [class]=\"searchIcon\" *ngIf=\"minimumInputLength===0\" (click)=\"onFocus()\"></span>\n                <span [class]=\"searchIconMulti\" *ngIf=\"minimumInputLength!==0\"></span>\n            </a>\n            <div class=\"results-container\" *ngIf=\"resultsVisible\">\n        <span class=\"results-msg\" *ngIf=\"listData && (listData.length + selectedItems.length) < resultsCount\">\n            {{getCountMessage()}}\n        </span>\n                <span class=\"results-msg no-results-msg\" *ngIf=\"searchFocused && listData && listData.length === 0\">\n            {{messages && messages.noResultsAvailableMsg ? messages.noResultsAvailableMsg : NO_RESULTS_MSG}}\n        </span>\n                <dn-select2-results #results [selectedItems]=\"selectedItems\" [items]=\"listData\"\n                                    [displaySelect]=\"displaySelect\"\n                                    (itemSelectedEvent)=\"onItemSelected($event);\"\n                                    [searchFocused]=\"searchFocused\"></dn-select2-results>\n            </div>\n        </div>\n    ",
            styleUrls: ['dn-select2.component.scss'],
            providers: [VALUE_ACCESSOR, dn_select2_service_1.DnSelect2Service]
        })
    ], DnSelect2Component);
    return DnSelect2Component;
}());
exports.DnSelect2Component = DnSelect2Component;
