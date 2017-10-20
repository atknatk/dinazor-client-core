import { CommonModule } from '@angular/common';
import { Compiler, ModuleWithProviders, NgModule } from '@angular/core';
import { DnHttpService } from '../../../services/http.service';
import { DnNotificationService } from '../../../services/notification.service';
import { DnStorageService } from '../../../services/storage.service';
import { DnAuthService } from '../auth.service';
import { DnLogoutConfigService } from './logout-config.service';
import { DnLogoutComponent } from './logout.component';
import { IDnLogoutConfig } from './logout.config';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [DnLogoutComponent],
    exports: [DnLogoutComponent],
    providers: [DnHttpService, DnAuthService, DnNotificationService, DnStorageService, Compiler, DnLogoutConfigService]
})
export class DnLogoutModule {
    static forRoot(loginConfig: IDnLogoutConfig): ModuleWithProviders {
        return {
            ngModule: DnLogoutModule,
            providers: [{provide: 'loginConfig', useValue: loginConfig}]
        };
    }
}
