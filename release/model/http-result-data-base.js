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
import { DnResultBase } from './http-result-base';
var DnResultDataBase = /** @class */ (function (_super) {
    __extends(DnResultDataBase, _super);
    function DnResultDataBase(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.data = options.data;
        return _this;
    }
    return DnResultDataBase;
}(DnResultBase));
export { DnResultDataBase };
//# sourceMappingURL=http-result-data-base.js.map