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

const modules = [
    DnUserModule,
    DnForgotModule,
    DnLockedModule,
    DnLoginModule,
    DnRegisterModule,
    DnLogoutModule
];

@NgModule({
    imports: [...modules],
    exports: [...modules],
    providers: [
        DnAuthService,
        DnNotificationService,
        DnHttpService,
        DnStorageService]
})
export class ViewsModule {
}
