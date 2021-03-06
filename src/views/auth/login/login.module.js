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
var login_component_1 = require("./login.component");
var forms_1 = require("@angular/forms");
var http_service_1 = require("../../../services/http.service");
var dn_loading_module_1 = require("../../../components/loading/dn-loading.module");
var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                dn_loading_module_1.DnLoadingModule
            ],
            declarations: [login_component_1.LoginComponent],
            exports: [login_component_1.LoginComponent],
            providers: [http_service_1.DnHttpService]
        })
    ], LoginModule);
    return LoginModule;
}());
exports.LoginModule = LoginModule;
