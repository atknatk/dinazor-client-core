import { Component, ViewChild } from '@angular/core';
import { DnAuthService } from '../../auth/auth.service';
import { dinazorRoles } from '../../../dinazor-role-enum';
var DnGroupListComponent = /** @class */ (function () {
    function DnGroupListComponent(_auth) {
        this._auth = _auth;
        this.dinazorRoles = dinazorRoles;
        this.auth = _auth;
    }
    DnGroupListComponent.prototype.roleGroupChange = function () {
        this.userGroupList.roleGroupSelect.getSelect2().getService().reload();
    };
    DnGroupListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-group-list',
                    templateUrl: './group-list.component.html',
                },] },
    ];
    /** @nocollapse */
    DnGroupListComponent.ctorParameters = function () { return [
        { type: DnAuthService, },
    ]; };
    DnGroupListComponent.propDecorators = {
        'userGroupList': [{ type: ViewChild, args: ['usergrouplist',] },],
    };
    return DnGroupListComponent;
}());
export { DnGroupListComponent };
//# sourceMappingURL=group-list.component.js.map