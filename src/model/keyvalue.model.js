"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by cabbar on 30.03.2017.
 */
var DnKeyValueBase = /** @class */ (function () {
    function DnKeyValueBase(options) {
        if (options === void 0) { options = {}; }
        this.key = options.key;
        this.value = options.value || '';
    }
    return DnKeyValueBase;
}());
exports.DnKeyValueBase = DnKeyValueBase;
