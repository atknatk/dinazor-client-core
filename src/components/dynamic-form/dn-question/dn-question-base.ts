/**
 * Created by cabbar on 27.03.2017.
 */
import { DnQuestionValidatorBase } from '../dn-question-validator/dn-question-validator-base';

export class DnQuestionBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  validator: DnQuestionValidatorBase[];
  id: string;
  disabled: boolean;
  columnLabelSize: number;
  columnQuestionSize: number;

  constructor(options: {
    value?: T,
    key?: string,
    label?: string,
    required?: boolean,
    order?: number,
    controlType?: string,
    validator?: DnQuestionValidatorBase[]
    id?: string;
    disabled?: boolean;
    columnLabelSize?: number;
    columnQuestionSize?: number;
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.validator = options.validator;
    this.id = options.id || options.key;
    this.disabled = options.disabled === undefined ? false : options.disabled;
    this.columnLabelSize = options.columnLabelSize || 4;
    this.columnQuestionSize = options.columnQuestionSize || 8;
  }
}
