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
/**
 * Created by cabbar on 27.03.2017.
 */
import { DnQuestionBase } from './dn-question-base';
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
}(DnQuestionBase));
export { DnLabelQuestion };
//# sourceMappingURL=dn-question-label.js.map