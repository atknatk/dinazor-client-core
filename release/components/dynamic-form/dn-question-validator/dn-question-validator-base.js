/**
 * Created by cabbar on 05.04.2017.
 */
var DnQuestionValidatorBase = /** @class */ (function () {
    function DnQuestionValidatorBase(options) {
        if (options === void 0) { options = {}; }
        this.message = options.message;
        this.isActive = options.isActive == null ? true : options.isActive;
    }
    return DnQuestionValidatorBase;
}());
export { DnQuestionValidatorBase };
//# sourceMappingURL=dn-question-validator-base.js.map