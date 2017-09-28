import { Component, ViewChild } from '@angular/core';
import { DnAuthService } from '../auth/auth.service';
import { dinazorRoles } from '../auth/dinazor-roles';
var DnUserComponent = /** @class */ (function () {
    function DnUserComponent(_authService) {
        this._authService = _authService;
        this.loading = false;
    }
    DnUserComponent.prototype.isUserAuth = function () {
        return this._authService.isAuthorized([dinazorRoles.UserDelete, dinazorRoles.UserView,
            dinazorRoles.UserUpdate, dinazorRoles.UserSave]);
    };
    DnUserComponent.prototype.isUserRoleAuth = function () {
        return this._authService.isAuthorized([dinazorRoles.UserGroupDelete, dinazorRoles.UserGroupSave,
            dinazorRoles.UserGroupUpdate,
            dinazorRoles.UserGroupView, dinazorRoles.RoleGroupDelete, dinazorRoles.RoleGroupUpdate,
            dinazorRoles.RoleGroupSave, dinazorRoles.RoleGroupView]);
    };
    DnUserComponent.prototype.changeUser = function () {
        if (this.groupList.userGroupList.userSelect)
            this.groupList.userGroupList.userSelect.getSelect2().getService().reload();
    };
    DnUserComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-user',
                    templateUrl: './user.component.html'
                },] },
    ];
    /** @nocollapse */
    DnUserComponent.ctorParameters = function () { return [
        { type: DnAuthService, },
    ]; };
    DnUserComponent.propDecorators = {
        'groupList': [{ type: ViewChild, args: ['dngrouplist',] },],
    };
    return DnUserComponent;
}());
export { DnUserComponent };
//# sourceMappingURL=user.component.js.map