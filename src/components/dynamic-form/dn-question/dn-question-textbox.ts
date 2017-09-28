/**
 * Created by cabbar on 27.03.2017.
 */
import { DnQuestionBase } from './dn-question-base';

export class DnTextboxQuestion extends DnQuestionBase<string> {
  controlType = 'textbox';
  mask: string;
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.mask = options['mask'] || '';
  }
}
