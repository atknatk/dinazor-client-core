/**
 * Created by cabbar on 12.04.2017.
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DnSelect2Item } from '../dn-select2-item';

@Component({
    selector: 'dn-select2-results',
    templateUrl: 'dn-select2-results.component.html',
    styles: [`
        .select2-results-container {
            border: 1px solid #ddd;
            width: 100%;
            max-height: 200px;
            overflow-y: auto;
            position: absolute;
            background: #fff;
            margin-top: -11px;
            z-index: 3;
        }

        .select2-result {
            padding: 5px;
            position: relative;
            width: 100%;
        }

        .select2-result:hover {
            cursor: pointer;
        }

        .active {
            background: #337ab7;
            color: #fff;
        }

        .selected {
            background: #EEE;
            color: black;
        }
    `]
})
export class DnSelect2ResultsComponent implements OnInit {

    @Input() items: DnSelect2Item[];
    @Input() searchFocused: boolean;
    @Input() selectedItems: DnSelect2Item[];
    @Input() displaySelect: (res: any) => {};
    @Output() itemSelectedEvent: EventEmitter<any> = new EventEmitter();
    activeIndex: number = 0;
    private ussingKeys = false;

    constructor() {
    }

    activeNext() {
        if (this.activeIndex >= this.items.length - 1) {
            this.activeIndex = this.items.length - 1;
        } else {
            this.activeIndex++;
        }
        this.scrollToElement();
        this.ussingKeys = true;
    }

    activePrevious() {
        if (this.activeIndex - 1 < 0) {
            this.activeIndex = 0;
        } else {
            this.activeIndex--;
        }
        this.scrollToElement();
        this.ussingKeys = true;
    }

    getDisplaySelect(item: DnSelect2Item) {
        if (this.displaySelect === undefined) {
            return item.name;
        }
        return this.displaySelect(item);
    }

    isSelected(currentItem) {
        let result = false;
        this.selectedItems.forEach(item => {
            if (item === currentItem) {
                result = true;
            }
        });
        return result;
    }

    ngOnInit() {
    }

    onHovering(event) {
        this.ussingKeys = false;
    }

    onItemSelected(item: DnSelect2Item) {
        this.itemSelectedEvent.emit(item);
    }

    onMouseOver(index: number) {
        if (!this.ussingKeys) {
            this.activeIndex = index;
        }
    }

    scrollToElement() {
        let element = document.getElementById('item_' + this.activeIndex);
        let container = document.getElementById('resultsContainer');

        if (element) {
            container.scrollTop = element.offsetTop;
        }
    }

    selectCurrentItem() {
        if (this.items[this.activeIndex]) {
            this.onItemSelected(this.items[this.activeIndex]);
            this.activeIndex = 0;
        }
    }
}
