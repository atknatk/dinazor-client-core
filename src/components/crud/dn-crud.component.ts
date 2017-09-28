import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { isNullOrUndefined } from 'util';
import { DnHttpService } from '../../services/http.service';
import { DnNotificationService } from '../../services/notification.service';
import { DnAuthService } from '../../views/auth/auth.service';
import { DnDatatableColumnBase } from '../datatable/dn-datatable-column.base';
import { DnDatatableComponent } from '../datatable/dn-datatable.component';
import { DnCrudBase } from './dn-crud-base';

declare let $: any;

@Component({
    selector: 'dn-crud',
    templateUrl: './dn-crud.component.html',
    styles: [`
        dn-crud-datatable {
            display: block;
            line-height: 0;
            height: 0;
            width: 0;
            overflow: hidden;
        }

        dt-toolbar {
            display: none;
        }
    `],
    providers: [DnHttpService]
})
export class DnCrudComponent implements OnInit {

    editFormData: any;
    currentId: any;
    @Input() isEdit: boolean;
    // datatable: any;
    @Input() crudData: DnCrudBase;
    @ViewChild(DnDatatableComponent) datatableComponent: DnDatatableComponent;

    @Output() actionBeforeEditShowPanelEmitter: EventEmitter<string> = new EventEmitter();
    @Output() actionAfterEditShowPanelEmitter: EventEmitter<string> = new EventEmitter();
    @Output() actionBeforeDeleteEmitter: EventEmitter<string> = new EventEmitter();
    @Output() actionAfterDeleteEmitter: EventEmitter<string> = new EventEmitter();
    @Output() actionBeforeEditEmitter: EventEmitter<string> = new EventEmitter();
    @Output() actionAfterEditEmitter: EventEmitter<string> = new EventEmitter();
    @Output() actionBeforeSearchEmitter: EventEmitter<string> = new EventEmitter();
    @Output() actionAfterSearchEmitter: EventEmitter<string> = new EventEmitter();

    auth: DnAuthService;

    private isOpen: boolean = false;

    constructor(public el: ElementRef,
                private dnHttpService: DnHttpService<any>,
                private notificationService: DnNotificationService,
                private authService: DnAuthService) {
        this.auth = this.authService;
    }

    actionDelete(data) {
        this.actionBeforeDeleteEmitter.emit(data);
        this.deleteProcess(data.id);
        this.closeEditPanel();
        this.actionAfterDeleteEmitter.emit(data);
    }

    actionEdit(data) {
        this.actionBeforeEditShowPanelEmitter.emit(data);
        this.currentId = data.id;
        this.openEditPanel();
        this.editFormData = data;
        this.actionAfterEditShowPanelEmitter.emit(data);
    }

    closeEditPanel() {
        const mainel = $(this.el.nativeElement);
        const elem = $(mainel.find('#dn-edit-widget'));
        elem.hide(() => {
            $(mainel.find('#dn-table-widget')).addClass('col-sm-12').removeClass('col-sm-6');
        });
        this.visibilityColumns(true);
    }

