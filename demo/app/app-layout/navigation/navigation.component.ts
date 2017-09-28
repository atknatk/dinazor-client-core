import { Component } from '@angular/core';
import { DinazorMenuModel } from './dinazor-menu.model';
import { DinazorMenuService } from './dinazor-menu.service';

@Component({

    selector: 'dn-navigation',
    templateUrl: './navigation.component.html'
})
export class NavigationComponent {

    menu: DinazorMenuModel[] = this.dinazorMenuService.getMenuList();

    constructor(private dinazorMenuService: DinazorMenuService) {
    }

}
