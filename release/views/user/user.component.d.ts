import { DnGroupListComponent } from './group-list/group-list.component';
import { DnAuthService } from '../auth/auth.service';
export declare class DnUserComponent {
    private _authService;
    loading: boolean;
    groupList: DnGroupListComponent;
    constructor(_authService: DnAuthService);
    isUserAuth(): boolean;
    isUserRoleAuth(): boolean;
    changeUser(): void;
}
