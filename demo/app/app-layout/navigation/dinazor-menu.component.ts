/**
 * Created by cabbar on 16.03.2017.
 */
import { Component, Input } from '@angular/core';

@Component({
    selector: 'dinazor-menu',
    template: `
        <ul dnSmartMenu>
            <li routerLinkActive="active" *ngFor="let menu of menuData">
                <a *ngIf="menu.route != \'#\'" routerLink="{{menu.route}}" title="{{menu.title}}">
                    <i class="{{menu.icon}}"></i>
                    <span class="menu-item-parent">{{menu.label}}</span>
                </a>
                <a *ngIf="menu.route == \'#\'" href="#">
                    <i class="{{menu.icon}}"></i>
                    <span class="menu-item-parent">{{menu.label}}</span>
                </a>
                <ul *ngIf="menu.route == \'#\'">
                    <li routerLinkActive="active" *ngFor="let submenu of menu.childrens">
                        <a routerLink="{{submenu.route}}" title="{{menu.title}} / {{submenu.title}}">
                            <i class="{{submenu.icon}}"></i>
                            {{submenu.label}}
                        </a>
                    </li>
                </ul>
            </li>
        </ul>`

})

export class DinazorMenuComponent {
    @Input() menuData = [];
}
