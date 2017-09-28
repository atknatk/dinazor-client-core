import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import 'jquery-ui-npm/jquery-ui.min.js';
import { DnLoadingBase } from '../../../../components/loading/dn-loading.base';
import { DnSelect2Item } from '../../../../components/select/select2/dn-select2-item';
import { DnSelect2SmartContainerComponent } from '../../../../components/select/select2/dn-select2-smart-container/dn-select2-smart-container.component';
import { DnHttpService } from '../../../../services/http.service';
import { DnNotificationService } from '../../../../services/notification.service';
import { isNullOrUndefined, isNullOrUndefinedOrEmpty } from '../../../../utils/check';
import { DnAuthService } from '../../../auth/auth.service';
import { dinazorRoles } from '../../../auth/dinazor-roles';

const KEY_CODE_ENTER = 13;
const KEY_CODE_DELETE = 8;
/**
 * Created by cabbar on 03.05.2017.
 */
declare let $: any;

@Component({
    selector: 'dn-user-group-list',
    templateUrl: './user-group.component.html',
    styles: [`
        .table tr.active td {
            background-color: paleturquoise !important;
        }
    `],
    providers: [DnHttpService]
})
export class DnUserGroupListComponent extends DnLoadingBase implements OnInit {

    @ViewChild('rolegroupselect') public roleGroupSelect: DnSelect2SmartContainerComponent;
    @ViewChild('userselect') public userSelect: DnSelect2SmartContainerComponent;
    dinazorRoles = dinazorRoles;
    auth: DnAuthService;
    private kullaniciGrubuListesi: any[];
    private kullaniciListesi: any[];
    private roleGroupListesi: any[];
    private kullaniciGrubuFilteredList: any[];
    private kullaniciGrubuSelectedRow: number = NaN;
    private kullaniciGrupDialog: any;
    private kullaniciGrubuEditForm: FormGroup;
    private kullaniciAtamaLoading: boolean = false;
    private roleGroupAtamaLoading: boolean = false;
    private config = {
        userSelect: (item) => {
            return item.entity.username + ' (' + item.entity.name + ' ' + item.entity.surname + ')';
        },
        userSelectTable: (item) => {
            return item.username + ' (' + item.name + ' ' + item.surname + ')';
        }

    };
    @ViewChild('kullanicigrubuterm') private kullaniciGrubuTerm: any;
    @ViewChild('kullanicigrubusearchterm') private kullaniciGrubuSearchTerm: any;

    constructor(private _http: DnHttpService<any>,
                private _nfs: DnNotificationService,
                private _fb: FormBuilder,
                private _authService: DnAuthService) {
        super();
        this.auth = _authService;
    }

    editKullaniciGrubu(item) {
        this.kullaniciGrupDialog.dialog('open');
        this.kullaniciGrubuEditForm.patchValue(item);
    }

    kullaniciGrubuSearchKeypress(e) {
        if (e.keyCode === KEY_CODE_ENTER) {
            this.searchKullaniciGrubu();
        }
    }

    ngOnInit() {
        this.kullaniciGrubuEditForm = this._fb.group({id: 0});
        this.loadKullaniciGrubu();
        this.kullaniciGrupDialog = $('#kullanici-grup-dialog').dialog(this.getKullaniciGrubuEditDialogOptions());

    }

    onSelectRoleGroup(item: DnSelect2Item) {
        this.roleGroupAtamaLoading = true;
        const userGroupId = this.kullaniciGrubuFilteredList[this.kullaniciGrubuSelectedRow].id;
        this._http.post(null, 'RoleGroup/' + item.id + '/UserGroup/' + userGroupId).subscribe(res => {
            if (!res.isSuccess) {
                this._nfs.showDinazorResultMessage(res);
                this.roleGroupAtamaLoading = false;
            } else {
                this.loadRoleGroupFromUserGroup(userGroupId);
            }
        });
    }

    onSelectUser(item: DnSelect2Item) {
        this.kullaniciAtamaLoading = true;
        const userGroupId = this.kullaniciGrubuFilteredList[this.kullaniciGrubuSelectedRow].id;
        this._http.post(null, 'User/' + item.id + '/UserGroup/' + userGroupId).subscribe(res => {
            if (!res.isSuccess) {
                this._nfs.showDinazorResultMessage(res);
                this.kullaniciAtamaLoading = false;
            } else {
                this.loadUserFromUserGroup(userGroupId);
            }
        });
    }

    removeKullaniciFromGroup(item) {
        this.kullaniciAtamaLoading = true;
        const userGroupId = this.kullaniciGrubuFilteredList[this.kullaniciGrubuSelectedRow].id;
        this._nfs.removeConfirm(() => {
            this._http.setUrl('User/' + item.id + '/UserGroup');
            return this._http.delete(userGroupId);
        }, this.loadUserFromUserGroup.bind(this), this.kullaniciGrubuFilteredList[this.kullaniciGrubuSelectedRow].id);
    }

