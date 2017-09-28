/**
 * Created by cabbar on 27.03.2017.
 */
import { AfterViewInit, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DnQuestionBase } from './dn-question/dn-question-base';
import { Observable } from 'rxjs';
import 'inputmask/dist/inputmask/inputmask.extensions';
import 'inputmask/dist/inputmask/inputmask.date.extensions';
import 'inputmask/dist/inputmask/inputmask.phone.extensions';
import { DnSelect2Service } from '../select/select2/dn-select2.service';
import { DnSelect2Item } from '../select/select2/dn-select2-item';
import { DnSelect2Component } from '../select/select2/dn-select2.component';
import { DnKeyValueBase } from '../../model/keyvalue.model';
export declare class DnDynamicFormQuestionComponent implements OnInit, AfterViewInit {
    private service;
    private el;
    getItems: (ids: string[]) => Observable<any[]>;
    listItems: (term: string) => Observable<any>;
    listItemsMax: (term: string) => Observable<any>;
    entityToIqSelect2Item: (entity) => DnSelect2Item;
    count: number;
    dnSelect: DnSelect2Component<any>;
    question: DnQuestionBase<any>;
    form: FormGroup;
    result: Array<DnKeyValueBase<string>>;
    changeSelectEvent: EventEmitter<any>;
    private input;
    private $form;
    constructor(service: DnSelect2Service, el: ElementRef);
    readonly isHide: boolean;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    isValid(): boolean;
    getLabel(): string;
    getClass(): string;
    initData(): void;
    initDataUrl(url: string, item: DnSelect2Item): void;
    onSelect(item: DnSelect2Item): void;
    onRemove(item: DnSelect2Item): void;
    private isSelectRequiredValidator();
    private initMask();
    private extendMask();
    private getDatetime(onincomplete);
}
