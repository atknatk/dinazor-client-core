import { isNullOrUndefined } from 'util';
import { noop } from '../../../utils/common';
/**
 * Created by cabbar on 27.03.2017.
 */
var DnQuestionFormBase = /** @class */ (function () {
    // onAfterSubmit: () => any = noop;
    // onBeforeSubmit: () => any = noop;
    function DnQuestionFormBase(options) {
        if (options === void 0) { options = {}; }
        this.getForm = noop;
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
    return DnQuestionFormBase;
}());
export { DnQuestionFormBase };
//# sourceMappingURL=dn-question-form-base.js.map