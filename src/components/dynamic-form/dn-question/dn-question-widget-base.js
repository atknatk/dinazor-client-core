"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by cabbar on 27.03.2017.
 */
var DnQuestionWidgetBase = /** @class */ (function () {
    function DnQuestionWidgetBase(options) {
        if (options === void 0) { options = {}; }
        this.formBase = options.formBase;
        this.title = options.title || '';
        this.column = options.column || '';
        this.id = options.id || '';
    }
    return DnQuestionWidgetBase;
}());
exports.DnQuestionWidgetBase = DnQuestionWidgetBase;
