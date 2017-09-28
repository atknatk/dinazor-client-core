"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_module_1 = require("./user/user.module");
var forgot_module_1 = require("./auth/forgot/forgot.module");
var locked_module_1 = require("./auth/locked/locked.module");
var login_module_1 = require("./auth/login/login.module");
var register_module_1 = require("./auth/register/register.module");
var auth_service_1 = require("./auth/auth.service");
var modules = [
    user_module_1.UserModule,
    forgot_module_1.ForgotModule,
    locked_module_1.LockedModule,
    login_module_1.LoginModule,
    register_module_1.RegisterModule
];
var ViewsModule = /** @class */ (function () {
    function ViewsModule() {
    }
    ViewsModule = __decorate([
        core_1.NgModule({
            imports: modules.slice(),
            exports: modules.slice(),
            providers: [auth_service_1.DnAuthService]
        })
    ], ViewsModule);
    return ViewsModule;
}());
exports.ViewsModule = ViewsModule;
