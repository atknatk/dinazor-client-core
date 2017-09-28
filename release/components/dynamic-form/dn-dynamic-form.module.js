/**
 * Created by cabbar on 27.03.2017.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DnDynamicFormQuestionComponent } from './dn-dynamic-form-question.component';
import { DnDynamicFormComponent } from './dn-dynamic-form.component';
import { DnDynamicFormWidgetComponent } from './dn-dynamic-form-widget/dn-dynamic-form-widget.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DnSelect2Module } from '../select/select2/dn-select2.module';
import { DnSelect2Service } from '../select/select2/dn-select2.service';
import { DirectivesModule } from '../../directive/directives.module';
import { DnWidgetsModule } from '../widget/dn-widgets.module';
var DnDynamicFormModule = /** @class */ (function () {
    function DnDynamicFormModule() {
    }
    DnDynamicFormModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        DirectivesModule,
                        DnSelect2Module,
                        DnWidgetsModule
                    ],
                    declarations: [DnDynamicFormQuestionComponent, DnDynamicFormWidgetComponent, DnDynamicFormComponent],
                    exports: [DnDynamicFormQuestionComponent, DnDynamicFormWidgetComponent, DnDynamicFormComponent],
                    providers: [DnSelect2Service]
                },] },
    ];
    /** @nocollapse */
    DnDynamicFormModule.ctorParameters = function () { return []; };
    return DnDynamicFormModule;
}());
export { DnDynamicFormModule };
//# sourceMappingURL=dn-dynamic-form.module.js.map