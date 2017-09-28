import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DnHttpService } from '../../../services/http.service';
import { DnStorageService } from '../../../services/storage.service';
import { DnSelect2ContainerComponent } from './dn-select2-container/dn-select2-container.component';
import { DnSelect2ResultsComponent } from './dn-select2-results/dn-select2-results.component';
import { DnSelect2SmartContainerComponent } from './dn-select2-smart-container/dn-select2-smart-container.component';
import { DnSelect2Component } from './dn-select2.component';
/**
 * Created by cabbar on 12.04.2017.
 */
var DnSelect2Module = /** @class */ (function () {
    function DnSelect2Module() {
    }
    DnSelect2Module.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        DnSelect2Component,
                        DnSelect2ResultsComponent,
                        DnSelect2ContainerComponent,
                        DnSelect2SmartContainerComponent
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        HttpModule,
                        ReactiveFormsModule
                    ],
                    exports: [
                        DnSelect2Component,
                        DnSelect2ResultsComponent,
                        DnSelect2ContainerComponent,
                        DnSelect2SmartContainerComponent
                    ],
                    providers: [DnHttpService, DnStorageService]
                },] },
    ];
    /** @nocollapse */
    DnSelect2Module.ctorParameters = function () { return []; };
    return DnSelect2Module;
}());
export { DnSelect2Module };
//# sourceMappingURL=dn-select2.module.js.map