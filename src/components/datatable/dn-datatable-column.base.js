"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by cabbar on 28.03.2017.
 */
var DnDatatableColumnBase = /** @class */ (function () {
    function DnDatatableColumnBase(options) {
        if (options === void 0) { options = {}; }
        this.title = options.title;
        this.width = options.width;
        this.class = options.class || '';
        this.columnType = options.columnType || 'text';
        this.style = options.style || '';
        this.content = options.content;
        this.serverKey = options.serverKey;
        this.orderable = options.orderable === undefined || options.orderable == null ? true : options.orderable;
        this.dateFormat = options.dateFormat;
        this.hideInCrud = options.hideInCrud === undefined || options.hideInCrud == null ? false : options.hideInCrud;
        this.render = options.render;
    }
    return DnDatatableColumnBase;
}());
exports.DnDatatableColumnBase = DnDatatableColumnBase;
