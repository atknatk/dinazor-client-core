import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import 'datatables.net-bs';
import 'datatables.net-buttons-bs';
import { config } from '../../dinazor.config';
import { AuthUser } from '../../model/auth-user';
import { DnResultDataBase } from '../../model/http-result-data-base';
import { DnStorageService } from '../../services/storage.service';
import { isNullOrUndefined } from '../../utils/check';
import { DnDatatableBase } from './dn-datatable.base';

declare let $: any;

@Component({

    selector: 'dn-datatable',
    template: `
        <table id='{{dnDatatableBase.id}}' class='dataTable {{tableClass}}' width='{{width}}'>
            <ng-content></ng-content>
        </table>
    `
})
export class DnDatatableComponent implements OnInit {

    datatable;
    datatableOption;

    @Input() public dnDatatableBase: DnDatatableBase;

    @Input() public filter: any;
    @Input() public detailsFormat: any;

    @Input() public paginationLength: boolean;
    @Input() public columnsHide: boolean;
    @Input() public tableClass: string;
    @Input() public width: string = '100%';

    @Input() public editButton: boolean = false;
    @Input() public deleteButton: boolean = false;

    @Output() actionEditEmitter: EventEmitter<any> = new EventEmitter();
    @Output() actionDeleteEmitter: EventEmitter<any> = new EventEmitter();

    constructor(private el: ElementRef, private cdRef: ChangeDetectorRef,
                private dnStorageService: DnStorageService) {
    }

    actionDelete(event) {
        this.actionDeleteEmitter.emit(this.datatable.row($(event.currentTarget).parents('tr')).data());
    }

    actionEdit(event) {
        this.actionEditEmitter.emit(this.datatable.row($(event.currentTarget).parents('tr')).data());
    }

    ngOnInit() {
        this.render();
    }

