import { AfterViewInit, ElementRef, OnInit } from '@angular/core';
export declare class WidgetComponent implements OnInit, AfterViewInit {
    el: ElementRef;
    static counter: number;
    widgetId: string;
    name: string;
    colorbutton: boolean;
    editbutton: boolean;
    togglebutton: boolean;
    deletebutton: boolean;
    fullscreenbutton: boolean;
    custombutton: boolean;
    collapsed: boolean;
    sortable: boolean;
    hidden: boolean;
    color: string;
    load: boolean;
    refresh: boolean;
    searchbutton: boolean;
    constructor(el: ElementRef);
    ngOnInit(): void;
    ngAfterViewInit(): any;
}
