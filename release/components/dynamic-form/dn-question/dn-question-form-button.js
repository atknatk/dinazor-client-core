import { noop } from '../../../utils/common';
/**
 * Created by cabbar on 27.03.2017.
 */
var DnQuestionFormButton = /** @class */ (function () {
    function DnQuestionFormButton(options) {
        if (options === void 0) { options = {}; }
        this.id = options.id;
        this.icon = options.icon || '';
        this.label = options.label || '';
        this.submitButtonClass = options.submitButtonClass || '';
        this.submitButtonEvent = options.submitButtonEvent || noop;
        this.disabled = options.disabled;
    }
    return DnQuestionFormButton;
}());
export { DnQuestionFormButton };
//# sourceMappingURL=dn-question-form-button.js.map