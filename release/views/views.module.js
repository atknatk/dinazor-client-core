import { NgModule } from '@angular/core';
import { DnHttpService } from '../services/http.service';
import { DnNotificationService } from '../services/notification.service';
import { DnStorageService } from '../services/storage.service';
import { DnAuthService } from './auth/auth.service';
import { DnForgotModule } from './auth/forgot/forgot.module';
import { DnLockedModule } from './auth/locked/locked.module';
import { DnLoginModule } from './auth/login/login.module';
import { DnLogoutModule } from './auth/logout/logout.module';
import { DnRegisterModule } from './auth/register/register.module';
import { DnUserModule } from './user/user.module';
var modules = [
    DnUserModule,
    DnForgotModule,
    DnLockedModule,
    DnLoginModule,
    DnRegisterModule,
    DnLogoutModule
];
var ViewsModule = /** @class */ (function () {
    function ViewsModule() {
    }
    ViewsModule.decorators = [
        { type: NgModule, args: [{
                    imports: modules.slice(),
                    exports: modules.slice(),
                    providers: [
                        DnAuthService,
                        DnNotificationService,
                        DnHttpService,
                        DnStorageService
                    ]
                },] },
    ];
    /** @nocollapse */
    ViewsModule.ctorParameters = function () { return []; };
    return ViewsModule;
}());
export { ViewsModule };
//# sourceMappingURL=views.module.js.map