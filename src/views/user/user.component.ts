import { Component, ViewChild } from '@angular/core';
import { DnGroupListComponent } from './group-list/group-list.component';
import { DnAuthService } from '../auth/auth.service';
import { dinazorRoles } from '../../dinazor-role-enum';

@Component({
    selector: 'dn-user',
    templateUrl: './user.component.html'
})
export class DnUserComponent {
    loading = false;
    @ViewChild('dngrouplist') groupList: DnGroupListComponent;

    constructor(private _authService: DnAuthService) {

    }

    isUserAuth() {
        return this._authService.isAuthorized([dinazorRoles.UserDelete, dinazorRoles.UserView,
            dinazorRoles.UserUpdate, dinazorRoles.UserSave]);
    }

    isUserRoleAuth() {
        return this._authService.isAuthorized([dinazorRoles.UserGroupDelete, dinazorRoles.UserGroupSave,
            dinazorRoles.UserGroupUpdate,
            dinazorRoles.UserGroupView, dinazorRoles.RoleGroupDelete, dinazorRoles.RoleGroupUpdate,
            dinazorRoles.RoleGroupSave, dinazorRoles.RoleGroupView]);
    }

    changeUser() {
        if (this.groupList.userGroupList.userSelect)
            this.groupList.userGroupList.userSelect.getSelect2().getService().reload();
    }
}
