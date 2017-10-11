import { CommonModule } from '@angular/common';
import { Compiler, NgModule } from '@angular/core';
import { DnHttpService } from '../../../services/http.service';
import { DnNotificationService } from '../../../services/notification.service';
import { DnStorageService } from '../../../services/storage.service';
import { DnAuthService } from '../auth.service';
import { DnLogoutComponent } from './logout.component';
var DnLogoutModule = /** @class */ (function () {
    function DnLogoutModule() {
    }
    DnLogoutModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                    ],
                    declarations: [DnLogoutComponent],
                    exports: [DnLogoutComponent],
                    providers: [DnHttpService, DnAuthService, DnNotificationService, DnStorageService, Compiler]
                },] },
    ];
    /** @nocollapse */
    DnLogoutModule.ctorParameters = function () { return []; };
    return DnLogoutModule;
}());
export { DnLogoutModule };
//# sourceMappingURL=logout.module.js.map