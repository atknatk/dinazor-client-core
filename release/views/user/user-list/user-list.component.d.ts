import { EventEmitter } from '@angular/core';
import { DnCrudBase } from '../../../components/crud/dn-crud-base';
import { DnLoadingBase } from '../../../components/loading/dn-loading.base';
export declare class DnUserListComponent extends DnLoadingBase {
    actionChangeUserEmitter: EventEmitter<{}>;
    sampleCrudData: DnCrudBase;
    private reloadUserFromKullaniciGrup();
}
