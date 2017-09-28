/**
 * Created by cabbar on 27.03.2017.
 */
import { DnSelectQuestionEntity } from './dn-question-select-entity';

export class DnSelectQuestion extends DnSelectQuestionEntity<string> {
    constructor(options: {} = {}) {
        super(options);
    }
}
