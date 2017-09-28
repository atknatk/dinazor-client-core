import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule, TooltipModule } from 'ngx-bootstrap';
import { DnHttpService } from '../services/http.service';
import { DnNotificationService } from '../services/notification.service';
import { DnStorageService } from '../services/storage.service';
import { DnAuthService } from '../views/auth/auth.service';
import { DnFooterComponent } from './footer/footer.component';

import { HeaderModule } from './header/header.module';
import { LayoutService } from './layout.service';
import { RibbonComponent } from './ribbon/ribbon.component';

const components = [
    DnFooterComponent,
    RibbonComponent,
];

@NgModule({
    imports: [
        CommonModule,
        HeaderModule,
        FormsModule,
        TooltipModule.forRoot(),
        BsDropdownModule.forRoot(),
    ],
    declarations: [...components],
    exports: [...components],
    providers: [
        LayoutService,
        DnAuthService,
        DnNotificationService,
        DnHttpService,
        DnStorageService
    ]
})
export class DinazorLayoutModule {

}
