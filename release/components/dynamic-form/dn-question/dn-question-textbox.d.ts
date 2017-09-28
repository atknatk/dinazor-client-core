/**
 * Created by cabbar on 27.03.2017.
 */
import { DnQuestionBase } from './dn-question-base';
export declare class DnTextboxQuestion extends DnQuestionBase<string> {
    controlType: string;
    mask: string;
    type: string;
    constructor(options?: {});
}
