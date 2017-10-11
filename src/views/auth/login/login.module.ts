import { CommonModule } from '@angular/common';
import { Compiler, ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DnLoadingModule } from '../../../components/loading/dn-loading.module';
import { DnHttpService } from '../../../services/http.service';
import { DnNotificationService } from '../../../services/notification.service';
import { DnStorageService } from '../../../services/storage.service';
import { DnAuthService } from '../auth.service';
import { DnLoginConfigService } from './login-config.service';
import { DnLoginComponent } from './login.component';
import { IDnLoginConfig } from './login.config';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DnLoadingModule
    ],
    declarations: [DnLoginComponent],
    exports: [DnLoginComponent],
    providers: [DnHttpService, DnLoginConfigService, DnStorageService, DnNotificationService, DnAuthService, Compiler]
})
export class DnLoginModule {
    static forRoot(loginConfig: IDnLoginConfig): ModuleWithProviders {
        return {
            ngModule: DnLoginModule,
            providers: [{provide: 'loginConfig', useValue: loginConfig}]
        };
    }
}
