import { EventEmitter } from '@angular/core';
import { DnLoadingBase } from '../../../components/loading/dn-loading.base';
import { DnCrudBase } from '../../../components/crud/dn-crud-base';
export declare class DnUserListComponent extends DnLoadingBase {
    actionChangeUserEmitter: EventEmitter<{}>;
    sampleCrudData: DnCrudBase;
    private reloadUserFromKullaniciGrup();
}
