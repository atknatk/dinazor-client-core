/**
 * Created by cabbar on 12.04.2017.
 */
import {
    AfterViewInit,
    Component,
    DoCheck,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { isUndefined } from 'util';
import { isNullOrUndefined } from '../../../utils/check';
import { DnSelect2Item } from './dn-select2-item';
import { DnSelect2Messages } from './dn-select2-messages';
import { DnSelect2ResultsComponent } from './dn-select2-results/dn-select2-results.component';
import { DnSelect2Service } from './dn-select2.service';
import { noop } from '../../../utils/common';

const KEY_CODE_DOWN_ARROW = 40;
const KEY_CODE_UP_ARROW = 38;
const KEY_CODE_ENTER = 13;
const KEY_CODE_TAB = 9;
const KEY_CODE_DELETE = 8;
const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DnSelect2Component),
    multi: true
};
declare let $: any;

@Component({
    selector: 'dn-select2',
    template: `
        <div class="select2-container" [ngClass]="{'readonly': disabled}">
            <a>
                <ul [class]="getCss()"
                    [style.min-height]="getMinHeight()"
                    (click)="focusInputAndShowResults()"
                    [class.simple-selection]="!multiple"
                    [class.multiple-selection]="multiple"
                    [class.search-focused]="searchFocused"
                    [class.requestInProgress]="requestInProgress">
                    <li *ngFor="let item of selectedItems"
                        class="select2-selected"
                        [class.label]="multiple"
                        [class.label-info]="multiple">
                        <span class="selectedItemText">{{getSelectText(item)}}</span>
                        <a class="select2-selection-remove" (click)="removeItem(item)" *ngIf="!disabled">
                            <i [class]="deleteIcon" [class.text-info]="!multiple"></i>
                        </a>
                    </li>
                    <li class="select2-input">
                        <input #termInput
                               type="text"
                               [placeholder]="getPlaceholder()"
                               [formControl]="term"
                               [style.width]="getInputWidth()"
                               [class.hideable]='isHideable()'
                               (focus)="onFocus()"
                               (focusout)="outFocus()"
                               (blur)="onBlur()"
                               (keyup)="onKeyUp($event)"
                               (keydown)="onKeyDown($event)"
                               (keypress)="onKeyPress($event)"
                               *ngIf="!disabled"
                               [name]="name"
                        />
                    </li>
                </ul>
                <span [class]="searchIcon" *ngIf="minimumInputLength===0" (click)="onFocus()"></span>
                <span [class]="searchIconMulti" *ngIf="minimumInputLength!==0"></span>
            </a>
            <div class="results-container" *ngIf="resultsVisible">
        <span class="results-msg" *ngIf="listData && (listData.length + selectedItems.length) < resultsCount">
            {{getCountMessage()}}
        </span>
                <span class="results-msg no-results-msg" *ngIf="searchFocused && listData && listData.length === 0">
            {{messages && messages.noResultsAvailableMsg ? messages.noResultsAvailableMsg : NO_RESULTS_MSG}}
        </span>
                <dn-select2-results #results [selectedItems]="selectedItems" [items]="listData"
                                    [displaySelect]="displaySelect"
                                    (itemSelectedEvent)="onItemSelected($event);"
                                    [searchFocused]="searchFocused"></dn-select2-results>
            </div>
        </div>
    `,
    styles: [`
        .select2-container {
            position: relative;
            width: 100%;
        }

        .select2-container.readonly ul {
            background: #eee;
            cursor: not-allowed;
        }

        .select2-input {
            list-style-type: none;
            margin-left: 5px;
            margin-top: 2px;
        }

        .select2-input input {
            border: none;
            outline: none;
            float: left;
        }

        .select2-selected {
            margin: 2px;
            float: left;
            list-style-type: none;
            font-size: 100%;
        }

        .multiple-selection .select2-selected {
            padding: 4px;
        }

        .simple-selection .select2-selected {
            border: none;
            width: 100%;
            padding-left: 5px;
            padding-top: 1px; /*editted padding-top: 1px;*/
        }

        .simple-selection input {
            border: none;
            outline: none;
            float: left;
            position: absolute;
            left: 9px;
            background: transparent;
        }

        .simple-selection a.select2-selection-remove {
            text-align: right;
            right: 25px;
            top: 9px;
            position: absolute;
            z-index: 2;
        }

        .select2-selection-container {
            display: block;
            overflow: hidden;
            background-clip: border-box;
            background-attachment: scroll;
            height: inherit;
            padding: 2px 30px 2px 2px;
        }

        .select2-selection-container:hover {
            cursor: text;
        }

        .select2-selection-remove {
            color: rgba(255, 255, 255, 0.4);
            font-size: 0.8em;
        }

        .select2-selection-remove:hover {
            color: rgba(255, 255, 255, 0.8);
            cursor: pointer;
        }

        .select2-container .search-focused {
            outline: 0;
            border-color: #66afe9;
            -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
        }

        .select2-container ul {
            position: relative;
        }

        .simple-selection.search-focused .selectedItemText {
            display: none;
        }

        .simple-selection.search-focused input.hideable {
            opacity: 1;
        }

        .simple-selection input.hideable {
            opacity: 0;
        }

        .caret{
            position: absolute;
            right: 10px;
            top: 14px;
        }

        .fa-search {
            position: absolute;
            right: 10px;
            top: 10px;
        }

        .search {
            color: #337ab7;
            position: absolute;
            right: 7px;
            top: 10px;
            font-size: 12px;
        }

        .results-msg {
            background: whitesmoke;
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
            color: #aaa;
            display: block;
            font-style: italic;
            font-size: 0.9em;
            margin: -12px 0 10px;
            padding: 5px;
        }

        .no-results-msg {
            border-bottom: 1px solid #66afe9;
            border-color: #66afe9;
            outline: 0;
        }

        .results-container {
            position: absolute;
            width: 100%;
            z-index: 3;
        }

        .requestInProgress {
            background: lightgray;
        }
    `],
    providers: [VALUE_ACCESSOR, DnSelect2Service]
})
export class DnSelect2Component<T> implements AfterViewInit, DoCheck, ControlValueAccessor {

