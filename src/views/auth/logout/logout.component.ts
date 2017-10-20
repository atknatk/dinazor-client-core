import { Compiler, Component } from '@angular/core';
import { Router } from '@angular/router';
import { config } from '../../../dinazor.config';
import { DnNotificationService } from '../../../services/notification.service';
import { DnStorageService } from '../../../services/storage.service';
import { DnAuthService } from '../auth.service';
import { DnLogoutConfigService } from './logout-config.service';

declare let $: any;

@Component({
    selector: 'dn-logout',
    template: `
        <div id='logout' (click)='showPopup()' class='btn-header transparent pull-right'>
        <span> <a routerlink='/auth/login' title='Çıkış' data-action='userLogout'
                  data-logout-msg='Çıkış yapmak istediğinizden emin misiniz ?'><i
                class='fa fa-sign-out'></i></a> </span>
        </div>
    `,
    styles: []
})
export class DnLogoutComponent {

    constructor(private router: Router,
                private notificationService: DnNotificationService,
                private authService: DnAuthService,
                private _compiler: Compiler,
                private _logoutConfigService: DnLogoutConfigService,
                private _tokenStorer: DnStorageService) {
    }

    logout() {
        this.authService.logout();
        this._compiler.clearCache();
        this.router.navigate(['/auth/login']).then(() => {
            this._tokenStorer.removeItem(config.DINAZOR_USER_KEY);
            if (this._logoutConfigService.logoutConfig.afterLogoutSuccessEvent) {
                this._logoutConfigService.logoutConfig.afterLogoutSuccessEvent();
            }
            location.reload();
        });
    }

    showPopup() {
        this.notificationService.smartMessageBox({
            title: `<i class='fa fa-sign-out txt-color-orangeDark'></i> 
                    Logout <span class='txt-color-orangeDark'></span> ?`,
            content: 'Çıkış yapmak istediğinizden emin misiniz ?',
            buttons: '[Hayır][Evet]'

        }, (buttonPressed) => {
            if (buttonPressed === 'Evet') {
                this.logout();
            }
        });
    }
}
