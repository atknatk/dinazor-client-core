"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var code_editor_module_1 = require("./code-editor/code-editor.module");
var dn_datatable_module_1 = require("./datatable/dn-datatable.module");
var dn_input_module_1 = require("./input/dn-input.module");
var dn_loading_module_1 = require("./loading/dn-loading.module");
var dn_select2_module_1 = require("./select/select2/dn-select2.module");
var dn_crud_module_1 = require("./crud/dn-crud.module");
var dn_widgets_module_1 = require("./widget/dn-widgets.module");
var modules = [
    code_editor_module_1.CodeEditorModule,
    dn_datatable_module_1.DnDatatableModule,
    dn_input_module_1.DnInputModule,
    dn_loading_module_1.DnLoadingModule,
    dn_select2_module_1.DnSelect2Module,
    dn_crud_module_1.DnCrudModule,
    dn_widgets_module_1.DnWidgetsModule
];
var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        core_1.NgModule({
            imports: modules.slice(),
            exports: modules.slice(),
        })
    ], ComponentsModule);
    return ComponentsModule;
}());
exports.ComponentsModule = ComponentsModule;
