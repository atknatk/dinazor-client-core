import { Component, ViewChild } from '@angular/core';
import { DnAuthService } from '../../auth/auth.service';
import { dinazorRoles } from '../../auth/dinazor-roles';
import { DnUserGroupListComponent } from './user-group/user-group.component';

/**
 * Created by cabbar on 03.05.2017.
 */
declare let $: any;

@Component({
    selector: 'dn-group-list',
    templateUrl: './group-list.component.html',
})
export class DnGroupListComponent {
    dinazorRoles = dinazorRoles;
    auth: DnAuthService;
    @ViewChild('usergrouplist') userGroupList: DnUserGroupListComponent;

    constructor(private _auth: DnAuthService) {
        this.auth = _auth;
    }

    roleGroupChange() {
        this.userGroupList.roleGroupSelect.getSelect2().getService().reload();
    }

}
