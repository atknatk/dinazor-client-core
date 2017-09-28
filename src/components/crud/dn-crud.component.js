"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var util_1 = require("util");
var dn_datatable_component_1 = require("../datatable/dn-datatable.component");
var dn_datatable_column_base_1 = require("../datatable/dn-datatable-column.base");
var DnCrudComponent = /** @class */ (function () {
    function DnCrudComponent(el, dnHttpService, notificationService, authService) {
        this.el = el;
        this.dnHttpService = dnHttpService;
        this.notificationService = notificationService;
        this.authService = authService;
        this.actionBeforeEditShowPanelEmitter = new core_1.EventEmitter();
        this.actionAfterEditShowPanelEmitter = new core_1.EventEmitter();
        this.actionBeforeDeleteEmitter = new core_1.EventEmitter();
        this.actionAfterDeleteEmitter = new core_1.EventEmitter();
        this.actionBeforeEditEmitter = new core_1.EventEmitter();
        this.actionAfterEditEmitter = new core_1.EventEmitter();
        this.actionBeforeSearchEmitter = new core_1.EventEmitter();
        this.actionAfterSearchEmitter = new core_1.EventEmitter();
        this.isOpen = false;
        this.auth = this.authService;
    }
    DnCrudComponent.prototype.actionEdit = function (data) {
        this.actionBeforeEditShowPanelEmitter.emit(data);
        this.currentId = data.id;
        this.openEditPanel();
        this.editFormData = data;
        this.actionAfterEditShowPanelEmitter.emit(data);
    };
    DnCrudComponent.prototype.actionDelete = function (data) {
        this.actionBeforeDeleteEmitter.emit(data);
        this.deleteProcess(data.id);
        this.closeEditPanel();
        this.actionAfterDeleteEmitter.emit(data);
    };
    DnCrudComponent.prototype.onSubmit = function (data, type, isEdit) {
        if (type === 'search') {
            this.actionBeforeSearchEmitter.emit(data);
            var _loop_1 = function (prop) {
                if (data.hasOwnProperty(prop)) {
                    var currIndex_1;
                    this_1.datatableComponent.datatableOption.columns.forEach(function (i, index) {
                        if (i.data === prop)
                            currIndex_1 = index;
                    });
                    var val = data[prop];
                    if (!util_1.isNullOrUndefined(currIndex_1)) {
                        if (prop.indexOf('.') > 0) {
                            var name_1 = prop.substring(prop.indexOf('.') + 1, prop.length);
                            val = data[prop][name_1];
                        }
                        this_1.datatableComponent.datatable.column(currIndex_1).search(val);
                    }
                }
            };
            var this_1 = this;
            for (var prop in data) {
                _loop_1(prop);
            }
            this.datatableComponent.datatable.draw();
            this.actionAfterSearchEmitter.emit(data);
        }
        else if (type === 'edit') {
            if (isEdit) {
                this.actionBeforeEditEmitter.emit(data);
                this.editProcess(data);
                this.actionAfterEditEmitter.emit(data);
            }
            else {
                this.actionBeforeEditEmitter.emit(data);
                this.newDataProcess(data);
                this.actionAfterEditEmitter.emit(data);
            }
        }
    };
    DnCrudComponent.prototype.ngOnInit = function () {
        this.crudData.datatableOptions.option['url'] = this.crudData.datatableOptions.restUrl || this.crudData.restUrl +
            '/paging';
        var columns = [];
        if (this.crudData.datatableOptions.deleteButton || this.crudData.datatableOptions.deleteButton) {
            this.crudData.datatableOptions.columns.unshift(new dn_datatable_column_base_1.DnDatatableColumnBase({
                orderable: false
            }));
        }
        for (var _i = 0, _a = this.crudData.datatableOptions.columns; _i < _a.length; _i++) {
            var entry = _a[_i];
            /*     let key: any;
             if (isFunction(entry.serverKey)) {
             key = entry.serverKey();
             } else {
             key = entry.serverKey;
             }*/
            var col = {
                data: entry.serverKey,
                columnType: entry.columnType,
                content: entry.content,
                width: entry.width,
                serverKey: entry.serverKey,
                render: entry.render,
                orderable: entry.orderable,
                dateFormat: entry.dateFormat,
            };
            columns.push(col);
        }
        this.crudData.datatableOptions.option['columns'] = columns;
        this.dnHttpService.setUrl(this.crudData.restUrl);
    };
    DnCrudComponent.prototype.closeEditPanel = function () {
        var mainel = $(this.el.nativeElement);
        var elem = $(mainel.find('#dn-edit-widget'));
        elem.hide(function () {
            $(mainel.find('#dn-table-widget')).addClass('col-sm-12').removeClass('col-sm-6');
        });
        this.visibilityColumns(true);
    };
    DnCrudComponent.prototype.openEditPanel = function () {
        this.isEdit = true;
        var mainel = $(this.el.nativeElement);
        var elem = $(mainel.find('#dn-edit-widget'));
        $(mainel.find('#dn-table-widget')).removeClass('col-sm-12').addClass('col-sm-6');
        elem.show('slow');
        this.visibilityColumns(false);
    };
    DnCrudComponent.prototype.openNewDataPanel = function () {
        this.editFormData = undefined;
        this.isEdit = false;
        var mainel = $(this.el.nativeElement);
        var elem = $(mainel.find('#dn-edit-widget'));
        $(mainel.find('#dn-table-widget')).removeClass('col-sm-12').addClass('col-sm-6');
        elem.show('slow');
        this.visibilityColumns(false);
    };
    DnCrudComponent.prototype.showPanel = function () {
        var elem = $($(this.el.nativeElement).find('.dn-search-body'));
        if (!this.isOpen) {
            elem.show(50).animate({
                height: '100%',
                display: 'inline',
                opacity: '1'
            }, 150, function () {
                // Animation complete.
            });
        }
        else {
            elem.animate({
                height: '0%',
                display: 'none',
                opacity: '0'
            }, 200, function () {
                elem.hide();
            });
        }
        this.isOpen = !this.isOpen;
    };
    DnCrudComponent.prototype.editProcess = function (data) {
        var _this = this;
        data.id = this.currentId;
        this.dnHttpService.put(data).subscribe(function (res) {
            if (res.isSuccess) {
                _this.datatableComponent.datatable.draw();
                _this.notificationService.showSuccess('Kayıt başarılı bir şekilde güncellendi.');
            }
            else {
                _this.notificationService.showError('İşlem sırasında bir hata oluştu.');
            }
        }, function (err) {
            _this.notificationService.showError('Server tarafında işlem sırasında bir hata oluştu.');
        });
    };
    DnCrudComponent.prototype.newDataProcess = function (data) {
        var _this = this;
        data.id = this.currentId;
        this.dnHttpService.post(data).subscribe(function (res) {
            if (res.isSuccess) {
                _this.datatableComponent.datatable.draw();
                _this.notificationService.showSuccess('Yeni kayıt başarılı bir şekilde eklendi.');
            }
            else {
                _this.notificationService.showError('İşlem sırasında bir hata oluştu.');
            }
        }, function (err) {
            _this.notificationService.showError('Server tarafında işlem sırasında bir hata oluştu.');
        });
    };
    DnCrudComponent.prototype.deleteProcess = function (id) {
        var _this = this;
        this.notificationService.removeConfirm(function () {
            return _this.dnHttpService.delete(id);
        }, this.datatableComponent.datatable.draw.bind(this.datatableComponent.datatable));
    };
    DnCrudComponent.prototype.visibilityColumns = function (visible) {
        var _this = this;
        this.crudData.datatableOptions.columns.forEach(function (column) {
            if (column.hideInCrud) {
                var length_1 = _this.datatableComponent.datatable.columns()[0].length;
                for (var i = 0; i < length_1; i++) {
                    var dtColumn = _this.datatableComponent.datatable.column(i);
                    if (column.title === _this.getColumnTitle(dtColumn)) {
                        dtColumn.visible(visible);
                    }
                }
            }
        });
    };
    DnCrudComponent.prototype.getColumnTitle = function (column) {
        return $(column.header()).text();
    };
    __decorate([
        core_1.Input()
    ], DnCrudComponent.prototype, "isEdit", void 0);
    __decorate([
        core_1.Input()
    ], DnCrudComponent.prototype, "crudData", void 0);
    __decorate([
        core_1.ViewChild(dn_datatable_component_1.DnDatatableComponent)
    ], DnCrudComponent.prototype, "datatableComponent", void 0);
    __decorate([
        core_1.Output()
    ], DnCrudComponent.prototype, "actionBeforeEditShowPanelEmitter", void 0);
    __decorate([
        core_1.Output()
    ], DnCrudComponent.prototype, "actionAfterEditShowPanelEmitter", void 0);
    __decorate([
        core_1.Output()
    ], DnCrudComponent.prototype, "actionBeforeDeleteEmitter", void 0);
    __decorate([
        core_1.Output()
    ], DnCrudComponent.prototype, "actionAfterDeleteEmitter", void 0);
    __decorate([
        core_1.Output()
    ], DnCrudComponent.prototype, "actionBeforeEditEmitter", void 0);
    __decorate([
        core_1.Output()
    ], DnCrudComponent.prototype, "actionAfterEditEmitter", void 0);
    __decorate([
        core_1.Output()
    ], DnCrudComponent.prototype, "actionBeforeSearchEmitter", void 0);
    __decorate([
        core_1.Output()
    ], DnCrudComponent.prototype, "actionAfterSearchEmitter", void 0);
    DnCrudComponent = __decorate([
        core_1.Component({
            selector: 'dn-crud',
            templateUrl: './dn-crud.component.html',
            styleUrls: ['./dn-crud.component.css'],
        })
    ], DnCrudComponent);
    return DnCrudComponent;
}());
exports.DnCrudComponent = DnCrudComponent;
