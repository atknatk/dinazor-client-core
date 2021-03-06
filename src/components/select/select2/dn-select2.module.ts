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

@NgModule({
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
})
export class DnSelect2Module {
}