    MORE_RESULTS_MSG = 'Toplam ' + DnSelect2Messages.TOTAL_COUNT_VAR + ' sounçtan ' + DnSelect2Messages.PARTIAL_COUNT_VAR +
        ' tanesi gösteriliyor. Daha doğru sonuç görüntülemek için aramanızı daraltın.';
    NO_RESULTS_MSG = 'Sonuç bulunamadı';
    @Input() messages: DnSelect2Messages = {
        moreResultsAvailableMsg: this.MORE_RESULTS_MSG,
        noResultsAvailableMsg: this.NO_RESULTS_MSG
    };
    term = new FormControl();
    resultsVisible = false;
    listData: DnSelect2Item[];
    fullDataList: DnSelect2Item[];
    selectedItems: DnSelect2Item[] = [];
    searchFocused = false;
    onTouchedCallback: () => void = noop;
    onChangeCallback: (_: any) => void = noop;
    requestInProgress = false;
    @Input() dataSourceProvider: (term: string, displaySelect: (_: DnSelect2Item) => string) => Observable<T[]>;
    @Input() selectedProvider: (ids: string[]) => Observable<T[]>;
    @Input() dnSelect2ItemAdapter: (entity: T) => DnSelect2Item;
    @Input() referenceMode: 'entity' | 'id' = 'entity';
    @Input() multiple = false;
    @Input() searchDelay = 250;
    @Input() css: string;
    @Input() name: string;
    @Input() placeholder: string = this.placeholder;
    @Input() minimumInputLength = 0;
    @Input() searchable: boolean = false;
    @Input() disabled = false;
    @Input() searchIcon = 'caret';
    @Input() searchIconMulti = 'fa fa-search';
    @Input() displaySelect: (_: DnSelect2Item) => string;
    @Input() selectedText: (_: DnSelect2Item) => string;
    @Input() deleteIcon = 'glyphicon glyphicon-remove';
    @Input() serviceUrl: string;
    @Input() data: any[];
    @Input() resultsCount;
    @Input() clientMode = false;
    @Output() onSelect: EventEmitter<DnSelect2Item> = new EventEmitter<DnSelect2Item>();
    @Output() onRemove: EventEmitter<DnSelect2Item> = new EventEmitter<DnSelect2Item>();
    @ViewChild('results') results: DnSelect2ResultsComponent;
    @Input() onAfterViewInitCallback: () => void = noop;
    @ViewChild('termInput') private termInput;
    private placeholderSelected = '';
    private oldServiceUrl: string;

    constructor(private service: DnSelect2Service, private el: ElementRef) {
        if (isNullOrUndefined(this.placeholder)) {
            this.placeholder = 'Seçiniz..';
        }
        this.loadData();
    }

    focus(): void {
        this.termInput.nativeElement.focus();
    }

