import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LayoutService } from './layout/layout.service';
import { DnHttpService } from './services/http.service';
import { DnNotificationService } from './services/notification.service';
import { DnAuthService } from './views/auth/auth.service';
import { DnServiceModule } from './services/service.module';

/**
 * Exported Modules
 * @type {Array}
 */
const modules = [
    CommonModule,
    FormsModule,
    HttpModule,
    DnServiceModule
];

@NgModule({
    providers: [
        LayoutService,
        DnHttpService,
        DnNotificationService,
        DnAuthService
    ],
    exports: [...modules],
    imports: [...modules]
})
export class DnCoreLightModule {
}
