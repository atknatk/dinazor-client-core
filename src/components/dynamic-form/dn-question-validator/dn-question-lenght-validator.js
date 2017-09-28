"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var dn_question_validator_base_1 = require("./dn-question-validator-base");
/**
 * Created by cabbar on 06.04.2017.
 */
var DnQuestionLengthValidator = /** @class */ (function (_super) {
    __extends(DnQuestionLengthValidator, _super);
    function DnQuestionLengthValidator(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.minLength = options.minLength || 0;
        _this.maxLength = options.maxLength || Number.MAX_VALUE;
        return _this;
    }
    return DnQuestionLengthValidator;
}(dn_question_validator_base_1.DnQuestionValidatorBase));
exports.DnQuestionLengthValidator = DnQuestionLengthValidator;
