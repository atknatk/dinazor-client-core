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
var dbl_click_copy_directive_1 = require("./dbl-click-copy.directive");
var visibility_directive_1 = require("./visibility.directive");
var dn_style_directive_1 = require("./dn-style.directive");
var directives = [
    visibility_directive_1.VisibilityDirective,
    dbl_click_copy_directive_1.DblClickCopyDirective,
    dn_style_directive_1.DnStyleDirective
];
var DirectivesModule = /** @class */ (function () {
    function DirectivesModule() {
    }
    DirectivesModule = __decorate([
        core_1.NgModule({
            declarations: directives.slice(),
            exports: directives.slice(),
            imports: [common_1.CommonModule]
        })
    ], DirectivesModule);
    return DirectivesModule;
}());
exports.DirectivesModule = DirectivesModule;