    render() {
        const element = $(this.el.nativeElement.children[0]);
        let options: any = this.dnDatatableBase.option || {};

        let toolbar = '';
        if (options.buttons)
            toolbar += 'B';
        if (this.paginationLength)
            toolbar += 'l';
        if (this.columnsHide)
            toolbar += 'C';

        if (typeof options.ajax === 'string') {
            const url = options.ajax;
            options.ajax = {
                url
                // complete: function (xhr) {
                //
                // }
            };
        }
        if (!options.dom) {
            options.dom = '<\'dt-toolbar\'<\'col-sm-12 col-xs-12 hidden-xs text-right\'' + toolbar +
                '>r>t<\'dt-toolbar-footer\'<\'col-sm-6 col-xs-12 hidden-xs\'i><\'col-xs-12 col-sm-6\'p>>';
        }

        let token: string;
        const user: AuthUser = this.dnStorageService.getItem(config.DINAZOR_USER_KEY);
        token = user['token'];
        options = $.extend(options, {

            // 'dom':'<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs text-right'' + toolbar +
            oLanguage: {
                sSearch: '<span class=\'input-group-addon\'><i class=\'glyphicon glyphicon-search\'></i></span> ',
                decimal: '',
                sLengthMenu: '_MENU_',
                sInfo: 'Toplam _TOTAL_ kayıttan _START_ ile _END_ arasındaki kayıtlar gösterilmektedir',
                sInfoEmpty: 'Eşleşen kayıt bulunmamaktadır.',
                sEmptyTable: 'Gösterilecek kayıt bulunmamaktadır',
                sZeroRecords: 'Eşleşen kayıt bulunmamaktadır',
                sInfoFiltered: '(Toplam _MAX_ adet kayıttan filtrelenmiştir)',
                sInfoPostFix: '',
                sThousands: ',',
                oPaginate: {
                    sFirst: 'Başlangıç',
                    sLast: 'Sonuncu',
                    sNext: 'Sonraki',
                    sPrevious: 'Önceki'
                },
                oAria: {
                    sSortAscending: ': küçükten büyüğe sırala',
                    sSortDescending: ': büyükten küçüğe sırala'
                },
                sProcessing: 'Yükleniyor...',
            },
            autoWidth: false,
            retrieve: true,
            responsive: true,
            searching: true,
            initComplete: (/*settings, json*/) => {
                element.parent().find('.input-sm').removeClass('input-sm').addClass('input-md');
            },
            fnDrawCallback: () => {
                this.cdRef.detectChanges();
                const primary = this.el.nativeElement.querySelectorAll('button.btn-primary');
                for (let i = 0; i < primary.length; i++) {
                    const item = primary[i];
                    item.addEventListener('click', this.actionEdit.bind(this));
                }
                const danger = this.el.nativeElement.querySelectorAll('button.btn-danger');
                for (let i = 0; i < danger.length; i++) {
                    const item = danger[i];
                    item.addEventListener('click', this.actionEdit.bind(this));
                }
            },
            fnHeaderCallback: (nHead, aData, iStart, iEnd, aiDisplay) => {
                // nHead.getElementsByTagName('th')[0].innerHTML = 'Displaying ' + (iEnd - iStart) + ' records';
            },
            processing: true,
            serverSide: true,
            ajax: {
                url: 'api/' + options.url + '?token=' + token,
                type: 'post',
                dataFilter: (data) => {
                    const obj: DnResultDataBase<any> = JSON.parse(data);
                    if (obj.isSuccess) {
                        return JSON.stringify(obj.data);
                    } else {
                        obj.data = {
                            draw: 1,
                            recordsTotal: 0,
                            recordsFiltered: 0,
                            data: {}
                        };
                    }
                }
            }
        });

        if (this.editButton || this.deleteButton) {
            let content = '';
            let width = 24;
            if (this.editButton) {
                content = `<button type="submit" class="btn btn-sm btn-primary txt-color-white"><i class="fa fa-edit">
                            </i></button>`;
                width += 25;
            }
            if (this.deleteButton) {
                content += '<button type="button" class="btn btn-sm  btn-danger txt-color-white" ' +
                    'style="margin-left: 5px;"><i class="fa fa-trash-o"></i></button>';
                width += 25;
            }

            options = $.extend(options, {
                columnDefs: [{
                    width: width + 'px',
                    targets: 0,
                    data: null,
                    defaultContent: content,
                    orderable: false,
                }]
            });
        } else if (options.columns[0].columnType === 'text' && isNullOrUndefined(options.columns[0].data)
            && isNullOrUndefined(options.columns[0].serverKey)) {
            options.columns.splice(0, 1);
        }

        if (options.columns) {
            let i = 0;
            options.columns.forEach(column => {
                if (column.dateFormat) {
                    column['render'] = (obj) => {
                        if (obj === null) return '';
                        return obj;
                        // return moment(obj).format(column.dateFormat);
                    };
                }
                if (column.columnType && column.columnType.toLowerCase() === 'html') {
                    const columnDef = {
                        columnDefs: [{
                            width: column.width,
                            targets: i,
                            data: column.serverKey ? column.serverKey : null,
                            defaultContent: column.content ? column.content : undefined,
                            orderable: column.orderable,
                            render: column.render ? column.render : undefined,
                        }]
                    };
                    options = $.extend(options, columnDef);
                }
                i++;
            });
        }
        let z = 0;
        if (this.dnDatatableBase && this.dnDatatableBase.columns && options.columns)
            this.dnDatatableBase.columns.forEach(column => {
                const optionColumns = options.columns.filter(item => column.serverKey === item.data);
                if (optionColumns && optionColumns.length === 1) {
                    optionColumns[0].title = column.title;
                }
                z++;
            });

//    col['render'] = $.fn.dataTable.render.moment( 'X', 'Do MMM YY' )

        this.datatableOption = options;
        const _dataTable = element.DataTable(options);
        this.datatable = _dataTable;

        this.dnDatatableBase.getDatatable = () => {
            return _dataTable;
        };

        if (this.dnDatatableBase.afterInit) {
            this.dnDatatableBase.afterInit(this.datatable);
        }

        // if(this.dnDatatableBase.refreshButton){
        //   _dataTable.buttons.reload = {
        //     text: 'Yenile',
        //     action: function ( e, dt, node, config ) {
        //       dt.ajax.reload();
        //     }
        //   };
        // }

        // if(this.editButton || this.deleteButton){
        //   $('#samplecrud--datatables-rest-demo tbody').on( 'click', 'button', function () {
        //     let data = _dataTable.row( $(this).parents('tr') ).data();
        //     ths.actionEditEmitter.emit(data);
        //   });
        // }

        if (this.filter) {
            // Apply the filter
            element.on('keyup change', 'thead th input[type=text]', () => {
                _dataTable
                    .column($(this).parent().index() + ':visible')
                    .search(this['value'])
                    .draw();

            });
        }

        if (!toolbar) {
            /* element.parent().find('.dt-toolbar').append('<div class='text-right'><img src='assets/img/logo.png'
             alt='SmartAdmin' style='width: 111px; margin-top: 3px; margin-right: 10px;'></div>');*/
        }

        if (this.detailsFormat) {
            const format = this.detailsFormat;
            element.on('click', 'td.details-control', () => {
                const tr = $(this).closest('tr');
                const row = _dataTable.row(tr);
                if (row.child.isShown()) {
                    row.child.hide();
                    tr.removeClass('shown');
                } else {
                    row.child(format(row.data())).show();
                    tr.addClass('shown');
                }
            });
        }

    }
}
