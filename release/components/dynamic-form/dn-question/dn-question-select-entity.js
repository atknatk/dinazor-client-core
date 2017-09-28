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
import { noop } from '../../../utils/common';
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
        _this.onSelect = options['onSelect'] || noop;
        _this.onRemove = options['onRemove'] || noop;
        _this.serviceUrlFn = options['serviceUrlFn'] || noop;
        _this.triggerSelectIds = options['triggerSelectIds'];
        return _this;
    }
    return DnSelectQuestionEntity;
}(DnQuestionBase));
export { DnSelectQuestionEntity };
//# sourceMappingURL=dn-question-select-entity.js.map