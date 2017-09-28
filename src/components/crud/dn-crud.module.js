"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by cabbar on 28.03.2017.
 */
var core_1 = require("@angular/core");
var dn_crud_component_1 = require("./dn-crud.component");
var dn_crud_datatable_component_1 = require("./dn-crud-datatable/dn-crud-datatable.component");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var dn_datatable_module_1 = require("../datatable/dn-datatable.module");
var dn_dynamic_form_module_1 = require("../dynamic-form/dn-dynamic-form.module");
var http_service_1 = require("../../services/http.service");
var dn_widgets_module_1 = require("../widget/dn-widgets.module");
var DnCrudModule = /** @class */ (function () {
    function DnCrudModule() {
    }
    DnCrudModule = __decorate([
        core_1.NgModule({
            imports: [
                dn_datatable_module_1.DnDatatableModule,
                dn_dynamic_form_module_1.DnDynamicFormModule,
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                dn_widgets_module_1.DnWidgetsModule
            ],
            declarations: [
                dn_crud_component_1.DnCrudComponent,
                dn_crud_datatable_component_1.DnCrudDatatableComponent
            ],
            exports: [
                dn_crud_component_1.DnCrudComponent,
                dn_crud_datatable_component_1.DnCrudDatatableComponent
            ],
            providers: [
                http_service_1.DnHttpService
            ]
        })
    ], DnCrudModule);
    return DnCrudModule;
}());
exports.DnCrudModule = DnCrudModule;
