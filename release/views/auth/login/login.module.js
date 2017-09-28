import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DnLoadingModule } from '../../../components/loading/dn-loading.module';
import { DnHttpService } from '../../../services/http.service';
import { DnNotificationService } from '../../../services/notification.service';
import { DnStorageService } from '../../../services/storage.service';
import { DnAuthService } from '../auth.service';
import { DnLoginConfigService } from './login-config.service';
import { DnLoginComponent } from './login.component';
var DnLoginModule = /** @class */ (function () {
    function DnLoginModule() {
    }
    DnLoginModule.forRoot = function (loginConfig) {
        return {
            ngModule: DnLoginModule,
            providers: [{ provide: 'loginConfig', useValue: loginConfig }]
        };
    };
    DnLoginModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        DnLoadingModule
                    ],
                    declarations: [DnLoginComponent],
                    exports: [DnLoginComponent],
                    providers: [DnHttpService, DnLoginConfigService, DnStorageService, DnNotificationService, DnAuthService]
                },] },
    ];
    /** @nocollapse */
    DnLoginModule.ctorParameters = function () { return []; };
    return DnLoginModule;
}());
export { DnLoginModule };
//# sourceMappingURL=login.module.js.map