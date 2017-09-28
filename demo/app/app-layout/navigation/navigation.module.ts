import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigBreadcrumbsComponent } from './big-breadcrumbs.component';
import { MinifyMenuComponent } from './minify-menu.component';
import { NavigationComponent } from './navigation.component';
import { SmartMenuDirective } from './smart-menu.directive';
import { RouterModule } from '@angular/router';
import { DinazorMenuComponent } from './dinazor-menu.component';
import { DinazorMenuService } from './dinazor-menu.service';

// import {ChatModule} from '../../chat/chat.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
        BigBreadcrumbsComponent,
        MinifyMenuComponent,
        NavigationComponent,
        DinazorMenuComponent,
        SmartMenuDirective,
    ],
    exports: [
        BigBreadcrumbsComponent,
        MinifyMenuComponent,
        NavigationComponent,
        DinazorMenuComponent,
        SmartMenuDirective,
    ],
    providers: [
        DinazorMenuService
    ]
})
export class NavigationModule {
}
