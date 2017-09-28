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
export { DnLoadingBase };
//# sourceMappingURL=dn-loading.base.js.map