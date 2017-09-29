import { Component, ViewChild } from '@angular/core';
import { DnAuthService } from '../../auth/auth.service';
import { DnUserGroupListComponent } from './user-group/user-group.component';
import { dinazorRoles } from '../../../dinazor-role-enum';

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
