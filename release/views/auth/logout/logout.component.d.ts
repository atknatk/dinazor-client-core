import { Router } from '@angular/router';
import { DnNotificationService } from '../../../services/notification.service';
import { DnAuthService } from '../auth.service';
export declare class DnLogoutComponent {
    private router;
    private notificationService;
    private authService;
    constructor(router: Router, notificationService: DnNotificationService, authService: DnAuthService);
    logout(): void;
    showPopup(): void;
}
