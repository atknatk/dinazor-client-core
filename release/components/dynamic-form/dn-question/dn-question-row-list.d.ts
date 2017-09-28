import { DnQuestionRowBase } from './dn-question-row-base';
/**
 * Created by cabbar on 04.04.2017.
 */
export declare class DnQuestionRowList {
    type: string;
    row: Array<DnQuestionRowBase<any>>;
    rowClass: string;
    constructor(options?: {
        type?: string;
        row?: Array<DnQuestionRowBase<any>>;
        rowClass?: string;
    });
}