    removeKullaniciGrubu(item) {
        this._nfs.removeConfirm(() => {
            this._http.setUrl('userGroup');
            return this._http.delete(item.id);
        }, this.loadKullaniciGrubu.bind(this));
    }

    removeRoleGroupFromUserGroup(item) {
        this.roleGroupAtamaLoading = true;
        const userGroupId = this.kullaniciGrubuFilteredList[this.kullaniciGrubuSelectedRow].id;
        this._nfs.removeConfirm(() => {
                this._http.setUrl('RoleGroup/' + item.id + '/UserGroup');
                return this._http.delete(userGroupId);
            }, this.loadRoleGroupFromUserGroup.bind(this),
            this.kullaniciGrubuFilteredList[this.kullaniciGrubuSelectedRow].id);
    }

    saveKullaniciGrubu() {
        if (isNullOrUndefined(this.kullaniciGrubuTerm)) return;
        const val = this.kullaniciGrubuTerm.nativeElement.value;
        if (isNullOrUndefinedOrEmpty(val)) {
            this._nfs.showWarning('Kullanıcı grubu adı giriniz.!!');
        } else {
            this._http.post({name: val}, 'userGroup', this.loadingContext()).subscribe(res => {
                if (res.isSuccess) {
                    this.loadKullaniciGrubu();
                    this.kullaniciGrubuTerm.nativeElement.select();
                } else {
                    this._nfs.showDinazorResultMessage(res);
                }
            });
        }
    }

    saveKullaniciGrubuKeypress(e) {
        if (e.keyCode === KEY_CODE_ENTER) {
            this.saveKullaniciGrubu();
        }
    }

    searchKullaniciGrubu() {
        if (isNullOrUndefined(this.kullaniciGrubuSearchTerm)) return;
        const val = this.kullaniciGrubuSearchTerm.nativeElement.value;
        this.kullaniciGrubuFilteredList = [];
        this.kullaniciGrubuListesi.forEach(item => {
            if (item.name.toUpperCase().indexOf(val.toUpperCase()) !== -1) {
                this.kullaniciGrubuFilteredList.push(item);
            }
        });
    }

    private editKullaniciGurubu(data) {
        this._http.put(data, 'userGroup').subscribe(res => {
            if (res.isSuccess) {
                this.loadKullaniciGrubu();
            }
            this._nfs.showDinazorResultMessage(res);
        });
    }

    private getKullaniciGrubuEditDialogOptions(): any {
        return {
            autoOpen: false,
            width: '400px',
            resizable: false,
            modal: true,
            closeText: '',
            title: 'Kullanıcı Grubu Düzenle',
            buttons: [
                {
                    html: 'Güncelle',
                    click: () => {
                        this.editKullaniciGurubu(this.kullaniciGrubuEditForm.getRawValue());
                    }
                },
                {
                    html: 'Kapat',
                    click: () => {
                        this.kullaniciGrupDialog.dialog('close');
                    }
                }]
        };
    }

    private loadKullaniciGrubu() {
        this._http.get('userGroup').subscribe(res => {
            if (res.isSuccess) {
                if (!isNullOrUndefined(this.kullaniciGrubuSearchTerm))
                    this.kullaniciGrubuSearchTerm.nativeElement.value = '';
                if (!isNullOrUndefined(this.kullaniciGrubuTerm))
                    this.kullaniciGrubuTerm.nativeElement.value = '';
                this.kullaniciGrubuFilteredList = res.data;
                this.kullaniciGrubuListesi = res.data;
                this.kullaniciGrubuSelectedRow = NaN;
            } else {
                this._nfs.showDinazorResultMessage(res);
            }
        });
    }

    private loadRoleGroupFromUserGroup(id) {
        this.roleGroupAtamaLoading = true;
        this._http.get('UserGroup/' + id + '/RoleGroup').subscribe(res => {
            if (res.isSuccess) {
                this.roleGroupListesi = res.data;
            } else {
                this._nfs.showDinazorResultMessage(res);
            }
            this.roleGroupAtamaLoading = false;
        });
    }

    private loadUserFromUserGroup(id) {
        this.kullaniciAtamaLoading = true;
        this._http.get('UserGroup/' + id + '/User').subscribe(res => {
            if (res.isSuccess) {
                this.kullaniciListesi = res.data;
            } else {
                this._nfs.showDinazorResultMessage(res);
            }
            this.kullaniciAtamaLoading = false;
        });
    }

    private setClickedKullaniciGrubuRow(i) {
        if (this.kullaniciGrubuSelectedRow === i) {
            this.kullaniciGrubuSelectedRow = NaN;
        } else {
            this.kullaniciGrubuSelectedRow = i;
            this.loadUserFromUserGroup(this.kullaniciGrubuFilteredList[i].id);
            this.loadRoleGroupFromUserGroup(this.kullaniciGrubuFilteredList[i].id);
        }

    }

}
