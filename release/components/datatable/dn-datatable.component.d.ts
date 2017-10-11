import { ChangeDetectorRef, ElementRef, EventEmitter, OnInit } from '@angular/core';
import 'datatables.net-bs';
import 'datatables.net-buttons-bs';
import { DnStorageService } from '../../services/storage.service';
import { DnDatatableBase } from './dn-datatable.base';
export declare class DnDatatableComponent implements OnInit {
    private el;
    private cdRef;
    private dnStorageService;
    datatable: any;
    datatableOption: any;
    dnDatatableBase: DnDatatableBase;
    filter: any;
    detailsFormat: any;
    paginationLength: boolean;
    columnsHide: boolean;
    tableClass: string;
    width: string;
    editButton: boolean;
    deleteButton: boolean;
    actionEditEmitter: EventEmitter<any>;
    actionDeleteEmitter: EventEmitter<any>;
    constructor(el: ElementRef, cdRef: ChangeDetectorRef, dnStorageService: DnStorageService);
    actionDelete(event: any): void;
    actionEdit(event: any): void;
    ngOnInit(): void;
    render(): void;
}
