import { DnQuestionRowList } from './dn-question-row-list';

/**
 * Created by cabbar on 21.04.2017.
 */

export class DnQuestionLegend extends DnQuestionRowList {
    title: string;

    constructor(options: {
        type?: string,
        title?: string
    } = {}) {
        super({type: 'legend'});
        this.title = options.title;
    }
}
