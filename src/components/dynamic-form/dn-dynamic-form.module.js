"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by cabbar on 27.03.2017.
 */
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var dn_dynamic_form_question_component_1 = require("./dn-dynamic-form-question.component");
var dn_dynamic_form_component_1 = require("./dn-dynamic-form.component");
var dn_dynamic_form_widget_component_1 = require("./dn-dynamic-form-widget/dn-dynamic-form-widget.component");
var forms_1 = require("@angular/forms");
var dn_select2_module_1 = require("../select/select2/dn-select2.module");
var dn_select2_service_1 = require("../select/select2/dn-select2.service");
var directives_module_1 = require("../../directive/directives.module");
var dn_widgets_module_1 = require("../widget/dn-widgets.module");
var DnDynamicFormModule = /** @class */ (function () {
    function DnDynamicFormModule() {
    }
    DnDynamicFormModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                directives_module_1.DirectivesModule,
                dn_select2_module_1.DnSelect2Module,
                dn_widgets_module_1.DnWidgetsModule
            ],
            declarations: [dn_dynamic_form_question_component_1.DnDynamicFormQuestionComponent, dn_dynamic_form_widget_component_1.DnDynamicFormWidgetComponent, dn_dynamic_form_component_1.DnDynamicFormComponent],
            exports: [dn_dynamic_form_question_component_1.DnDynamicFormQuestionComponent, dn_dynamic_form_widget_component_1.DnDynamicFormWidgetComponent, dn_dynamic_form_component_1.DnDynamicFormComponent],
            providers: [dn_select2_service_1.DnSelect2Service]
        })
    ], DnDynamicFormModule);
    return DnDynamicFormModule;
}());
exports.DnDynamicFormModule = DnDynamicFormModule;
