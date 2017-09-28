var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import 'jquery-ui-npm/jquery-ui.min.js';
import { DnLoadingBase } from '../../../../components/loading/dn-loading.base';
import { DnHttpService } from '../../../../services/http.service';
import { DnNotificationService } from '../../../../services/notification.service';
import { isNullOrUndefined, isNullOrUndefinedOrEmpty } from '../../../../utils/check';
import { DnAuthService } from '../../../auth/auth.service';
import { dinazorRoles } from '../../../auth/dinazor-roles';
var KEY_CODE_ENTER = 13;
var KEY_CODE_DELETE = 8;
var DnUserGroupListComponent = /** @class */ (function (_super) {
    __extends(DnUserGroupListComponent, _super);
    function DnUserGroupListComponent(_http, _nfs, _fb, _authService) {
        var _this = _super.call(this) || this;
        _this._http = _http;
        _this._nfs = _nfs;
        _this._fb = _fb;
        _this._authService = _authService;
        _this.dinazorRoles = dinazorRoles;
        _this.kullaniciGrubuSelectedRow = NaN;
        _this.kullaniciAtamaLoading = false;
        _this.roleGroupAtamaLoading = false;
        _this.config = {
            userSelect: function (item) {
                return item.entity.username + ' (' + item.entity.name + ' ' + item.entity.surname + ')';
            },
            userSelectTable: function (item) {
                return item.username + ' (' + item.name + ' ' + item.surname + ')';
            }
        };
        _this.auth = _authService;
        return _this;
    }
    DnUserGroupListComponent.prototype.editKullaniciGrubu = function (item) {
        this.kullaniciGrupDialog.dialog('open');
        this.kullaniciGrubuEditForm.patchValue(item);
    };
    DnUserGroupListComponent.prototype.kullaniciGrubuSearchKeypress = function (e) {
        if (e.keyCode === KEY_CODE_ENTER) {
            this.searchKullaniciGrubu();
        }
    };
    DnUserGroupListComponent.prototype.ngOnInit = function () {
        this.kullaniciGrubuEditForm = this._fb.group({ id: 0 });
        this.loadKullaniciGrubu();
        this.kullaniciGrupDialog = $('#kullanici-grup-dialog').dialog(this.getKullaniciGrubuEditDialogOptions());
    };
    DnUserGroupListComponent.prototype.onSelectRoleGroup = function (item) {
        var _this = this;
        this.roleGroupAtamaLoading = true;
        var userGroupId = this.kullaniciGrubuFilteredList[this.kullaniciGrubuSelectedRow].id;
        this._http.post(null, 'RoleGroup/' + item.id + '/UserGroup/' + userGroupId).subscribe(function (res) {
            if (!res.isSuccess) {
                _this._nfs.showDinazorResultMessage(res);
                _this.roleGroupAtamaLoading = false;
            }
            else {
                _this.loadRoleGroupFromUserGroup(userGroupId);
            }
        });
    };
    DnUserGroupListComponent.prototype.onSelectUser = function (item) {
        var _this = this;
        this.kullaniciAtamaLoading = true;
        var userGroupId = this.kullaniciGrubuFilteredList[this.kullaniciGrubuSelectedRow].id;
        this._http.post(null, 'User/' + item.id + '/UserGroup/' + userGroupId).subscribe(function (res) {
            if (!res.isSuccess) {
                _this._nfs.showDinazorResultMessage(res);
                _this.kullaniciAtamaLoading = false;
            }
            else {
                _this.loadUserFromUserGroup(userGroupId);
            }
        });
    };
    DnUserGroupListComponent.prototype.removeKullaniciFromGroup = function (item) {
        var _this = this;
        this.kullaniciAtamaLoading = true;
        var userGroupId = this.kullaniciGrubuFilteredList[this.kullaniciGrubuSelectedRow].id;
        this._nfs.removeConfirm(function () {
            _this._http.setUrl('User/' + item.id + '/UserGroup');
            return _this._http.delete(userGroupId);
        }, this.loadUserFromUserGroup.bind(this), this.kullaniciGrubuFilteredList[this.kullaniciGrubuSelectedRow].id);
    };
    DnUserGroupListComponent.prototype.removeKullaniciGrubu = function (item) {
        var _this = this;
        this._nfs.removeConfirm(function () {
            _this._http.setUrl('userGroup');
            return _this._http.delete(item.id);
        }, this.loadKullaniciGrubu.bind(this));
    };
    DnUserGroupListComponent.prototype.removeRoleGroupFromUserGroup = function (item) {
        var _this = this;
        this.roleGroupAtamaLoading = true;
        var userGroupId = this.kullaniciGrubuFilteredList[this.kullaniciGrubuSelectedRow].id;
        this._nfs.removeConfirm(function () {
            _this._http.setUrl('RoleGroup/' + item.id + '/UserGroup');
            return _this._http.delete(userGroupId);
        }, this.loadRoleGroupFromUserGroup.bind(this), this.kullaniciGrubuFilteredList[this.kullaniciGrubuSelectedRow].id);
    };
    DnUserGroupListComponent.prototype.saveKullaniciGrubu = function () {
        var _this = this;
        if (isNullOrUndefined(this.kullaniciGrubuTerm))
            return;
        var val = this.kullaniciGrubuTerm.nativeElement.value;
        if (isNullOrUndefinedOrEmpty(val)) {
            this._nfs.showWarning('Kullanıcı grubu adı giriniz.!!');
        }
        else {
            this._http.post({ name: val }, 'userGroup', this.loadingContext()).subscribe(function (res) {
                if (res.isSuccess) {
                    _this.loadKullaniciGrubu();
                    _this.kullaniciGrubuTerm.nativeElement.select();
                }
                else {
                    _this._nfs.showDinazorResultMessage(res);
                }
            });
        }
    };
    DnUserGroupListComponent.prototype.saveKullaniciGrubuKeypress = function (e) {
        if (e.keyCode === KEY_CODE_ENTER) {
            this.saveKullaniciGrubu();
        }
    };
    DnUserGroupListComponent.prototype.searchKullaniciGrubu = function () {
        var _this = this;
        if (isNullOrUndefined(this.kullaniciGrubuSearchTerm))
            return;
        var val = this.kullaniciGrubuSearchTerm.nativeElement.value;
        this.kullaniciGrubuFilteredList = [];
        this.kullaniciGrubuListesi.forEach(function (item) {
            if (item.name.toUpperCase().indexOf(val.toUpperCase()) !== -1) {
                _this.kullaniciGrubuFilteredList.push(item);
            }
        });
    };
    DnUserGroupListComponent.prototype.editKullaniciGurubu = function (data) {
        var _this = this;
        this._http.put(data, 'userGroup').subscribe(function (res) {
            if (res.isSuccess) {
                _this.loadKullaniciGrubu();
            }
            _this._nfs.showDinazorResultMessage(res);
        });
    };
    DnUserGroupListComponent.prototype.getKullaniciGrubuEditDialogOptions = function () {
        var _this = this;
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
                    click: function () {
                        _this.editKullaniciGurubu(_this.kullaniciGrubuEditForm.getRawValue());
                    }
                },
                {
                    html: 'Kapat',
                    click: function () {
                        _this.kullaniciGrupDialog.dialog('close');
                    }
                }
            ]
        };
    };
    DnUserGroupListComponent.prototype.loadKullaniciGrubu = function () {
        var _this = this;
        this._http.get('userGroup').subscribe(function (res) {
            if (res.isSuccess) {
                if (!isNullOrUndefined(_this.kullaniciGrubuSearchTerm))
                    _this.kullaniciGrubuSearchTerm.nativeElement.value = '';
                if (!isNullOrUndefined(_this.kullaniciGrubuTerm))
                    _this.kullaniciGrubuTerm.nativeElement.value = '';
                _this.kullaniciGrubuFilteredList = res.data;
                _this.kullaniciGrubuListesi = res.data;
                _this.kullaniciGrubuSelectedRow = NaN;
            }
            else {
                _this._nfs.showDinazorResultMessage(res);
            }
        });
    };
    DnUserGroupListComponent.prototype.loadRoleGroupFromUserGroup = function (id) {
        var _this = this;
        this.roleGroupAtamaLoading = true;
        this._http.get('UserGroup/' + id + '/RoleGroup').subscribe(function (res) {
            if (res.isSuccess) {
                _this.roleGroupListesi = res.data;
            }
            else {
                _this._nfs.showDinazorResultMessage(res);
            }
            _this.roleGroupAtamaLoading = false;
        });
    };
    DnUserGroupListComponent.prototype.loadUserFromUserGroup = function (id) {
        var _this = this;
        this.kullaniciAtamaLoading = true;
        this._http.get('UserGroup/' + id + '/User').subscribe(function (res) {
            if (res.isSuccess) {
                _this.kullaniciListesi = res.data;
            }
            else {
                _this._nfs.showDinazorResultMessage(res);
            }
            _this.kullaniciAtamaLoading = false;
        });
    };
    DnUserGroupListComponent.prototype.setClickedKullaniciGrubuRow = function (i) {
        if (this.kullaniciGrubuSelectedRow === i) {
            this.kullaniciGrubuSelectedRow = NaN;
        }
        else {
            this.kullaniciGrubuSelectedRow = i;
            this.loadUserFromUserGroup(this.kullaniciGrubuFilteredList[i].id);
            this.loadRoleGroupFromUserGroup(this.kullaniciGrubuFilteredList[i].id);
        }
    };
    DnUserGroupListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-user-group-list',
                    templateUrl: './user-group.component.html',
                    styles: ["\n        .table tr.active td {\n            background-color: paleturquoise !important;\n        }\n    "],
                    providers: [DnHttpService]
                },] },
    ];
    /** @nocollapse */
    DnUserGroupListComponent.ctorParameters = function () { return [
        { type: DnHttpService, },
        { type: DnNotificationService, },
        { type: FormBuilder, },
        { type: DnAuthService, },
    ]; };
    DnUserGroupListComponent.propDecorators = {
        'roleGroupSelect': [{ type: ViewChild, args: ['rolegroupselect',] },],
        'userSelect': [{ type: ViewChild, args: ['userselect',] },],
        'kullaniciGrubuTerm': [{ type: ViewChild, args: ['kullanicigrubuterm',] },],
        'kullaniciGrubuSearchTerm': [{ type: ViewChild, args: ['kullanicigrubusearchterm',] },],
    };
    return DnUserGroupListComponent;
}(DnLoadingBase));
export { DnUserGroupListComponent };
//# sourceMappingURL=user-group.component.js.map