"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../../../utils/common");
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
        this.submitButtonEvent = options.submitButtonEvent || common_1.noop;
        this.disabled = options.disabled;
    }
    return DnQuestionFormButton;
}());
exports.DnQuestionFormButton = DnQuestionFormButton;
