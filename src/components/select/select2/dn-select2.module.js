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
var http_1 = require("@angular/http");
var http_service_1 = require("../../../services/http.service");
var storage_service_1 = require("../../../services/storage.service");
var dn_select2_container_component_1 = require("./dn-select2-container/dn-select2-container.component");
var dn_select2_results_component_1 = require("./dn-select2-results/dn-select2-results.component");
var dn_select2_smart_container_component_1 = require("./dn-select2-smart-container/dn-select2-smart-container.component");
var dn_select2_component_1 = require("./dn-select2.component");
/**
 * Created by cabbar on 12.04.2017.
 */
var DnSelect2Module = /** @class */ (function () {
    function DnSelect2Module() {
    }
    DnSelect2Module = __decorate([
        core_1.NgModule({
            declarations: [
                dn_select2_component_1.DnSelect2Component,
                dn_select2_results_component_1.DnSelect2ResultsComponent,
                dn_select2_container_component_1.DnSelect2ContainerComponent,
                dn_select2_smart_container_component_1.DnSelect2SmartContainerComponent
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                forms_1.ReactiveFormsModule
            ],
            exports: [
                dn_select2_component_1.DnSelect2Component,
                dn_select2_results_component_1.DnSelect2ResultsComponent,
                dn_select2_container_component_1.DnSelect2ContainerComponent,
                dn_select2_smart_container_component_1.DnSelect2SmartContainerComponent
            ],
            providers: [http_service_1.DnHttpService, storage_service_1.DnStorageService]
        })
    ], DnSelect2Module);
    return DnSelect2Module;
}());
exports.DnSelect2Module = DnSelect2Module;
