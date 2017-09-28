import { DnQuestionRowList } from './dn-question-row-list';
import { isNullOrUndefined } from 'util';
import { DnQuestionFormButton } from './dn-question-form-button';
import { FormGroup } from '@angular/forms';
import { DnKeyValueBase } from '../../../model/keyvalue.model';
import { noop } from '../../../utils/common';

/**
 * Created by cabbar on 27.03.2017.
 */
export class DnQuestionFormBase<T> {
  id: string;
  questionRows: DnQuestionRowList[];
  submitButtonLabel: string;
  submitButtonEvent: string;
  submitButtonClass: string;
  submitContainerClass: string;
  submitContainerStyle: Array<DnKeyValueBase<string>>;
  isSetupValidate: boolean;
  formButtonList: DnQuestionFormButton[];
  formGroup: FormGroup;
  formGroupName: string;
  getForm: () => any = noop;
  // onAfterSubmit: () => any = noop;
  // onBeforeSubmit: () => any = noop;

  constructor(options: {
    id?: string,
    questionRows?: DnQuestionRowList[],
    submitButtonLabel?: string,
    submitButtonEvent?: string,
    submitButtonClass?: string,
    submitContainerClass?: string,
    submitContainerStyle?: Array<DnKeyValueBase<string>>,
    isSetupValidate?: boolean,
    formButtonList?: DnQuestionFormButton[],
    formGroup?: FormGroup
    formGroupName?: string
  } = {}) {
    this.id = options.id;
    this.questionRows = options.questionRows;
    this.submitButtonLabel = options.submitButtonLabel || '';
    this.submitButtonEvent = options.submitButtonEvent || '';
    this.submitButtonClass = options.submitButtonClass || '';
    this.submitContainerClass = options.submitContainerClass || '';
    this.submitContainerStyle = options.submitContainerStyle;
    this.isSetupValidate = isNullOrUndefined(options.isSetupValidate) ? true : options.isSetupValidate;
    this.formButtonList = options.formButtonList;
    this.formGroup = options.formGroup;
    this.formGroupName = options.formGroupName;
  }
}
