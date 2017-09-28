import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DnHttpService } from '../../../services/http.service';
import { DnLogoutComponent } from './logout.component';
import { DnAuthService } from '../auth.service';
import { DnNotificationService } from '../../../services/notification.service';
import { DnStorageService } from '../../../services/storage.service';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [DnLogoutComponent],
    exports: [DnLogoutComponent],
    providers: [DnHttpService, DnAuthService, DnNotificationService, DnStorageService]
})
export class DnLogoutModule {
}
