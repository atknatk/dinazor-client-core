import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap';
import { DnLogoutModule } from '../../views/auth/logout/logout.module';
import { ActivitiesMessageComponent } from './activities/activities-message/activities-message.component';
import { ActivitiesNotificationComponent } from './activities/activities-notification/activities-notification.component';
import { ActivitiesTaskComponent } from './activities/activities-task/activities-task.component';

import { ActivitiesComponent } from './activities/activities.component';
import { CollapseMenuComponent } from './collapse-menu/collapse-menu.component';
import { FullScreenComponent } from './full-screen/full-screen.component';
import { HeaderComponent } from './header.component';
import { RecentProjectsComponent } from './recent-projects/recent-projects.component';

// import { PopoverModule } from 'ngx-popover';

@NgModule({
    imports: [
        CommonModule,
        BsDropdownModule,
        FormsModule,
        DnLogoutModule
    ],
    declarations: [
        ActivitiesMessageComponent,
        ActivitiesNotificationComponent,
        ActivitiesTaskComponent,
        RecentProjectsComponent,
        FullScreenComponent,
        CollapseMenuComponent,
        ActivitiesComponent,
        HeaderComponent,
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule {
}
