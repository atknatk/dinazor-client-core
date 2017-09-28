"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DnQuestionBase = /** @class */ (function () {
    function DnQuestionBase(options) {
        if (options === void 0) { options = {}; }
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
    return DnQuestionBase;
}());
exports.DnQuestionBase = DnQuestionBase;