    focusInput() {
        if (!this.disabled) {
            this.termInput.nativeElement.focus();
            this.resultsVisible = false;
        }
        this.searchFocused = !this.disabled;
    }

    focusInputAndShowResults() {
        if (!this.disabled) {
            this.termInput.nativeElement.focus();
            this.subscribeToResults(Observable.of(''));
        }
        this.searchFocused = !this.disabled;
    }

    getCountMessage(): string {
        let msg = this.messages && this.messages.moreResultsAvailableMsg ? this.messages.moreResultsAvailableMsg : this.MORE_RESULTS_MSG;
        msg = msg.replace(DnSelect2Messages.PARTIAL_COUNT_VAR, String(this.listData.length));
        msg = msg.replace(DnSelect2Messages.TOTAL_COUNT_VAR, String(this.resultsCount));
        return msg;
    }

    getCss(): string {
        return 'select2-selection-container ' + (this.css === undefined ? '' : this.css);
    }

    getInputWidth(): string {
        const searchEmpty = this.selectedItems.length === 0 && (this.term.value === null || this.term.value.length === 0);
        const length = this.term.value === null ? 0 : this.term.value.length;
        if (!this.multiple) {
            return '100%';
        } else {
            return searchEmpty ? '100%' : (1 + length * .6) + 'em';
        }
    }

    getMinHeight(): string {
        const isInputSm: boolean = this.css === undefined ? false : this.css.indexOf('input-sm') !== -1;
        return isInputSm ? '30px' : '32px';
        // return isInputSm ? '30px' : '34px';
    }

    getPlaceholder(): string {
        return this.selectedItems.length > 0 ? this.placeholderSelected : this.placeholder;
    }

    getSelectText(item: DnSelect2Item): string {
        if (this.selectedText !== undefined) {
            return this.selectedText(item);
        }
        return item.name;
    }

    getService() {
        return this.service;
    }

    isHideable(): boolean {
        return !this.multiple && this.placeholderSelected !== '';
    }

    ngAfterViewInit() {
        this.subscribeToChangesAndLoadDataFromObservable();
        this.onAfterViewInitCallback();
    }

    ngDoCheck(): void {
        if (this.oldServiceUrl !== this.serviceUrl) {
            this.oldServiceUrl = this.serviceUrl;
            if (this.selectedItems && this.selectedItems.length > 0) {
                this.removeItem(this.selectedItems[0]);
            }
            this.loadData();
            this.term.patchValue('', {emitEvent: false});
        }
    }

    onBlur() {
        // Eğer yazıp seçmeden onBlur yaparsa aktif olanı seçiyor.
        /*    if (this.results && this.selectedItems && this.selectedItems.length == 0) {
              this.results.selectCurrentItem();
            }*/
        if (this.selectedItems && this.selectedItems.length == 0) {
            this.term.patchValue(null, {emitEvent: false});
        }
        this.searchFocused = false;
        this.resultsVisible = false;
        this.onTouchedCallback();
    }

    onFocus() {
        this.searchFocused = true;
    }

    onItemSelected(item: DnSelect2Item) {
        if (this.multiple) {
            this.selectedItems.push(item);
            const index = this.listData.indexOf(item, 0);
            if (index > -1) {
                this.listData.splice(index, 1);
            }
        } else {
            this.selectedItems.length = 0;
            this.selectedItems.push(item);
        }
        this.onChangeCallback('id' === this.referenceMode ? this.getSelectedIds() : this.getEntities());
        this.term.patchValue('', {emitEvent: false});
        setTimeout(() => this.focusInput(), 1);
        this.resultsVisible = false;
        this.onSelect.emit(item);
        // this.selectValidatation(item);
        if (!this.multiple) {
            this.setPlaceholderText(item);
        }
    }

    onKeyDown(ev) {
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
    }

    onKeyPress(ev) {
        if (ev.keyCode === KEY_CODE_ENTER) {
            ev.preventDefault();
        }
    }

    onKeyUp(ev) {
        if (this.results) {
            if (ev.keyCode === KEY_CODE_DOWN_ARROW) {
                this.results.activeNext();
            } else if (ev.keyCode === KEY_CODE_UP_ARROW) {
                this.results.activePrevious();
            } else if (ev.keyCode === KEY_CODE_ENTER) {
                this.results.selectCurrentItem();
            }
        } else {
            if (this.minimumInputLength === 0) {
                if (ev.keyCode === KEY_CODE_ENTER || ev.keyCode === KEY_CODE_DOWN_ARROW) {
                    this.focusInputAndShowResults();
                }
            }
        }
    }

