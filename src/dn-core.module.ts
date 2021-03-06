import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DinazorLayoutModule } from './layout/layout.module';
import { LayoutService } from './layout/layout.service';
import { DnHttpService } from './services/http.service';
import { ViewsModule } from './views/views.module';
import { ComponentsModule } from './components/components.module';
import { DnNotificationService } from './services/notification.service';
import { DirectivesModule } from './directive/directives.module';
import { DnServiceModule } from './services/service.module';

/**
 * Exported Modules
 * @type {Array}
 */
const modules = [
    CommonModule,
    FormsModule,
    HttpModule,
    DinazorLayoutModule,
    ViewsModule,
    ComponentsModule,
    DirectivesModule,
    DnServiceModule
];

@NgModule({
    providers: [
        LayoutService,
        DnHttpService,
        DnNotificationService
    ],
    exports: [...modules],
    imports: [...modules]
})
export class DnCoreModule {
}
