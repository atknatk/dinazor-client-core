import { OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import 'jquery-ui-npm/jquery-ui.min.js';
import { DnLoadingBase } from '../../../../components/loading/dn-loading.base';
import { DnSelect2Item } from '../../../../components/select/select2/dn-select2-item';
import { DnSelect2SmartContainerComponent } from '../../../../components/select/select2/dn-select2-smart-container/dn-select2-smart-container.component';
import { DnHttpService } from '../../../../services/http.service';
import { DnNotificationService } from '../../../../services/notification.service';
import { DnAuthService } from '../../../auth/auth.service';
export declare class DnUserGroupListComponent extends DnLoadingBase implements OnInit {
    private _http;
    private _nfs;
    private _fb;
    private _authService;
    roleGroupSelect: DnSelect2SmartContainerComponent;
    userSelect: DnSelect2SmartContainerComponent;
    dinazorRoles: any;
    auth: DnAuthService;
    private kullaniciGrubuListesi;
    private kullaniciListesi;
    private roleGroupListesi;
    private kullaniciGrubuFilteredList;
    private kullaniciGrubuSelectedRow;
    private kullaniciGrupDialog;
    private kullaniciGrubuEditForm;
    private kullaniciAtamaLoading;
    private roleGroupAtamaLoading;
    private config;
    private kullaniciGrubuTerm;
    private kullaniciGrubuSearchTerm;
    constructor(_http: DnHttpService<any>, _nfs: DnNotificationService, _fb: FormBuilder, _authService: DnAuthService);
    editKullaniciGrubu(item: any): void;
    kullaniciGrubuSearchKeypress(e: any): void;
    ngOnInit(): void;
    onSelectRoleGroup(item: DnSelect2Item): void;
    onSelectUser(item: DnSelect2Item): void;
    removeKullaniciFromGroup(item: any): void;
    removeKullaniciGrubu(item: any): void;
    removeRoleGroupFromUserGroup(item: any): void;
    saveKullaniciGrubu(): void;
    saveKullaniciGrubuKeypress(e: any): void;
    searchKullaniciGrubu(): void;
    private editKullaniciGurubu(data);
    private getKullaniciGrubuEditDialogOptions();
    private loadKullaniciGrubu();
    private loadRoleGroupFromUserGroup(id);
    private loadUserFromUserGroup(id);
    private setClickedKullaniciGrubuRow(i);
}