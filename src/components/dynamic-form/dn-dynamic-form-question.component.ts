/**
 * Created by cabbar on 27.03.2017.
 */
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DnQuestionBase } from './dn-question/dn-question-base';
import { isNullOrUndefined, isUndefined } from 'util';
import { DnQuestionValidatorBase } from './dn-question-validator/dn-question-validator-base';
import { DnQuestionRequiredValidator } from './dn-question-validator/dn-question-required-validator';
import { DnSelectQuestion } from './dn-question/dn-question-select';
import { Observable } from 'rxjs';
import { DnTextboxQuestion } from './dn-question/dn-question-textbox';
import 'inputmask/dist/inputmask/inputmask.extensions';
import 'inputmask/dist/inputmask/inputmask.date.extensions';
import 'inputmask/dist/inputmask/inputmask.phone.extensions';
import Inputmask from 'inputmask/dist/inputmask/inputmask.numeric.extensions';
// import Inputmask from 'inputmask/dist/jquery.inputmask.bundle';
import { isString } from '../../utils/check';
import { DnSelect2Service } from '../select/select2/dn-select2.service';
import { DnSelect2Item } from '../select/select2/dn-select2-item';
import { DnSelect2Component } from '../select/select2/dn-select2.component';
import { DnKeyValueBase } from '../../model/keyvalue.model';

declare let $: any;

@Component({
    selector: 'dn-df-question',
    templateUrl: './dn-dynamic-form-question.component.html',
    styles: [`
        label .label-required {
            color: red;
        }

        .dn-checkbox {
            visibility: visible !important;
            margin: 2px;
        }
    `],
    providers: [DnSelect2Service]
})
export class DnDynamicFormQuestionComponent implements OnInit, AfterViewInit {

    public getItems: (ids: string[]) => Observable<any[]>;
    public listItems: (term: string) => Observable<any>;
    public listItemsMax: (term: string) => Observable<any>;
    public entityToIqSelect2Item: (entity) => DnSelect2Item;
    public count: number;

    @ViewChild(DnSelect2Component) dnSelect: DnSelect2Component<any>;
    @Input() question: DnQuestionBase<any>;
    @Input() form: FormGroup;
    @Input() result: Array<DnKeyValueBase<string>> = [];
    @Output() changeSelectEvent: EventEmitter<any> = new EventEmitter();
    @ViewChild('input') private input;
    private $form;

    constructor(private service: DnSelect2Service, private el: ElementRef) {
    }

    get isHide() {
        return this.form.controls[this.question.key].valid;
    }

    ngOnInit(): void {
        this.initData();
    }

    ngAfterViewInit(): void {
        this.$form = $(this.el.nativeElement).closest('dn-dynamic-form');
        this.initMask();
    }

    isValid() {
        return this.form.controls[this.question.key].valid;
    }

    getLabel() {
        let label = this.question.label;
        if (isUndefined(this.question.validator)) return label;

        this.question.validator.forEach((item: DnQuestionValidatorBase) => {
            if (item instanceof DnQuestionRequiredValidator && item.isActive) {
                label += '<span class=\'label-required\'>*</span>';
                return;
            }
        });
        return label;
    }

    getClass() {
        let requiredClass = '';
        if (this.question instanceof DnTextboxQuestion && this.question.type === 'checkbox') {
            requiredClass += 'dn-checkbox checkbox style-0';
        }

        if (isUndefined(this.question.validator)) return requiredClass;
        this.question.validator.forEach((item: DnQuestionValidatorBase) => {
            if (item instanceof DnQuestionRequiredValidator && item.isActive) {
                requiredClass += item.class;
                return;
            }
        });
        return requiredClass;
    }

