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
var dn_question_row_list_1 = require("./dn-question-row-list");
/**
 * Created by cabbar on 21.04.2017.
 */
var DnQuestionLegend = /** @class */ (function (_super) {
    __extends(DnQuestionLegend, _super);
    function DnQuestionLegend(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, { type: 'legend' }) || this;
        _this.title = options.title;
        return _this;
    }
    return DnQuestionLegend;
}(dn_question_row_list_1.DnQuestionRowList));
exports.DnQuestionLegend = DnQuestionLegend;
