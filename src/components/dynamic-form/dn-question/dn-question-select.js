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
var dn_question_select_entity_1 = require("./dn-question-select-entity");
var DnSelectQuestion = /** @class */ (function (_super) {
    __extends(DnSelectQuestion, _super);
    function DnSelectQuestion(options) {
        if (options === void 0) { options = {}; }
        return _super.call(this, options) || this;
    }
    return DnSelectQuestion;
}(dn_question_select_entity_1.DnSelectQuestionEntity));
exports.DnSelectQuestion = DnSelectQuestion;
