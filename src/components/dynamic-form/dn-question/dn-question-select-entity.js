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
var common_1 = require("../../../utils/common");
var DnSelectQuestionEntity = /** @class */ (function (_super) {
    __extends(DnSelectQuestionEntity, _super);
    function DnSelectQuestionEntity(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.controlType = 'select2';
        _this.options = [];
        _this.options = options['options'] || [];
        _this.serviceUrl = options['serviceUrl'] || '';
        _this.referenceMode = options['referenceMode'] || 'entity';
        _this.displaySelect = options['displaySelect'];
        _this.selectedText = options['selectedText'];
        _this.onSelect = options['onSelect'] || common_1.noop;
        _this.onRemove = options['onRemove'] || common_1.noop;
        _this.serviceUrlFn = options['serviceUrlFn'] || common_1.noop;
        _this.triggerSelectIds = options['triggerSelectIds'];
        return _this;
    }
    return DnSelectQuestionEntity;
}(dn_question_base_1.DnQuestionBase));
exports.DnSelectQuestionEntity = DnSelectQuestionEntity;
