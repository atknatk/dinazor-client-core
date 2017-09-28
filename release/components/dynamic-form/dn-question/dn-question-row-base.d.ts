import { DnQuestionBase } from './dn-question-base';
/**
 * Created by cabbar on 04.04.2017.
 */
export declare class DnQuestionRowBase<T> {
    rowSize: number;
    question: DnQuestionBase<T>;
    constructor(options?: {
        rowSize?: number;
        question?: DnQuestionBase<T>;
    });
}
