"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by cabbar on 16.03.2017.
 */
var core_1 = require("@angular/core");
var DinazorMenuComponent = /** @class */ (function () {
    function DinazorMenuComponent() {
        this.menuData = [];
    }
    __decorate([
        core_1.Input()
    ], DinazorMenuComponent.prototype, "menuData", void 0);
    DinazorMenuComponent = __decorate([
        core_1.Component({
            selector: 'dinazor-menu',
            template: '<ul dnSmartMenu>' +
                '<li routerLinkActive="active"  *ngFor="let menu of menuData">' +
                '<a *ngIf="menu.route != \'#\'" routerLink="{{menu.route}}" title="{{menu.title}}">' +
                '<i class="{{menu.icon}}"></i>' +
                '<span class="menu-item-parent">{{menu.label}}</span>' +
                '</a>' +
                '<a *ngIf="menu.route == \'#\'" href="#">' +
                '<i class="{{menu.icon}}"></i>' +
                '<span class="menu-item-parent">{{menu.label}}</span>' +
                '</a>' +
                '<ul *ngIf="menu.route == \'#\'">' +
                '<li routerLinkActive="active" *ngFor="let submenu of menu.childrens">' +
                '<a routerLink="{{submenu.route}}" title="{{menu.title}} / {{submenu.title}}">' +
                '<i class="{{submenu.icon}}"></i> ' +
                '{{submenu.label}}' +
                '</a>' +
                '</li>' +
                '</ul>' +
                '</li>' +
                '</ul>'
            // template : '<ul dnSmartMenu>' +
            // '<li routerLinkActive='active' *ngFor='let menu of menus.data'>' +
            //   '<a routerLink='{{menu.route}}' title='{{menu.title}}'>' +
            //     '<i class='{{menu.icon}}'></i>' +
            //     '<span class='menu-item-parent'>{{menu.label}}</span>' +
            //   '</a>' +
            // '</li>' +
            // '</ul>'
        })
    ], DinazorMenuComponent);
    return DinazorMenuComponent;
}());
exports.DinazorMenuComponent = DinazorMenuComponent;
