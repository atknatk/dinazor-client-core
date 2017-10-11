import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'jquery-ui-npm/jquery-ui.min.js';
import { DnLoadingBase } from '../../../../components/loading/dn-loading.base';
import { DnSelect2Item } from '../../../../components/select/select2/dn-select2-item';
import { DnHttpService } from '../../../../services/http.service';
import { DnNotificationService } from '../../../../services/notification.service';
import { isNullOrUndefined, isNullOrUndefinedOrEmpty } from '../../../../utils/check';
import { DnAuthService } from '../../../auth/auth.service';
import { dinazorRoles } from '../../../../dinazor-role-enum';

const KEY_CODE_ENTER = 13;
/**
 * Created by cabbar on 03.05.2017.
 */
declare let $: any;

@Component({
    selector: 'dn-role-group-list',
    templateUrl: './role-group.component.html',
    styles: [`
        .table tr.active td {
            background-color: paleturquoise !important;
        }
    `]
})
export class DnRoleGroupListComponent extends DnLoadingBase implements OnInit {

    roleGrubuListesi: any[];
    roleListesi: any[];
    roleGrubuFilteredList: any[];
    roleGrubuSelectedRow: number = NaN;
    roleGrupDialog: any;
    roleGrubuEditForm: FormGroup;
    roleAtamaLoading: boolean = false;
    dinazorRoles = dinazorRoles;
    auth: DnAuthService;
    @ViewChild('rolegrubuterm') private roleGrubuTerm: any;
    @ViewChild('rolegrubusearchterm') private roleGrubuSearchTerm: any;
    @Output('roleGroupChange') private roleGroupChangeEmitter = new EventEmitter();

    constructor(private _http: DnHttpService<any>,
                private _nfs: DnNotificationService,
                private _fb: FormBuilder,
                private _authService: DnAuthService) {
        super();
        this.auth = _authService;
    }

    editRoleGrubu(item) {
        this.roleGrupDialog.dialog('open');
        this.roleGrubuEditForm.patchValue(item);
    }

    isAuth(roles: any): boolean {
        return this._authService.isAuthorized(roles);
    }

    ngOnInit() {
        this.roleGrubuEditForm = this._fb.group({id: 0});
        this.loadRoleGrubu();
        this.roleGrupDialog = $('#role-grup-dialog').dialog(this.getRoleGrubuEditDialogOptions());

    }

    onSelectRole(item: DnSelect2Item) {
        this.roleAtamaLoading = true;
        const roleGroupId = this.roleGrubuFilteredList[this.roleGrubuSelectedRow].id;
        this._http.post(null, 'Role/' + item.id + '/RoleGroup/' + roleGroupId).subscribe(res => {
            if (!res.isSuccess) {
                this._nfs.showDinazorResultMessage(res);
                this.roleAtamaLoading = false;
            } else {
                this.loadRoleFromRoleGroup(roleGroupId);
            }
        });
    }

    removeRoleFromGroup(item) {
        this.roleAtamaLoading = true;
        const roleGroupId = this.roleGrubuFilteredList[this.roleGrubuSelectedRow].id;
        this._nfs.removeConfirm(() => {
            this._http.setUrl('Role/' + item.id + '/RoleGroup');
            return this._http.delete(roleGroupId);
        }, this.loadRoleFromRoleGroup.bind(this), this.roleGrubuFilteredList[this.roleGrubuSelectedRow].id);
    }

    removeRoleGrubu(item) {
        this._nfs.removeConfirm(() => {
            this._http.setUrl('roleGroup');
            return this._http.delete(item.id);
        }, this.loadRoleGrubu.bind(this));
    }

    roleGrubuSearchKeypress(e) {
        if (e.keyCode === KEY_CODE_ENTER) {
            this.searchRoleGrubu();
        }
    }

    saveRoleGrubu() {
        if (isNullOrUndefined(this.roleGrubuTerm)) return;
        const val = this.roleGrubuTerm.nativeElement.value;
        if (isNullOrUndefinedOrEmpty(val)) {
            this._nfs.showWarning('Kullanıcı grubu adı giriniz.!!');
        } else {
            this._http.post({name: val}, 'roleGroup', this.loadingContext(this)).subscribe(res => {
                if (res.isSuccess) {
                    this.loadRoleGrubu();
                    this.roleGrubuTerm.nativeElement.select();
                    this.roleGroupChangeEmitter.emit();
                } else {
                    this._nfs.showDinazorResultMessage(res);
                }
            });
        }
    }

    saveRoleGrubuKeypress(e) {
        if (e.keyCode === KEY_CODE_ENTER) {
            this.saveRoleGrubu();
        }
    }

    searchRoleGrubu() {
        if (isNullOrUndefined(this.roleGrubuSearchTerm)) return;
        const val = this.roleGrubuSearchTerm.nativeElement.value;
        this.roleGrubuFilteredList = [];
        this.roleGrubuListesi.forEach(item => {
            if (item.name.toUpperCase().indexOf(val.toUpperCase()) !== -1) {
                this.roleGrubuFilteredList.push(item);
            }
        });
    }

    private editRoleGurubu(data) {
        this._http.put(data, 'RoleGroup').subscribe(res => {
            if (res.isSuccess) {
                this.loadRoleGrubu();
                this.roleGroupChangeEmitter.emit();
            }
            this._nfs.showDinazorResultMessage(res);
        });
    }

    private getRoleGrubuEditDialogOptions(): any {
        return {
            autoOpen: false,
            width: '400px',
            resizable: false,
            modal: true,
            closeText: '',
            title: 'Rol Grubu Düzenle',
            buttons: [
                {
                    html: 'Güncelle',
                    click: () => {
                        this.editRoleGurubu(this.roleGrubuEditForm.getRawValue());
                    }
                },
                {
                    html: 'Kapat',
                    click: () => {
                        this.roleGrupDialog.dialog('close');
                    }
                }]
        };
    }

    private loadRoleFromRoleGroup(id) {
        this.roleAtamaLoading = true;
        this._http.get('RoleGroup/' + id + '/Role').subscribe(res => {
            if (res.isSuccess) {
                this.roleListesi = res.data;
            } else {
                this._nfs.showDinazorResultMessage(res);
            }
            this.roleAtamaLoading = false;
        });
    }

    private loadRoleGrubu() {
        this._http.get('roleGroup').subscribe(res => {
            if (res.isSuccess) {
                if (!isNullOrUndefined(this.roleGrubuSearchTerm))
                    this.roleGrubuSearchTerm.nativeElement.value = '';
                if (!isNullOrUndefined(this.roleGrubuTerm))
                    this.roleGrubuTerm.nativeElement.value = '';
                this.roleGrubuFilteredList = res.data;
                this.roleGrubuListesi = res.data;
                this.roleGrubuSelectedRow = NaN;
            } else {
                this._nfs.showDinazorResultMessage(res);
            }
        });
    }

    private setClickedRoleGrubuRow(i) {
        if (this.roleGrubuSelectedRow === i) {
            this.roleGrubuSelectedRow = NaN;
        } else {
            this.roleGrubuSelectedRow = i;
            this.loadRoleFromRoleGroup(this.roleGrubuFilteredList[i].id);
        }

    }

}
