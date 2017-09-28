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
/**
 * Created by cabbar on 27.03.2017.
 */
var dn_question_base_1 = require("./dn-question-base");
var DnLabelQuestion = /** @class */ (function (_super) {
    __extends(DnLabelQuestion, _super);
    function DnLabelQuestion(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.controlType = 'label';
        _this.type = options['type'] || '';
        return _this;
    }
    return DnLabelQuestion;
}(dn_question_base_1.DnQuestionBase));
exports.DnLabelQuestion = DnLabelQuestion;
