/**
 * Created by cabbar on 12.04.2017.
 */
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { isUndefined } from 'util';
import { isNullOrUndefined } from '../../../utils/check';
import { DnSelect2Messages } from './dn-select2-messages';
import { DnSelect2Service } from './dn-select2.service';
import { noop } from '../../../utils/common';
var KEY_CODE_DOWN_ARROW = 40;
var KEY_CODE_UP_ARROW = 38;
var KEY_CODE_ENTER = 13;
var KEY_CODE_TAB = 9;
var KEY_CODE_DELETE = 8;
var VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DnSelect2Component; }),
    multi: true
};
var DnSelect2Component = /** @class */ (function () {
    function DnSelect2Component(service, el) {
        this.service = service;
        this.el = el;
        this.MORE_RESULTS_MSG = 'Toplam ' + DnSelect2Messages.TOTAL_COUNT_VAR + ' sounçtan ' + DnSelect2Messages.PARTIAL_COUNT_VAR +
            ' tanesi gösteriliyor. Daha doğru sonuç görüntülemek için aramanızı daraltın.';
        this.NO_RESULTS_MSG = 'Sonuç bulunamadı';
        this.messages = {
            moreResultsAvailableMsg: this.MORE_RESULTS_MSG,
            noResultsAvailableMsg: this.NO_RESULTS_MSG
        };
        this.term = new FormControl();
        this.resultsVisible = false;
        this.selectedItems = [];
        this.searchFocused = false;
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
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
        this.onSelect = new EventEmitter();
        this.onRemove = new EventEmitter();
        this.onAfterViewInitCallback = noop;
        this.placeholderSelected = '';
        if (isNullOrUndefined(this.placeholder)) {
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
            this.subscribeToResults(Observable.of(''));
        }
        this.searchFocused = !this.disabled;
    };
    DnSelect2Component.prototype.getCountMessage = function () {
        var msg = this.messages && this.messages.moreResultsAvailableMsg ? this.messages.moreResultsAvailableMsg : this.MORE_RESULTS_MSG;
        msg = msg.replace(DnSelect2Messages.PARTIAL_COUNT_VAR, String(this.listData.length));
        msg = msg.replace(DnSelect2Messages.TOTAL_COUNT_VAR, String(this.resultsCount));
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
            if (!isUndefined(icon)) {
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
            if (!isUndefined(icon)) {
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
        if (isNullOrUndefined(this.dataSourceProvider)) {
            var filteredList = [];
            return Observable.of(filteredList);
        }
        else {
            return this
                .dataSourceProvider(term, this.displaySelect)
                .map(function (items) { return _this.adaptItems(items); });
        }
    };
    DnSelect2Component.prototype.filterLocalData = function (term) {
        var _this = this;
        return Observable.of(this.fullDataList.filter(function (item) { return _this.containsText(item, term) && !_this.alreadySelected(item); }));
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
            else if (!isNullOrUndefined(this.data)) {
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
    DnSelect2Component.decorators = [
        { type: Component, args: [{
                    selector: 'dn-select2',
                    template: "\n        <div class=\"select2-container\" [ngClass]=\"{'readonly': disabled}\">\n            <a>\n                <ul [class]=\"getCss()\"\n                    [style.min-height]=\"getMinHeight()\"\n                    (click)=\"focusInputAndShowResults()\"\n                    [class.simple-selection]=\"!multiple\"\n                    [class.multiple-selection]=\"multiple\"\n                    [class.search-focused]=\"searchFocused\"\n                    [class.requestInProgress]=\"requestInProgress\">\n                    <li *ngFor=\"let item of selectedItems\"\n                        class=\"select2-selected\"\n                        [class.label]=\"multiple\"\n                        [class.label-info]=\"multiple\">\n                        <span class=\"selectedItemText\">{{getSelectText(item)}}</span>\n                        <a class=\"select2-selection-remove\" (click)=\"removeItem(item)\" *ngIf=\"!disabled\">\n                            <i [class]=\"deleteIcon\" [class.text-info]=\"!multiple\"></i>\n                        </a>\n                    </li>\n                    <li class=\"select2-input\">\n                        <input #termInput\n                               type=\"text\"\n                               [placeholder]=\"getPlaceholder()\"\n                               [formControl]=\"term\"\n                               [style.width]=\"getInputWidth()\"\n                               [class.hideable]='isHideable()'\n                               (focus)=\"onFocus()\"\n                               (focusout)=\"outFocus()\"\n                               (blur)=\"onBlur()\"\n                               (keyup)=\"onKeyUp($event)\"\n                               (keydown)=\"onKeyDown($event)\"\n                               (keypress)=\"onKeyPress($event)\"\n                               *ngIf=\"!disabled\"\n                               [name]=\"name\"\n                        />\n                    </li>\n                </ul>\n                <span [class]=\"searchIcon\" *ngIf=\"minimumInputLength===0\" (click)=\"onFocus()\"></span>\n                <span [class]=\"searchIconMulti\" *ngIf=\"minimumInputLength!==0\"></span>\n            </a>\n            <div class=\"results-container\" *ngIf=\"resultsVisible\">\n        <span class=\"results-msg\" *ngIf=\"listData && (listData.length + selectedItems.length) < resultsCount\">\n            {{getCountMessage()}}\n        </span>\n                <span class=\"results-msg no-results-msg\" *ngIf=\"searchFocused && listData && listData.length === 0\">\n            {{messages && messages.noResultsAvailableMsg ? messages.noResultsAvailableMsg : NO_RESULTS_MSG}}\n        </span>\n                <dn-select2-results #results [selectedItems]=\"selectedItems\" [items]=\"listData\"\n                                    [displaySelect]=\"displaySelect\"\n                                    (itemSelectedEvent)=\"onItemSelected($event);\"\n                                    [searchFocused]=\"searchFocused\"></dn-select2-results>\n            </div>\n        </div>\n    ",
                    styles: ["\n        .select2-container {\n            position: relative;\n            width: 100%;\n        }\n\n        .select2-container.readonly ul {\n            background: #eee;\n            cursor: not-allowed;\n        }\n\n        .select2-input {\n            list-style-type: none;\n            margin-left: 5px;\n            margin-top: 2px;\n        }\n\n        .select2-input input {\n            border: none;\n            outline: none;\n            float: left;\n        }\n\n        .select2-selected {\n            margin: 2px;\n            float: left;\n            list-style-type: none;\n            font-size: 100%;\n        }\n\n        .multiple-selection .select2-selected {\n            padding: 4px;\n        }\n\n        .simple-selection .select2-selected {\n            border: none;\n            width: 100%;\n            padding-left: 5px;\n            padding-top: 1px; /*editted padding-top: 1px;*/\n        }\n\n        .simple-selection input {\n            border: none;\n            outline: none;\n            float: left;\n            position: absolute;\n            left: 9px;\n            background: transparent;\n        }\n\n        .simple-selection a.select2-selection-remove {\n            text-align: right;\n            right: 25px;\n            top: 9px;\n            position: absolute;\n            z-index: 2;\n        }\n\n        .select2-selection-container {\n            display: block;\n            overflow: hidden;\n            background-clip: border-box;\n            background-attachment: scroll;\n            height: inherit;\n            padding: 2px 30px 2px 2px;\n        }\n\n        .select2-selection-container:hover {\n            cursor: text;\n        }\n\n        .select2-selection-remove {\n            color: rgba(255, 255, 255, 0.4);\n            font-size: 0.8em;\n        }\n\n        .select2-selection-remove:hover {\n            color: rgba(255, 255, 255, 0.8);\n            cursor: pointer;\n        }\n\n        .select2-container .search-focused {\n            outline: 0;\n            border-color: #66afe9;\n            -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);\n            box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);\n        }\n\n        .select2-container ul {\n            position: relative;\n        }\n\n        .simple-selection.search-focused .selectedItemText {\n            display: none;\n        }\n\n        .simple-selection.search-focused input.hideable {\n            opacity: 1;\n        }\n\n        .simple-selection input.hideable {\n            opacity: 0;\n        }\n\n        .caret{\n            position: absolute;\n            right: 10px;\n            top: 14px;\n        }\n\n        .fa-search {\n            position: absolute;\n            right: 10px;\n            top: 10px;\n        }\n\n        .search {\n            color: #337ab7;\n            position: absolute;\n            right: 7px;\n            top: 10px;\n            font-size: 12px;\n        }\n\n        .results-msg {\n            background: whitesmoke;\n            border-left: 1px solid #ccc;\n            border-right: 1px solid #ccc;\n            color: #aaa;\n            display: block;\n            font-style: italic;\n            font-size: 0.9em;\n            margin: -12px 0 10px;\n            padding: 5px;\n        }\n\n        .no-results-msg {\n            border-bottom: 1px solid #66afe9;\n            border-color: #66afe9;\n            outline: 0;\n        }\n\n        .results-container {\n            position: absolute;\n            width: 100%;\n            z-index: 3;\n        }\n\n        .requestInProgress {\n            background: lightgray;\n        }\n    "],
                    providers: [VALUE_ACCESSOR, DnSelect2Service]
                },] },
    ];
    /** @nocollapse */
    DnSelect2Component.ctorParameters = function () { return [
        { type: DnSelect2Service, },
        { type: ElementRef, },
    ]; };
    DnSelect2Component.propDecorators = {
        'messages': [{ type: Input },],
        'dataSourceProvider': [{ type: Input },],
        'selectedProvider': [{ type: Input },],
        'dnSelect2ItemAdapter': [{ type: Input },],
        'referenceMode': [{ type: Input },],
        'multiple': [{ type: Input },],
        'searchDelay': [{ type: Input },],
        'css': [{ type: Input },],
        'name': [{ type: Input },],
        'placeholder': [{ type: Input },],
        'minimumInputLength': [{ type: Input },],
        'searchable': [{ type: Input },],
        'disabled': [{ type: Input },],
        'searchIcon': [{ type: Input },],
        'searchIconMulti': [{ type: Input },],
        'displaySelect': [{ type: Input },],
        'selectedText': [{ type: Input },],
        'deleteIcon': [{ type: Input },],
        'serviceUrl': [{ type: Input },],
        'data': [{ type: Input },],
        'resultsCount': [{ type: Input },],
        'clientMode': [{ type: Input },],
        'onSelect': [{ type: Output },],
        'onRemove': [{ type: Output },],
        'results': [{ type: ViewChild, args: ['results',] },],
        'onAfterViewInitCallback': [{ type: Input },],
        'termInput': [{ type: ViewChild, args: ['termInput',] },],
    };
    return DnSelect2Component;
}());
export { DnSelect2Component };
//# sourceMappingURL=dn-select2.component.js.map