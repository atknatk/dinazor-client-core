import { Compiler } from '@angular/core';
import { Router } from '@angular/router';
import { DnNotificationService } from '../../../services/notification.service';
import { DnAuthService } from '../auth.service';
export declare class DnLogoutComponent {
    private router;
    private notificationService;
    private authService;
    private _compiler;
    constructor(router: Router, notificationService: DnNotificationService, authService: DnAuthService, _compiler: Compiler);
    logout(): void;
    showPopup(): void;
}
