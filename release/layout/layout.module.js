import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BsDropdownModule, TooltipModule } from 'ngx-bootstrap';
import { DnHttpService } from '../services/http.service';
import { DnNotificationService } from '../services/notification.service';
import { DnStorageService } from '../services/storage.service';
import { DnAuthService } from '../views/auth/auth.service';
import { DnFooterComponent } from './footer/footer.component';
import { HeaderModule } from './header/header.module';
import { LayoutService } from './layout.service';
import { RibbonComponent } from './ribbon/ribbon.component';
import { RouteBreadcrumbsComponent } from './ribbon/route-breadcrumbs.component';
var components = [
    DnFooterComponent,
    RibbonComponent,
    RouteBreadcrumbsComponent
];
var DinazorLayoutModule = /** @class */ (function () {
    function DinazorLayoutModule() {
    }
    DinazorLayoutModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        HeaderModule,
                        FormsModule,
                        RouterTestingModule,
                        TooltipModule.forRoot(),
                        BsDropdownModule.forRoot(),
                    ],
                    declarations: components.slice(),
                    exports: components.slice(),
                    providers: [
                        LayoutService,
                        DnAuthService,
                        DnNotificationService,
                        DnHttpService,
                        DnStorageService
                    ]
                },] },
    ];
    /** @nocollapse */
    DinazorLayoutModule.ctorParameters = function () { return []; };
    return DinazorLayoutModule;
}());
export { DinazorLayoutModule };
//# sourceMappingURL=layout.module.js.map