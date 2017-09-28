"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var check_1 = require("../../utils/check");
var common_1 = require("../../utils/common");
var guid_1 = require("../../utils/guid");
/**
 * Created by cabbar on 28.03.2017.
 */
var DnDatatableBase = /** @class */ (function () {
    function DnDatatableBase(options) {
        if (options === void 0) { options = {}; }
        this.getDatatable = common_1.noop;
        this.restUrl = options.restUrl;
        this.id = options.id || guid_1.Guid.newGuid();
        this.columns = options.columns;
        this.editRole = options.editRole;
        this.deleteRole = options.deleteRole;
        this.class = options.class || '';
        this.editButton = options.editButton;
        this.deleteButton = options.deleteButton;
        this.option = options.option || {};
        this.widgetId = options.widgetId;
        this.refreshButton = check_1.isNullOrUndefined(options.refreshButton) ? false : options.refreshButton;
        this.afterInit = check_1.isNullOrUndefined(options.afterInit) ? common_1.noop : options.afterInit;
    }
    return DnDatatableBase;
}());
exports.DnDatatableBase = DnDatatableBase;
