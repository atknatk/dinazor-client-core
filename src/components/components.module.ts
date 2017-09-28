import { NgModule } from '@angular/core';
import { DnHttpService } from '../services/http.service';
import { DnNotificationService } from '../services/notification.service';
import { DnStorageService } from '../services/storage.service';
import { DnAuthService } from '../views/auth/auth.service';
import { DnCrudModule } from './crud/dn-crud.module';
import { DnDatatableModule } from './datatable/dn-datatable.module';
import { DnInputModule } from './input/dn-input.module';
import { JqueryUiModule } from './jquery-ui/jquery-ui.module';
import { DnLoadingModule } from './loading/dn-loading.module';
import { DnSelect2Module } from './select/select2/dn-select2.module';
import { DnWidgetsModule } from './widget/dn-widgets.module';

const modules = [
    DnDatatableModule,
    DnInputModule,
    DnLoadingModule,
    DnSelect2Module,
    DnCrudModule,
    DnWidgetsModule,
    JqueryUiModule
];

@NgModule({
    imports: [...modules],
    exports: [...modules],
    providers: [
        DnAuthService,
        DnNotificationService,
        DnHttpService,
        DnStorageService]
})
export class ComponentsModule {
}
