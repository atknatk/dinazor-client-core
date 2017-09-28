"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DnLoadingBase = /** @class */ (function () {
    function DnLoadingBase() {
        this.loading = false;
    }
    DnLoadingBase.prototype.loadingContext = function () {
        // const that = this;
        return {
            // context: that,
            loading: 'loading'
        };
    };
    return DnLoadingBase;
}());
exports.DnLoadingBase = DnLoadingBase;
