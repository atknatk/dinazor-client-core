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
var dn_loading_component_1 = require("./dn-loading.component");
var dn_loading_service_1 = require("./dn-loading.service");
var dn_loading_content_component_1 = require("./dn-loading-content.component");
var DnLoadingModule = /** @class */ (function () {
    function DnLoadingModule() {
    }
    DnLoadingModule_1 = DnLoadingModule;
    DnLoadingModule.forRoot = function (loadingConfig) {
        return {
            ngModule: DnLoadingModule_1,
            providers: [{ provide: 'loadingConfig', useValue: loadingConfig }]
        };
    };
    DnLoadingModule = DnLoadingModule_1 = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            exports: [dn_loading_component_1.DnLoadingComponent, dn_loading_content_component_1.DnLoadingContentComponent],
            declarations: [dn_loading_component_1.DnLoadingComponent, dn_loading_content_component_1.DnLoadingContentComponent],
            providers: [dn_loading_service_1.DnLoadingConfigService],
        })
    ], DnLoadingModule);
    return DnLoadingModule;
    var DnLoadingModule_1;
}());
exports.DnLoadingModule = DnLoadingModule;