    initData() {
        const question = this.question;
        if (question instanceof DnSelectQuestion) {
            const url = question.serviceUrl;
            if (isNullOrUndefined(url) || url === '') {
                this.result = question.options;
            } else {
                if (url.indexOf('[') > -1 && url.indexOf(']') > -1) {
                    // return;
                    // let id =  url.substring(url.indexOf('[')+1,url.indexOf(']'))
                    // $('#'+id)
                    // url.substring(0,url.indexOf('[')) + 'test' + url.substring(url.indexOf(']')+1,url.length)
                } else {
                    this.service.loadDataFromService(url);
                }
                this.listItems = (term: string) => this.service.listData(term, this.dnSelect.displaySelect);
                this.listItemsMax = (term: string) =>
                    this.service.listDataMax(term, 3, this.dnSelect.displaySelect).map((response) => {
                        this.count = response.count;
                        return response.results;
                    });

                this.getItems = (ids: string[]) => this.service.getItems(ids);
                this.entityToIqSelect2Item = (entity: any) => {
                    return {
                        id: entity.id,
                        name: entity.name,
                        entity
                    };
                };

            }

        }
    }

    initDataUrl(url: string, item: DnSelect2Item) {
        this.dnSelect.removeSelected();
        this.service.loadDataFromService(url);
        if (isNullOrUndefined(url)) return;
        this.listItems = (term: string) => this.service.listData(term, this.dnSelect.displaySelect);
        this.listItemsMax = (term: string) =>
            this.service.listDataMax(term, 3, this.dnSelect.displaySelect).map((response) => {
                this.count = response.count;
                return response.results;
            });

        this.getItems = (ids: string[]) => this.service.getItems(ids);
        this.entityToIqSelect2Item = (entity: any) => {
            return {
                id: entity.id,
                name: entity.name,
                entity
            };
        };

    }

    onSelect(item: DnSelect2Item) {

        this.changeSelectEvent.emit({
            question: this.question,
            item,
        });

        if (this.question instanceof DnSelectQuestion) {
            this.question.onSelect(item);
        }
    }

    onRemove(item: DnSelect2Item) {
        if (isNullOrUndefined(item)) return;
        console.log('Item removed: ' + item.name);
        const input = $(this.el.nativeElement).find('input');
        input.val('');
        if (this.question instanceof DnSelectQuestion) {
            this.question.onRemove(item);
        }
    }

    private isSelectRequiredValidator(): boolean {
        if (this.$form === undefined) return false;
        if (this.$form.bootstrapValidator === undefined) return false;
        if (this.question.validator === undefined) return false;
        let result: boolean = false;
        this.question.validator.forEach((x) => {
            if (x instanceof DnQuestionRequiredValidator) {
                result = true;
            }
        });
        return result;
    }

    private initMask() {
        if (this.question instanceof DnTextboxQuestion) {
            const mask = this.question.mask;
            if (mask) {
                this.extendMask();
                const onincomplete = () => {
                    if (this.form || isNullOrUndefined(this.question.key)) return;
                    this.form.controls[this.question.key].patchValue(null);
                };

                const inputMask: any = {
                    showMaskOnHover: false,
                    onincomplete
                };

                if (mask) {
                    if (isString(mask) && (mask === 'dnCurrency' ||
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
                    } else {
                        inputMask.mask = mask;
                    }
                    let im;
                    im = mask === 'dnDatetime' ? new Inputmask('datetime', this.getDatetime(onincomplete))
                        : new Inputmask(inputMask);

                    im.mask(this.input.nativeElement);
                }
            }
        }
    }

    private extendMask() {
        Inputmask.extendAliases({
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

        Inputmask.extendAliases({
            dnDecimal: {
                autoUnmask: true,
                alias: 'decimal',
                groupSeparator: ',',
                autoGroup: true,
                placeholder: '',
                showMaskOnHover: false
            }
        });
    }

    private getDatetime(onincomplete) {
        return {
            mask: '1/2/y h:s',
            placeholder: 'dd/mm/yyyy hh:mm',
            separator: '/',
            alias: 'dd/mm/yyyy',
            onincomplete,
            showMaskOnHover: false
        };
    }
}
