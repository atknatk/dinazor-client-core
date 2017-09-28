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
 * Created by cabbar on 05.04.2017.
 */
var DnQuestionRequiredValidator = /** @class */ (function (_super) {
    __extends(DnQuestionRequiredValidator, _super);
    function DnQuestionRequiredValidator(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.class = options.class;
        return _this;
    }
    return DnQuestionRequiredValidator;
}(dn_question_validator_base_1.DnQuestionValidatorBase));
exports.DnQuestionRequiredValidator = DnQuestionRequiredValidator;
