var DnCrudBase = /** @class */ (function () {
    function DnCrudBase(options) {
        if (options === void 0) { options = {}; }
        this.restUrl = options.restUrl;
        this.searchForm = options.searchForm;
        this.editForm = options.editForm;
        this.datatableOptions = options.datatableOptions;
        this.title = options.title;
        if (this.searchForm.submitButtonLabel)
            this.searchForm.submitButtonLabel = 'Ara';
        if (this.editForm.submitButtonLabel)
            this.editForm.submitButtonLabel = 'Kaydet';
    }
    return DnCrudBase;
}());
export { DnCrudBase };
//# sourceMappingURL=dn-crud-base.js.map