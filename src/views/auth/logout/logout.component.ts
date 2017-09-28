import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DnNotificationService } from '../../../services/notification.service';
import { DnAuthService } from '../auth.service';

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
                private authService: DnAuthService) {
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
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
