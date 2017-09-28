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
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import 'jquery-ui-npm/jquery-ui.min.js';
import { DnLoadingBase } from '../../../../components/loading/dn-loading.base';
import { DnHttpService } from '../../../../services/http.service';
import { DnNotificationService } from '../../../../services/notification.service';
import { isNullOrUndefined, isNullOrUndefinedOrEmpty } from '../../../../utils/check';
import { DnAuthService } from '../../../auth/auth.service';
import { dinazorRoles } from '../../../auth/dinazor-roles';
var KEY_CODE_ENTER = 13;
var DnRoleGroupListComponent = /** @class */ (function (_super) {
    __extends(DnRoleGroupListComponent, _super);
    function DnRoleGroupListComponent(_http, _nfs, _fb, _authService) {
        var _this = _super.call(this) || this;
        _this._http = _http;
        _this._nfs = _nfs;
        _this._fb = _fb;
        _this._authService = _authService;
        _this.roleGrubuSelectedRow = NaN;
        _this.roleAtamaLoading = false;
        _this.dinazorRoles = dinazorRoles;
        _this.roleGroupChangeEmitter = new EventEmitter();
        _this.auth = _authService;
        return _this;
    }
    DnRoleGroupListComponent.prototype.editRoleGrubu = function (item) {
        this.roleGrupDialog.dialog('open');
        this.roleGrubuEditForm.patchValue(item);
    };
    DnRoleGroupListComponent.prototype.isAuth = function (roles) {
        return this._authService.isAuthorized(roles);
    };
    DnRoleGroupListComponent.prototype.ngOnInit = function () {
        this.roleGrubuEditForm = this._fb.group({ id: 0 });
        this.loadRoleGrubu();
        this.roleGrupDialog = $('#role-grup-dialog').dialog(this.getRoleGrubuEditDialogOptions());
    };
    DnRoleGroupListComponent.prototype.onSelectRole = function (item) {
        var _this = this;
        this.roleAtamaLoading = true;
        var roleGroupId = this.roleGrubuFilteredList[this.roleGrubuSelectedRow].id;
        this._http.post(null, 'Role/' + item.id + '/RoleGroup/' + roleGroupId).subscribe(function (res) {
            if (!res.isSuccess) {
                _this._nfs.showDinazorResultMessage(res);
                _this.roleAtamaLoading = false;
            }
            else {
                _this.loadRoleFromRoleGroup(roleGroupId);
            }
        });
    };
    DnRoleGroupListComponent.prototype.removeRoleFromGroup = function (item) {
        var _this = this;
        this.roleAtamaLoading = true;
        var roleGroupId = this.roleGrubuFilteredList[this.roleGrubuSelectedRow].id;
        this._nfs.removeConfirm(function () {
            _this._http.setUrl('Role/' + item.id + '/RoleGroup');
            return _this._http.delete(roleGroupId);
        }, this.loadRoleFromRoleGroup.bind(this), this.roleGrubuFilteredList[this.roleGrubuSelectedRow].id);
    };
    DnRoleGroupListComponent.prototype.removeRoleGrubu = function (item) {
        var _this = this;
        this._nfs.removeConfirm(function () {
            _this._http.setUrl('roleGroup');
            return _this._http.delete(item.id);
        }, this.loadRoleGrubu.bind(this));
    };
    DnRoleGroupListComponent.prototype.roleGrubuSearchKeypress = function (e) {
        if (e.keyCode === KEY_CODE_ENTER) {
            this.searchRoleGrubu();
        }
    };
    DnRoleGroupListComponent.prototype.saveRoleGrubu = function () {
        var _this = this;
        if (isNullOrUndefined(this.roleGrubuTerm))
            return;
        var val = this.roleGrubuTerm.nativeElement.value;
        if (isNullOrUndefinedOrEmpty(val)) {
            this._nfs.showWarning('Kullanıcı grubu adı giriniz.!!');
        }
        else {
            this._http.post({ name: val }, 'roleGroup', this.loadingContext()).subscribe(function (res) {
                if (res.isSuccess) {
                    _this.loadRoleGrubu();
                    _this.roleGrubuTerm.nativeElement.select();
                    _this.roleGroupChangeEmitter.emit();
                }
                else {
                    _this._nfs.showDinazorResultMessage(res);
                }
            });
        }
    };
    DnRoleGroupListComponent.prototype.saveRoleGrubuKeypress = function (e) {
        if (e.keyCode === KEY_CODE_ENTER) {
            this.saveRoleGrubu();
        }
    };
    DnRoleGroupListComponent.prototype.searchRoleGrubu = function () {
        var _this = this;
        if (isNullOrUndefined(this.roleGrubuSearchTerm))
            return;
        var val = this.roleGrubuSearchTerm.nativeElement.value;
        this.roleGrubuFilteredList = [];
        this.roleGrubuListesi.forEach(function (item) {
            if (item.name.toUpperCase().indexOf(val.toUpperCase()) !== -1) {
                _this.roleGrubuFilteredList.push(item);
            }
        });
    };
    DnRoleGroupListComponent.prototype.editRoleGurubu = function (data) {
        var _this = this;
        this._http.put(data, 'RoleGroup').subscribe(function (res) {
            if (res.isSuccess) {
                _this.loadRoleGrubu();
                _this.roleGroupChangeEmitter.emit();
            }
            _this._nfs.showDinazorResultMessage(res);
        });
    };
    DnRoleGroupListComponent.prototype.getRoleGrubuEditDialogOptions = function () {
        var _this = this;
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
                    click: function () {
                        _this.editRoleGurubu(_this.roleGrubuEditForm.getRawValue());
                    }
                },
                {
                    html: 'Kapat',
                    click: function () {
                        _this.roleGrupDialog.dialog('close');
                    }
                }
            ]
        };
    };
    DnRoleGroupListComponent.prototype.loadRoleFromRoleGroup = function (id) {
        var _this = this;
        this.roleAtamaLoading = true;
        this._http.get('RoleGroup/' + id + '/Role').subscribe(function (res) {
            if (res.isSuccess) {
                _this.roleListesi = res.data;
            }
            else {
                _this._nfs.showDinazorResultMessage(res);
            }
            _this.roleAtamaLoading = false;
        });
    };
    DnRoleGroupListComponent.prototype.loadRoleGrubu = function () {
        var _this = this;
        this._http.get('roleGroup').subscribe(function (res) {
            if (res.isSuccess) {
                if (!isNullOrUndefined(_this.roleGrubuSearchTerm))
                    _this.roleGrubuSearchTerm.nativeElement.value = '';
                if (!isNullOrUndefined(_this.roleGrubuTerm))
                    _this.roleGrubuTerm.nativeElement.value = '';
                _this.roleGrubuFilteredList = res.data;
                _this.roleGrubuListesi = res.data;
                _this.roleGrubuSelectedRow = NaN;
            }
            else {
                _this._nfs.showDinazorResultMessage(res);
            }
        });
    };
    DnRoleGroupListComponent.prototype.setClickedRoleGrubuRow = function (i) {
        if (this.roleGrubuSelectedRow === i) {
            this.roleGrubuSelectedRow = NaN;
        }
        else {
            this.roleGrubuSelectedRow = i;
            this.loadRoleFromRoleGroup(this.roleGrubuFilteredList[i].id);
        }
    };
    DnRoleGroupListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-role-group-list',
                    templateUrl: './role-group.component.html',
                    styles: ["\n        .table tr.active td {\n            background-color: paleturquoise !important;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    DnRoleGroupListComponent.ctorParameters = function () { return [
        { type: DnHttpService, },
        { type: DnNotificationService, },
        { type: FormBuilder, },
        { type: DnAuthService, },
    ]; };
    DnRoleGroupListComponent.propDecorators = {
        'roleGrubuTerm': [{ type: ViewChild, args: ['rolegrubuterm',] },],
        'roleGrubuSearchTerm': [{ type: ViewChild, args: ['rolegrubusearchterm',] },],
        'roleGroupChangeEmitter': [{ type: Output, args: ['roleGroupChange',] },],
    };
    return DnRoleGroupListComponent;
}(DnLoadingBase));
export { DnRoleGroupListComponent };
//# sourceMappingURL=role-group.component.js.map