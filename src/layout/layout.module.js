"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var header_module_1 = require("./header/header.module");
var dinazor_menu_service_1 = require("./navigation/dinazor-menu.service");
var navigation_module_1 = require("./navigation/navigation.module");
var ribbon_component_1 = require("./ribbon/ribbon.component");
var route_breadcrumbs_component_1 = require("./ribbon/route-breadcrumbs.component");
var testing_1 = require("@angular/router/testing");
var layout_service_1 = require("./layout.service");
var footer_component_1 = require("./footer/footer.component");
var main_layout_component_1 = require("./app-layouts/main-layout.component");
var empty_layout_component_1 = require("./app-layouts/empty-layout.component");
var auth_layout_component_1 = require("./app-layouts/auth-layout.component");
var components = [
    footer_component_1.DnFooterComponent,
    ribbon_component_1.RibbonComponent,
    main_layout_component_1.DnLayoutComponent,
    empty_layout_component_1.DnEmptyLayoutComponent,
    auth_layout_component_1.DnAuthLayoutComponent,
    route_breadcrumbs_component_1.RouteBreadcrumbsComponent
];
var DinazorLayoutModule = /** @class */ (function () {
    function DinazorLayoutModule() {
    }
    DinazorLayoutModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                header_module_1.HeaderModule,
                navigation_module_1.NavigationModule,
                forms_1.FormsModule,
                testing_1.RouterTestingModule,
                ngx_bootstrap_1.TooltipModule.forRoot(),
                ngx_bootstrap_1.BsDropdownModule.forRoot(),
            ],
            declarations: components.slice(),
            exports: components.slice(),
            providers: [
                dinazor_menu_service_1.DinazorMenuService,
                layout_service_1.LayoutService
            ]
        })
    ], DinazorLayoutModule);
    return DinazorLayoutModule;
}());
exports.DinazorLayoutModule = DinazorLayoutModule;
