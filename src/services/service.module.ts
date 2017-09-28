import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DnHttpService } from './http.service';
import { DnNotificationService } from './notification.service';
import { DnStorageService } from './storage.service';
import { InjectionService } from './injection.service';
import { DnRouterServiceModue } from './router/router-service.modue';

/**
 * Exported Modules
 * @type {Array}
 */
const modules = [
    HttpModule,
    DnRouterServiceModue
];

@NgModule({
    providers: [
        DnHttpService,
        DnNotificationService,
        DnStorageService,
        InjectionService
    ],
    exports: [...modules],
    imports: [...modules]
})
export class DnServiceModule {
}
