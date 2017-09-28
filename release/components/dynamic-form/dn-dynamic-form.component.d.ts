/**
 * Created by cabbar on 27.03.2017.
 */
import { AfterViewInit, ElementRef, EventEmitter, OnInit, QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DnQuestionControlService } from './dn-question/dn-question-control.service';
import { DnQuestionFormBase } from './dn-question/dn-question-form-base';
import { DnQuestionBase } from './dn-question/dn-question-base';
import { DnDynamicFormQuestionComponent } from './dn-dynamic-form-question.component';
export declare class DnDynamicFormComponent implements OnInit, AfterViewInit {
    private qcs;
    private el;
    form: FormGroup;
    formBase: DnQuestionFormBase<DnQuestionBase<any>>;
    dnform: FormGroup;
    payLoadData: EventEmitter<string>;
    childs: QueryList<DnDynamicFormQuestionComponent>;
    validatorOptions: any;
    private $form;
    constructor(qcs: DnQuestionControlService, el: ElementRef);
    formData: any;
    ngAfterViewInit(): void;
    ngOnInit(): void;
    onSubmit(): void;
    clearForm(): void;
    resetForm(): void;
    initValidator(): void;
    changeSelectEventEmit(data: any): void;
    private attach();
}