    outFocus() {
        /*if (this.results) {
          this.results.selectCurrentItem();
        }*/
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    removeItem(item: DnSelect2Item) {
        const index = this.selectedItems.indexOf(item, 0);

        if (index > -1) {
            this.selectedItems.splice(index, 1);
        }

        this.onChangeCallback('id' === this.referenceMode ? this.getSelectedIds() : this.getEntities());
        this.onRemove.emit(item);
        this.removeValidatation();
        if (!this.multiple) {
            this.placeholderSelected = '';
        }
    }

    removeSelected() {
        if (this.selectedItems.length === 1) {
            this.onRemove.emit(this.selectedItems[0]);
            this.selectedItems = [];
        } else {
            this.selectedItems = [];
            this.onRemove.emit();
        }
        this.onChangeCallback('id' === this.referenceMode ? this.getSelectedIds() : this.getEntities());

        if (!this.multiple) {
            this.placeholderSelected = '';
        }
    }

    removeValidatation() {
        const input = $(this.el.nativeElement).find('input');
        let $form = $(this.el.nativeElement).closest('dn-dynamic-form');
        if (!$form) {
            $form = $(this.el.nativeElement).closest('form');
        }
        if (!$form) return;
        const validator = $form.data('bootstrapValidator');
        if (validator) {
            input.val('');
            validator.updateStatus(this.name, 'NOT_VALIDATED')
                .validateField(this.name);
            const icon = $(this.el.nativeElement).find('[data-bv-icon-for=\'' + input.attr('name') + '\']');
            if (!isUndefined(icon)) {
                icon.hide();
            }
        }
    }

    selectValidatation(item) {
        const input = $(this.el.nativeElement).find('input');
        let form = $(this.el.nativeElement).closest('dn-dynamic-form');
        if (!form) {
            form = $(this.el.nativeElement).closest('form');
        }
        if (!form) return;
        const validator = form.data('bootstrapValidator');
        if (validator) {
            input.val(this.getSelectText(item));
            validator.updateStatus(this.name, 'NOT_VALIDATED')
                .validateField(this.name);
            const icon = $(this.el.nativeElement).find('[data-bv-icon-for=\'' + name + '\']');
            if (!isUndefined(icon)) {
                icon.hide();
            }
        }
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(selectedValues: any): void {
        if (this.serviceUrl !== undefined && this.dnSelect2ItemAdapter === undefined) {
            this.loadData();
        }
        if (selectedValues) {
            if (this.referenceMode === 'id') {
                this.populateItemsFromIds(selectedValues);
            } else {
                this.populateItemsFromEntities(selectedValues);
            }
            if (!this.multiple) {
                if (this.referenceMode === 'id') {
                    const clonedSelected = JSON.parse(JSON.stringify(selectedValues));
                    this.selectValidatation(clonedSelected);
                } else {
                    const clonedEntity = JSON.parse(JSON.stringify(selectedValues));
                    const clonedSelected = JSON.parse(JSON.stringify(selectedValues));
                    clonedSelected.entity = clonedEntity;
                    this.selectValidatation(clonedSelected);
                }
            } else if (selectedValues[0]) {
                this.selectValidatation(selectedValues[0]);
            }
        } else {
            this.selectedItems = [];
        }
    }

    private adaptItems(items: T[]): DnSelect2Item[] {
        const convertedItems = [];
        items.map((item) => this.dnSelect2ItemAdapter(item))
            .filter((dnSelect2Item) => !this.alreadySelected(dnSelect2Item))
            .forEach((dnSelect2Item) => convertedItems.push(dnSelect2Item));
        return convertedItems;
    }

    private alreadySelected(item: DnSelect2Item): boolean {
        let result = false;
        this.selectedItems.forEach(selectedItem => {
            if (selectedItem.id === item.id) {
                result = true;
            }
        });
        return result;
    }

    private bindData() {
        this.dataSourceProvider = this.service.listData.bind(this.service);
        this.selectedProvider = this.service.getItems.bind(this.service);
        this.dnSelect2ItemAdapter = (entity: any) => {
            return {
                id: entity.id,
                name: entity.name,
                entity: entity
            };
        };
    }

    private containsText(item, term: string) {
        if (this.displaySelect === undefined) {
            return item.name.toUpperCase().indexOf(term.toUpperCase()) !== -1;
        } else {
            return this.displaySelect(item).toUpperCase().indexOf(term.toUpperCase()) !== -1;
        }

    }

    private fetchAndfilterLocalData(term: string): Observable<DnSelect2Item[]> {
        if (!this.fullDataList) {
            return this.fetchData('')
                .flatMap((items) => {
                    this.fullDataList = items;
                    return this.filterLocalData(term);
                });
        } else {
            return this.filterLocalData(term);
        }
    }

    private fetchData(term: string): Observable<DnSelect2Item[]> {
        if (isNullOrUndefined(this.dataSourceProvider)) {
            const filteredList: DnSelect2Item[] = [];
            return Observable.of(filteredList);
        } else {
            return this
                .dataSourceProvider(term, this.displaySelect)
                .map((items: T[]) => this.adaptItems(items));
        }

    }

    private filterLocalData(term: string): Observable<DnSelect2Item[]> {
        return Observable.of(
            this.fullDataList.filter((item) => this.containsText(item, term) && !this.alreadySelected(item))
        );
    }

    private getEntities(): T[] {
        if (this.multiple) {
            const entities = [];

            this.selectedItems.forEach(item => {
                entities.push(item.entity);
            });

            return entities;
        } else {
            return this.selectedItems.length === 0 ? null : this.selectedItems[0].entity;
        }
    }

    private getSelectedIds(): any {
        if (this.multiple) {
            const ids: string[] = [];

            this.selectedItems.forEach(item => ids.push(item.id));

            return ids;
        } else {
            return this.selectedItems.length === 0 ? null : this.selectedItems[0].id;
        }
    }

    private handleMultipleWithEntities(selectedValues: any) {
        selectedValues.forEach((entity) => {
            const item = this.dnSelect2ItemAdapter(entity);
            const ids = this.getSelectedIds();

            if (ids.indexOf(item.id) === -1) {
                this.selectedItems.push(item);
            }
        });
    }

    private handleMultipleWithIds(selectedValues: any) {
        if (selectedValues !== undefined && this.selectedProvider !== undefined) {
            const uniqueIds = [];
            selectedValues.forEach((id) => {
                if (uniqueIds.indexOf(id) === -1) {
                    uniqueIds.push(id);
                }
            });

            this.selectedProvider(uniqueIds).subscribe((items: T[]) => {
                this.selectedItems = items.map(this.dnSelect2ItemAdapter);
            });
        }
    }

    private handleSingleWithId(id: any) {
        if (id !== undefined && this.selectedProvider !== undefined) {
            this.selectedProvider([id]).subscribe((items: T[]) => {
                items.forEach((item) => {
                    const dnSelect2Item = this.dnSelect2ItemAdapter(item);
                    this.selectedItems = [dnSelect2Item];
                    this.setPlaceholderText(dnSelect2Item);
                });
            });
        }
    }

    private loadData() {
        if (!this.searchable) {
            if (this.serviceUrl !== undefined) {
                this.service.loadDataFromService(this.serviceUrl);
                this.bindData();
            } else if (!isNullOrUndefined(this.data)) {
                this.service.loadDataFromLocal(this.data);
                this.bindData();
            }
        }

    }

    private loadDataFromObservable(term: string): Observable<DnSelect2Item[]> {
        return this.clientMode ? this.fetchAndfilterLocalData(term) : this.fetchData(term);
    }

    private populateItemsFromEntities(selectedValues: any) {
        if (this.multiple) {
            this.handleMultipleWithEntities(selectedValues);
        } else {
            const dnSelect2Item = this.dnSelect2ItemAdapter(selectedValues);
            this.selectedItems = [dnSelect2Item];
            this.setPlaceholderText(dnSelect2Item);
        }
    }

    private populateItemsFromIds(selectedValues: any) {
        if (this.multiple) {
            this.handleMultipleWithIds(selectedValues);
        } else {
            this.handleSingleWithId(selectedValues);
        }
    }

    private setPlaceholderText(item: DnSelect2Item) {
        this.placeholderSelected = this.getSelectText(item);
    }

    private subscribeToChangesAndLoadDataFromObservable() {
        const observable = this.term.valueChanges
            .debounceTime(this.searchDelay)
            .distinctUntilChanged();
        this.subscribeToResults(observable);
    }

    private subscribeToResults(observable: Observable<string>): void {
        observable
            .do(() => this.resultsVisible = false)
            .filter((term) => term.length >= this.minimumInputLength)
            .switchMap(term => this.loadDataFromObservable(term))
            .do(() => this.resultsVisible = this.searchFocused)
            .subscribe((items) => this.listData = items);
    }
}
