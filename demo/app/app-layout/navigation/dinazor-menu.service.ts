import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import { DinazorMenuModel } from './dinazor-menu.model';

@Injectable()
export class DinazorMenuService {

    public menuList: DinazorMenuModel[] = [];

    addMenu(menu: DinazorMenuModel): void {
        this.menuList.push(menu);
    }

    getMenuList(): DinazorMenuModel[] {
        return this.menuList;
    }

    /* getMenuList() {

       return this.menuList =
            [
                {
                    'label': 'Anasayfa',
                    'route': '/home',
                    'icon': 'fa fa-lg fa-fw fa-home',
                    'title': 'Anasayfa'
                },
                {
                    'label': 'Özet Beyan',
                    'route': '#',
                    'icon': 'fa fa-lg fa-fw fa-file-text',
                    'title': 'Özet Beyan',
                    'childrens': [
                        {
                            'label': 'Özet Beyan',
                            'route': '/ozetbeyan/ozetbeyan',
                            'icon': 'fa fa-file-text',
                            'title': 'Özet Beyan'
                        },
                        {
                            'label': 'Özet Beyan Liste',
                            'route': '/ozetbeyan/ozetbeyan-list',
                            'icon': 'fa fa-list-alt',
                            'title': 'Özet Beyan Liste'
                        }
                    ]
                },
                {
                    'label': 'Varış Bildirimi',
                    'route': '#',
                    'icon': 'fa fa-lg fa-fw fa-plane rotate-180',
                    'title': 'Varış Bildirimi',
                    'childrens': [
                        {
                            'label': 'Varış Bildirimi',
                            'route': '/varisbildirimi/varisbildirimi',
                            'icon': 'fa fa-lg fa-fw fa-plane rotate-180',
                            'title': 'Varış Bildirimi'
                        },
                        {
                            'label': 'Varış Bildirimi Liste',
                            'route': '/varisbildirimi/varisbildirimi-list',
                            'icon': 'fa fa-list-alt',
                            'title': 'Varış Bildirimi Liste'
                        }
                    ]
                }, {
                'label': 'Çıkış Bildirimi',
                'route': '#',
                'icon': 'fa fa-lg fa-fw fa-plane',
                'title': 'Çıkış Bildirimi',
                'childrens': [
                    {
                        'label': 'Çıkış Bildirimi',
                        'route': '/cikisbildirimi/cikisbildirimi',
                        'icon': 'fa fa-lg fa-fw fa-plane', 'title': 'Özet Beyan'
                    },
                    {
                        'label': 'Çıkış Bildirimi Liste',
                        'route': '/cikisbildirimi/cikisbildirimi-list',
                        'icon': 'fa fa-list-alt',
                        'title': 'Çıkış Bildirimi Liste'
                    }
                ]
            },
                {
                    'label': 'Detaylı Beyan',
                    'route': '#',
                    'icon': 'fa fa-lg fa-fw fa-files-o',
                    'title': 'Detaylı Beyan',
                    'childrens': [
                        {
                            'label': 'Detaylı Beyan',
                            'route': '/detaylibeyan/detaylibeyan',
                            'icon': 'fa fa-files-o',
                            'title': 'Detaylı Beyan'
                        },
                        {
                            'label': 'Detaylı Beyan Liste',
                            'route': '/detaylibeyan/detaylibeyan-list',
                            'icon': 'fa fa-list-alt',
                            'title': 'Detaylı Beyan Liste'
                        }
                    ]
                },
                {
                    'label': 'NCTS',
                    'route': '#',
                    'icon': 'fa fa-lg fa-fw fa-truck',
                    'title': 'Detaylı Beyan',
                    'childrens': [
                        {
                            'label': 'NCTS',
                            'route': '/ncts/ncts',
                            'icon': 'fa fa-truck',
                            'title': 'Detaylı Beyan'
                        },
                        {
                            'label': 'NCTS Liste',
                            'route': '/ncts/ncts-list',
                            'icon': 'fa fa-list-alt',
                            'title': 'Detaylı Beyan Liste'
                        }
                    ]
                },
                {
                    'label': 'Kullanıcı',
                    'route': '/kullanici',
                    'icon': 'fa fa-lg fa-fw fa-user',
                    'title': 'Kullanıcı'
                },
                {
                    'label': 'Tanımlamalar',
                    'route': '#',
                    'icon': 'fa fa-lg fa-fw fa-gears',
                    'title': 'Tanımlamalar',
                    'childrens': [
                        {
                            'label': 'Firma',
                            'route': '/tanimlamalar/firma',
                            'icon': 'fa fa-building',
                            'title': 'Firma'
                        }
                    ]
                }
            ];
    }*/
}
