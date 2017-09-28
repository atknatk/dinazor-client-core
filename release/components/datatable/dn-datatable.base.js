import { isNullOrUndefined } from '../../utils/check';
import { noop } from '../../utils/common';
import { Guid } from '../../utils/guid';
/**
 * Created by cabbar on 28.03.2017.
 */
var DnDatatableBase = /** @class */ (function () {
    function DnDatatableBase(options) {
        if (options === void 0) { options = {}; }
        this.getDatatable = noop;
        this.restUrl = options.restUrl;
        this.id = options.id || Guid.newGuid();
        this.columns = options.columns;
        this.editRole = options.editRole;
        this.deleteRole = options.deleteRole;
        this.class = options.class || '';
        this.editButton = options.editButton;
        this.deleteButton = options.deleteButton;
        this.option = options.option || {};
        this.widgetId = options.widgetId;
        this.refreshButton = isNullOrUndefined(options.refreshButton) ? false : options.refreshButton;
        this.afterInit = isNullOrUndefined(options.afterInit) ? noop : options.afterInit;
    }
    return DnDatatableBase;
}());
export { DnDatatableBase };
//# sourceMappingURL=dn-datatable.base.js.map