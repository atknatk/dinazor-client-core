"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var big_breadcrumbs_component_1 = require("./big-breadcrumbs.component");
var minify_menu_component_1 = require("./minify-menu.component");
var navigation_component_1 = require("./navigation.component");
var smart_menu_directive_1 = require("./smart-menu.directive");
var router_1 = require("@angular/router");
var dinazor_menu_component_1 = require("./dinazor-menu.component");
var dinazor_menu_service_1 = require("./dinazor-menu.service");
// import {ChatModule} from '../../chat/chat.module';
var NavigationModule = /** @class */ (function () {
    function NavigationModule() {
    }
    NavigationModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
            ],
            declarations: [
                big_breadcrumbs_component_1.BigBreadcrumbsComponent,
                minify_menu_component_1.MinifyMenuComponent,
                navigation_component_1.NavigationComponent,
                dinazor_menu_component_1.DinazorMenuComponent,
                smart_menu_directive_1.SmartMenuDirective,
            ],
            exports: [
                big_breadcrumbs_component_1.BigBreadcrumbsComponent,
                minify_menu_component_1.MinifyMenuComponent,
                navigation_component_1.NavigationComponent,
                dinazor_menu_component_1.DinazorMenuComponent,
                smart_menu_directive_1.SmartMenuDirective,
            ],
            providers: [
                dinazor_menu_service_1.DinazorMenuService
            ]
        })
    ], NavigationModule);
    return NavigationModule;
}());
exports.NavigationModule = NavigationModule;
