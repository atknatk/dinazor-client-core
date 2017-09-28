/**
 * Created by cabbar on 12.04.2017.
 */
import { EventEmitter, OnInit } from '@angular/core';
import { DnSelect2Item } from '../dn-select2-item';
export declare class DnSelect2ResultsComponent implements OnInit {
    items: DnSelect2Item[];
    searchFocused: boolean;
    selectedItems: DnSelect2Item[];
    displaySelect: (res: any) => {};
    itemSelectedEvent: EventEmitter<any>;
    activeIndex: number;
    private ussingKeys;
    constructor();
    activeNext(): void;
    activePrevious(): void;
    getDisplaySelect(item: DnSelect2Item): {};
    isSelected(currentItem: any): boolean;
    ngOnInit(): void;
    onHovering(event: any): void;
    onItemSelected(item: DnSelect2Item): void;
    onMouseOver(index: number): void;
    scrollToElement(): void;
    selectCurrentItem(): void;
}
