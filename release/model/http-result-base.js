/**
 * Created by cabbar on 18.04.2017.
 */
var DnResultBase = /** @class */ (function () {
    function DnResultBase(options) {
        if (options === void 0) { options = {}; }
        this.status = options.status;
        this.label = options.label;
        this.message = options.message;
        this.objectId = options.objectId;
        this.isSuccess = options.isSuccess;
    }
    return DnResultBase;
}());
export { DnResultBase };
//# sourceMappingURL=http-result-base.js.map