    ngOnInit(): void {
        this.crudData.datatableOptions.option['url'] = this.crudData.datatableOptions.restUrl || this.crudData.restUrl +
            '/paging';
        const columns: any[] = [];
        if (this.crudData.datatableOptions.deleteButton || this.crudData.datatableOptions.deleteButton) {
            this.crudData.datatableOptions.columns.unshift(new DnDatatableColumnBase({
                orderable: false
            }));
        }
        for (const entry of this.crudData.datatableOptions.columns) {
            /*     let key: any;
             if (isFunction(entry.serverKey)) {
             key = entry.serverKey();
             } else {
             key = entry.serverKey;
             }*/

            const col = {
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
    }

    onSubmit(data: any, type: string, isEdit: boolean) {
        if (type === 'search') {
            this.actionBeforeSearchEmitter.emit(data);
            for (const prop in data) {
                if (data.hasOwnProperty(prop)) {
                    let currIndex;
                    this.datatableComponent.datatableOption.columns.forEach((i, index) => {
                        if (i.data === prop) currIndex = index;
                    });
                    let val = data[prop];
                    if (!isNullOrUndefined(currIndex)) {
                        if (prop.indexOf('.') > 0) {
                            const name = prop.substring(prop.indexOf('.') + 1, prop.length);
                            val = data[prop][name];
                        }
                        this.datatableComponent.datatable.column(currIndex).search(val);
                    }
                }
            }
            this.datatableComponent.datatable.draw();
            this.actionAfterSearchEmitter.emit(data);
        } else if (type === 'edit') {
            if (isEdit) {
                this.actionBeforeEditEmitter.emit(data);
                this.editProcess(data);
                this.actionAfterEditEmitter.emit(data);
            } else {
                this.actionBeforeEditEmitter.emit(data);
                this.newDataProcess(data);
                this.actionAfterEditEmitter.emit(data);
            }
        }
    }

    openEditPanel() {
        this.isEdit = true;
        const mainel = $(this.el.nativeElement);
        const elem = $(mainel.find('#dn-edit-widget'));
        $(mainel.find('#dn-table-widget')).removeClass('col-sm-12').addClass('col-sm-6');
        elem.show('slow');
        this.visibilityColumns(false);
    }

    openNewDataPanel() {
        this.editFormData = undefined;
        this.isEdit = false;
        const mainel = $(this.el.nativeElement);
        const elem = $(mainel.find('#dn-edit-widget'));
        $(mainel.find('#dn-table-widget')).removeClass('col-sm-12').addClass('col-sm-6');
        elem.show('slow');
        this.visibilityColumns(false);
    }

    showPanel() {
        const elem = $($(this.el.nativeElement).find('.dn-search-body'));
        if (!this.isOpen) {
            elem.show(50).animate({
                height: '100%',
                display: 'inline',
                opacity: '1'
            }, 150, () => {
                // Animation complete.
            });
        } else {
            elem.animate({
                height: '0%',
                display: 'none',
                opacity: '0'
            }, 200, () => {
                elem.hide();
            });
        }
        this.isOpen = !this.isOpen;
    }

    private deleteProcess(id: number) {
        this.notificationService.removeConfirm(() => {
            return this.dnHttpService.delete(id);
        }, this.datatableComponent.datatable.draw.bind(this.datatableComponent.datatable));
    }

    private editProcess(data: any) {
        data.id = this.currentId;
        this.dnHttpService.put(data).subscribe(
            res => {
                if (res.isSuccess) {
                    this.datatableComponent.datatable.draw();
                    this.notificationService.showSuccess('Kayıt başarılı bir şekilde güncellendi.');
                } else {
                    this.notificationService.showError('İşlem sırasında bir hata oluştu.');
                }
            },
            err => {
                this.notificationService.showError('Server tarafında işlem sırasında bir hata oluştu.');
            });

    }

    private getColumnTitle(column: any) {
        return $(column.header()).text();
    }

    private newDataProcess(data: any) {
        data.id = this.currentId;
        this.dnHttpService.post(data).subscribe(
            res => {
                if (res.isSuccess) {
                    this.datatableComponent.datatable.draw();
                    this.notificationService.showSuccess('Yeni kayıt başarılı bir şekilde eklendi.');
                } else {
                    this.notificationService.showError('İşlem sırasında bir hata oluştu.');
                }
            },
            err => {
                this.notificationService.showError('Server tarafında işlem sırasında bir hata oluştu.');
            });

    }

    private visibilityColumns(visible: boolean) {
        this.crudData.datatableOptions.columns.forEach((column: DnDatatableColumnBase) => {
            if (column.hideInCrud) {
                const length: number = this.datatableComponent.datatable.columns()[0].length;
                for (let i = 0; i < length; i++) {
                    const dtColumn = this.datatableComponent.datatable.column(i);
                    if (column.title === this.getColumnTitle(dtColumn)) {
                        dtColumn.visible(visible);
                    }
                }
            }
        });
    }
}
