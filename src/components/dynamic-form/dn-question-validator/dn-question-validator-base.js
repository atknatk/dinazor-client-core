"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.DnQuestionValidatorBase = DnQuestionValidatorBase;
