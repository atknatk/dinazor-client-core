import { DnAuthService } from '../../auth/auth.service';
import { DnUserGroupListComponent } from './user-group/user-group.component';
export declare class DnGroupListComponent {
    private _auth;
    dinazorRoles: any;
    auth: DnAuthService;
    userGroupList: DnUserGroupListComponent;
    constructor(_auth: DnAuthService);
    roleGroupChange(): void;
}
