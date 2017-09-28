"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by cabbar on 04.04.2017.
 */
var DnQuestionRowList = /** @class */ (function () {
    function DnQuestionRowList(options) {
        if (options === void 0) { options = {}; }
        this.type = options.type || '';
        this.row = options.row;
        this.rowClass = options.rowClass || '';
    }
    return DnQuestionRowList;
}());
exports.DnQuestionRowList = DnQuestionRowList;
