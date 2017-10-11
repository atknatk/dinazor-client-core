import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { isNullOrUndefined } from 'util';
import { DnHttpService } from '../../services/http.service';
import { DnNotificationService } from '../../services/notification.service';
import { DnAuthService } from '../../views/auth/auth.service';
import { DnDatatableColumnBase } from '../datatable/dn-datatable-column.base';
import { DnDatatableComponent } from '../datatable/dn-datatable.component';
var DnCrudComponent = /** @class */ (function () {
    function DnCrudComponent(el, dnHttpService, notificationService, authService) {
        this.el = el;
        this.dnHttpService = dnHttpService;
        this.notificationService = notificationService;
        this.authService = authService;
        this.actionBeforeEditShowPanelEmitter = new EventEmitter();
        this.actionAfterEditShowPanelEmitter = new EventEmitter();
        this.actionBeforeDeleteEmitter = new EventEmitter();
        this.actionAfterDeleteEmitter = new EventEmitter();
        this.actionBeforeEditEmitter = new EventEmitter();
        this.actionAfterEditEmitter = new EventEmitter();
        this.actionBeforeSearchEmitter = new EventEmitter();
        this.actionAfterSearchEmitter = new EventEmitter();
        this.isOpen = false;
        this.auth = this.authService;
    }
    DnCrudComponent.prototype.actionDelete = function (data) {
        this.actionBeforeDeleteEmitter.emit(data);
        this.deleteProcess(data.id);
        this.closeEditPanel();
        this.actionAfterDeleteEmitter.emit(data);
    };
    DnCrudComponent.prototype.actionEdit = function (data) {
        this.actionBeforeEditShowPanelEmitter.emit(data);
        this.currentId = data.id;
        this.openEditPanel();
        this.editFormData = data;
        this.actionAfterEditShowPanelEmitter.emit(data);
    };
    DnCrudComponent.prototype.closeEditPanel = function () {
        var mainel = $(this.el.nativeElement);
        var elem = $(mainel.find('#dn-edit-widget'));
        elem.hide(function () {
            $(mainel.find('#dn-table-widget')).addClass('col-sm-12').removeClass('col-sm-6');
        });
        this.visibilityColumns(true);
    };
    DnCrudComponent.prototype.ngOnInit = function () {
        this.crudData.datatableOptions.option['url'] = this.crudData.datatableOptions.restUrl || this.crudData.restUrl +
            '/paging';
        var columns = [];
        if (this.crudData.datatableOptions.deleteButton || this.crudData.datatableOptions.deleteButton) {
            this.crudData.datatableOptions.columns.unshift(new DnDatatableColumnBase({
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
                    if (!isNullOrUndefined(currIndex_1)) {
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
    DnCrudComponent.prototype.deleteProcess = function (id) {
        var _this = this;
        this.notificationService.removeConfirm(function () {
            return _this.dnHttpService.delete(id);
        }, this.datatableComponent.datatable.draw.bind(this.datatableComponent.datatable));
    };
    DnCrudComponent.prototype.editProcess = function (data) {
        var _this = this;
        data.id = this.currentId;
        this.dnHttpService.put(data).subscribe(function (res) {
            if (res.isSuccess) {
                _this.datatableComponent.datatable.draw();
            }
            _this.notificationService.showDinazorResultMessage(res);
        });
    };
    DnCrudComponent.prototype.getColumnTitle = function (column) {
        return $(column.header()).text();
    };
    DnCrudComponent.prototype.newDataProcess = function (data) {
        var _this = this;
        data.id = this.currentId;
        this.dnHttpService.post(data).subscribe(function (res) {
            if (res.isSuccess) {
                _this.datatableComponent.datatable.draw();
            }
            _this.notificationService.showDinazorResultMessage(res);
        });
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
    DnCrudComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-crud',
                    templateUrl: './dn-crud.component.html',
                    styles: ["\n        dn-crud-datatable {\n            display: block;\n            line-height: 0;\n            height: 0;\n            width: 0;\n            overflow: hidden;\n        }\n\n        dt-toolbar {\n            display: none;\n        }\n    "],
                    providers: [DnHttpService]
                },] },
    ];
    /** @nocollapse */
    DnCrudComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: DnHttpService, },
        { type: DnNotificationService, },
        { type: DnAuthService, },
    ]; };
    DnCrudComponent.propDecorators = {
        'isEdit': [{ type: Input },],
        'crudData': [{ type: Input },],
        'datatableComponent': [{ type: ViewChild, args: [DnDatatableComponent,] },],
        'actionBeforeEditShowPanelEmitter': [{ type: Output },],
        'actionAfterEditShowPanelEmitter': [{ type: Output },],
        'actionBeforeDeleteEmitter': [{ type: Output },],
        'actionAfterDeleteEmitter': [{ type: Output },],
        'actionBeforeEditEmitter': [{ type: Output },],
        'actionAfterEditEmitter': [{ type: Output },],
        'actionBeforeSearchEmitter': [{ type: Output },],
        'actionAfterSearchEmitter': [{ type: Output },],
    };
    return DnCrudComponent;
}());
export { DnCrudComponent };
//# sourceMappingURL=dn-crud.component.js.map