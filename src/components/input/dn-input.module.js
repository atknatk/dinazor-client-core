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
var dn_input_component_1 = require("./dn-input.component");
var dn_smart_input_component_1 = require("./smart-input/dn-smart-input.component");
var dn_textarea_component_1 = require("./dn-textarea/dn-textarea.component");
/**
 * Created by cabbar on 12.04.2017.
 */
var DnInputModule = /** @class */ (function () {
    function DnInputModule() {
    }
    DnInputModule = __decorate([
        core_1.NgModule({
            declarations: [
                dn_input_component_1.DnInputComponent,
                dn_smart_input_component_1.DnSmartInputComponent,
                dn_textarea_component_1.DnTextareaComponent
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule
            ],
            exports: [
                dn_input_component_1.DnInputComponent,
                dn_smart_input_component_1.DnSmartInputComponent,
                dn_textarea_component_1.DnTextareaComponent
            ]
        })
    ], DnInputModule);
    return DnInputModule;
}());
exports.DnInputModule = DnInputModule;
