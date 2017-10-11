import { CommonModule } from '@angular/common';
import { Compiler, NgModule } from '@angular/core';
import { DnHttpService } from '../../../services/http.service';
import { DnNotificationService } from '../../../services/notification.service';
import { DnStorageService } from '../../../services/storage.service';
import { DnAuthService } from '../auth.service';
import { DnLogoutComponent } from './logout.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [DnLogoutComponent],
    exports: [DnLogoutComponent],
    providers: [DnHttpService, DnAuthService, DnNotificationService, DnStorageService, Compiler]
})
export class DnLogoutModule {
}
