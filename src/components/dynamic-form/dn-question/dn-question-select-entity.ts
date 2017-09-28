/**
 * Created by cabbar on 27.03.2017.
 */
import { DnQuestionBase } from './dn-question-base';
import { DnSelectTriggerModel } from './dn-select-trigger-model';
import { noop } from '../../../utils/common';
import { DnKeyValueBase } from '../../../model/keyvalue.model';
import { DnSelect2Item } from '../../select/select2/dn-select2-item';

export class DnSelectQuestionEntity<T> extends DnQuestionBase<T> {
    controlType: string = 'select2';
    options: Array<DnKeyValueBase<string>> = [];
    serviceUrl: string;
    serviceUrlFn: (param: DnSelectTriggerModel) => string;
    displaySelect: (res: DnSelect2Item) => {};
    selectedText: (res: DnSelect2Item) => {};
    onSelect: (res: DnSelect2Item) => void;
    onRemove: (res: DnSelect2Item) => void;
    triggerSelectIds: string[];
    referenceMode: string;

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
        this.serviceUrl = options['serviceUrl'] || '';
        this.referenceMode = options['referenceMode'] || 'entity';
        this.displaySelect = options['displaySelect'];
        this.selectedText = options['selectedText'];
        this.onSelect = options['onSelect'] || noop;
        this.onRemove = options['onRemove'] || noop;
        this.serviceUrlFn = options['serviceUrlFn'] || noop;
        this.triggerSelectIds = options['triggerSelectIds'];
    }
}
