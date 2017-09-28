import { DnQuestionRowBase } from './dn-question-row-base';

/**
 * Created by cabbar on 04.04.2017.
 */
export class DnQuestionRowList {
    type: string;
    row: Array<DnQuestionRowBase<any>>;
    rowClass: string;

    constructor(options: {
        type?: string,
        row?: Array<DnQuestionRowBase<any>>,
        rowClass?: string,
    } = {}) {
        this.type = options.type || '';
        this.row = options.row;
        this.rowClass = options.rowClass || '';
    }
}
