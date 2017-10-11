import { Compiler, Component } from '@angular/core';
import { Router } from '@angular/router';
import { DnNotificationService } from '../../../services/notification.service';
import { DnAuthService } from '../auth.service';
var DnLogoutComponent = /** @class */ (function () {
    function DnLogoutComponent(router, notificationService, authService, _compiler) {
        this.router = router;
        this.notificationService = notificationService;
        this.authService = authService;
        this._compiler = _compiler;
    }
    DnLogoutComponent.prototype.logout = function () {
        this.authService.logout();
        this._compiler.clearCache();
        this.router.navigate(['/auth/login']).then(function () {
            location.reload();
        });
    };
    DnLogoutComponent.prototype.showPopup = function () {
        var _this = this;
        this.notificationService.smartMessageBox({
            title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> \n                    Logout <span class='txt-color-orangeDark'></span> ?",
            content: 'Çıkış yapmak istediğinizden emin misiniz ?',
            buttons: '[Hayır][Evet]'
        }, function (buttonPressed) {
            if (buttonPressed === 'Evet') {
                _this.logout();
            }
        });
    };
    DnLogoutComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-logout',
                    template: "\n        <div id='logout' (click)='showPopup()' class='btn-header transparent pull-right'>\n        <span> <a routerlink='/auth/login' title='\u00C7\u0131k\u0131\u015F' data-action='userLogout'\n                  data-logout-msg='\u00C7\u0131k\u0131\u015F yapmak istedi\u011Finizden emin misiniz ?'><i\n                class='fa fa-sign-out'></i></a> </span>\n        </div>\n    ",
                    styles: []
                },] },
    ];
    /** @nocollapse */
    DnLogoutComponent.ctorParameters = function () { return [
        { type: Router, },
        { type: DnNotificationService, },
        { type: DnAuthService, },
        { type: Compiler, },
    ]; };
    return DnLogoutComponent;
}());
export { DnLogoutComponent };
//# sourceMappingURL=logout.component.js.map