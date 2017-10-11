import { Component, ViewEncapsulation } from '@angular/core';
import { config } from '../../src/dinazor.config';
import { DnStorageService } from '../../src/services/storage.service';
import { DinazorMenuService } from './app-layout/navigation/dinazor-menu.service';

@Component({
    selector: 'dinazor-root',
    template: `
        <router-outlet></router-outlet>`,
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
    constructor(private _menu: DinazorMenuService,
                private storage: DnStorageService) {
        this.loadMenu();
    }

    private loadMenu() {
        this._menu.addMenu({
            label: 'Anasafya',
            roles: [-1],
            icon: 'fa fa-lg fa-fw fa-home',
            title: 'Anasafya',
            route: '/home',
            childrens: null
        });
        this._menu.addMenu({
            label: 'Kullanıcı',
            roles: [-1],
            icon: 'fa fa-lg fa-fw fa-user',
            title: 'Kullanıcı',
            route: '/kullanici',
            childrens: null
        });
        this.storage.setItem(config.DINAZOR_USER_KEY, {
            isAuthenticated: false,
            token: 'dinazor',
            isLicenceValidated: true,
            organizationLicence: [],
            roleList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            id: 1,
            mail: 'gtb',
            password: null
        });
    }
}
