import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DnCrudModule } from '../../components/crud/dn-crud.module';
import { DnDatatableModule } from '../../components/datatable/dn-datatable.module';
import { DnInputModule } from '../../components/input/dn-input.module';
import { DnLoadingModule } from '../../components/loading/dn-loading.module';
import { DnSelect2Module } from '../../components/select/select2/dn-select2.module';
import { DnWidgetsModule } from '../../components/widget/dn-widgets.module';
import { DnHttpService } from '../../services/http.service';
import { DnNotificationService } from '../../services/notification.service';
import { DnStorageService } from '../../services/storage.service';
import { DnAuthService } from '../auth/auth.service';
import { DnGroupListComponent } from './group-list/group-list.component';
import { DnRoleGroupListComponent } from './group-list/role-group/role-group.component';
import { DnUserGroupListComponent } from './group-list/user-group/user-group.component';
import { DnUserListComponent } from './user-list/user-list.component';
import { DnUserComponent } from './user.component';

const components = [
    DnUserComponent,
    DnUserListComponent,
    DnGroupListComponent,
    DnUserGroupListComponent,
    DnRoleGroupListComponent
];

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        DnCrudModule,
        ReactiveFormsModule,
        DnLoadingModule,
        DnDatatableModule,
        DnInputModule,
        DnSelect2Module,
        DnWidgetsModule
    ],
    declarations: [...components],
    exports: [...components],
    providers: [
        DnAuthService,
        DnNotificationService,
        DnHttpService,
        DnStorageService
    ]
})
export class DnUserModule {
}
