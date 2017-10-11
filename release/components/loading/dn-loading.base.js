var DnLoadingBase = /** @class */ (function () {
    function DnLoadingBase() {
        this.loading = false;
    }
    // protected readonly context: any;
    // constructor(context: any) {
    //     this.context = context;
    // }
    DnLoadingBase.prototype.loadingContext = function (context) {
        return {
            context: context,
            loading: 'loading'
        };
    };
    return DnLoadingBase;
}());
export { DnLoadingBase };
//# sourceMappingURL=dn-loading.base.js.map