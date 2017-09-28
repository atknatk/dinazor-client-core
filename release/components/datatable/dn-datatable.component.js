import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Http } from '@angular/http';
// import '@dinazor/plugins/datatables-bundle/datatables.js';
// import * as dCss from '@dinazor/plugins/datatables-bundle/datatables.min.css';
// import * as dCss from 'datatables.net-dt/css/jquery.dataTables.css';
// import 'datatables.net/js/jquery.dataTables';
// import '@dinazor/plugins/datatables-bundle/datatable-custom-ui';
import 'datatables.net-bs';
import 'datatables.net-buttons-bs';
import { config } from '../../dinazor.config';
import { DnStorageService } from '../../services/storage.service';
import { isNullOrUndefined } from '../../utils/check';
var DnDatatableComponent = /** @class */ (function () {
    function DnDatatableComponent(el, http, cdRef, dnStorageService) {
        this.el = el;
        this.http = http;
        this.cdRef = cdRef;
        this.dnStorageService = dnStorageService;
        this.width = '100%';
        this.editButton = false;
        this.deleteButton = false;
        this.actionEditEmitter = new EventEmitter();
        this.actionDeleteEmitter = new EventEmitter();
    }
    DnDatatableComponent.prototype.actionDelete = function (event) {
        this.actionDeleteEmitter.emit(this.datatable.row($(event.currentTarget).parents('tr')).data());
    };
    DnDatatableComponent.prototype.actionEdit = function (event) {
        this.actionEditEmitter.emit(this.datatable.row($(event.currentTarget).parents('tr')).data());
    };
    DnDatatableComponent.prototype.ngOnInit = function () {
        /*        Promise.all([
                    System.import('script-loader!smartadmin-plugins/datatables-bundle/datatables.min.js'),
                ]).then(() => {
                });*/
        this.render();
    };
    DnDatatableComponent.prototype.render = function () {
        var _this = this;
        var element = $(this.el.nativeElement.children[0]);
        var options = this.dnDatatableBase.option || {};
        var toolbar = '';
        if (options.buttons)
            toolbar += 'B';
        if (this.paginationLength)
            toolbar += 'l';
        if (this.columnsHide)
            toolbar += 'C';
        if (typeof options.ajax === 'string') {
            var url = options.ajax;
            options.ajax = {
                url: url
                // complete: function (xhr) {
                //
                // }
            };
        }
        if (!options.dom) {
            options.dom = '<\'dt-toolbar\'<\'col-sm-12 col-xs-12 hidden-xs text-right\'' + toolbar +
                '>r>t<\'dt-toolbar-footer\'<\'col-sm-6 col-xs-12 hidden-xs\'i><\'col-xs-12 col-sm-6\'p>>';
        }
        var token;
        var user = this.dnStorageService.getItem(config.DINAZOR_USER_KEY);
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
            initComplete: function (settings, json) {
                element.parent().find('.input-sm').removeClass('input-sm').addClass('input-md');
            },
            fnDrawCallback: function () {
                //   console.log('[fnDrawCallback] enter: ' + this);
                _this.cdRef.detectChanges();
                _this.el.nativeElement.querySelectorAll('button.btn-primary')
                    .forEach(function (b) { return b.addEventListener('click', _this.actionEdit.bind(_this)); });
                _this.el.nativeElement.querySelectorAll('button.btn-danger')
                    .forEach(function (b) { return b.addEventListener('click', _this.actionDelete.bind(_this)); });
            },
            fnHeaderCallback: function (nHead, aData, iStart, iEnd, aiDisplay) {
                // nHead.getElementsByTagName('th')[0].innerHTML = 'Displaying ' + (iEnd - iStart) + ' records';
            },
            processing: true,
            serverSide: true,
            // ajax: (data, callback, settings) => {
            //   this.http.get(options.url)
            //     .map(this.extractData)
            //     .catch(this.handleError)
            //     .subscribe((data) => {
            //       console.log('data from rest endpoint', data);
            //       callback({
            //         aaData: data.slice(0, 100)
            //       })
            //     })
            // },
            ajax: {
                url: 'api/' + options.url + '?token=' + token,
                type: 'post',
                dataFilter: function (data) {
                    var obj = JSON.parse(data);
                    if (obj.isSuccess) {
                        return JSON.stringify(obj.data);
                    }
                    else {
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
            var content = '';
            var width = 24;
            if (this.editButton) {
                content = "<button type=\"submit\" class=\"btn btn-sm btn-primary txt-color-white\"><i class=\"fa fa-edit\">\n                            </i></button>";
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
        }
        else if (options.columns[0].columnType === 'text' && isNullOrUndefined(options.columns[0].data)
            && isNullOrUndefined(options.columns[0].serverKey)) {
            options.columns.splice(0, 1);
        }
        if (options.columns) {
            var i_1 = 0;
            options.columns.forEach(function (column) {
                if (column.dateFormat) {
                    column['render'] = function (obj) {
                        if (obj === null)
                            return '';
                        return obj;
                        // return moment(obj).format(column.dateFormat);
                    };
                }
                if (column.columnType && column.columnType.toLowerCase() === 'html') {
                    var columnDef = {
                        columnDefs: [{
                                width: column.width,
                                targets: i_1,
                                data: column.serverKey ? column.serverKey : null,
                                defaultContent: column.content ? column.content : undefined,
                                orderable: column.orderable,
                                render: column.render ? column.render : undefined,
                            }]
                    };
                    options = $.extend(options, columnDef);
                }
                i_1++;
            });
        }
        var z = 0;
        this.dnDatatableBase.columns.forEach(function (column) {
            options.columns[z].title = column.title;
            z++;
        });
        //    col['render'] = $.fn.dataTable.render.moment( 'X', 'Do MMM YY' )
        this.datatableOption = options;
        var _dataTable = element.DataTable(options);
        this.datatable = _dataTable;
        this.dnDatatableBase.getDatatable = function () {
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
            element.on('keyup change', 'thead th input[type=text]', function () {
                _dataTable
                    .column($(_this).parent().index() + ':visible')
                    .search(_this['value'])
                    .draw();
            });
        }
        if (!toolbar) {
            /* element.parent().find('.dt-toolbar').append('<div class='text-right'><img src='assets/img/logo.png'
             alt='SmartAdmin' style='width: 111px; margin-top: 3px; margin-right: 10px;'></div>');*/
        }
        if (this.detailsFormat) {
            var format_1 = this.detailsFormat;
            element.on('click', 'td.details-control', function () {
                var tr = $(_this).closest('tr');
                var row = _dataTable.row(tr);
                if (row.child.isShown()) {
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else {
                    row.child(format_1(row.data())).show();
                    tr.addClass('shown');
                }
            });
        }
    };
    DnDatatableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-datatable',
                    template: "\n        <table id='{{dnDatatableBase.id}}' class='dataTable {{tableClass}}' width='{{width}}'>\n            <ng-content></ng-content>\n        </table>\n    ",
                    styles: []
                },] },
    ];
    /** @nocollapse */
    DnDatatableComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Http, },
        { type: ChangeDetectorRef, },
        { type: DnStorageService, },
    ]; };
    DnDatatableComponent.propDecorators = {
        'dnDatatableBase': [{ type: Input },],
        'filter': [{ type: Input },],
        'detailsFormat': [{ type: Input },],
        'paginationLength': [{ type: Input },],
        'columnsHide': [{ type: Input },],
        'tableClass': [{ type: Input },],
        'width': [{ type: Input },],
        'editButton': [{ type: Input },],
        'deleteButton': [{ type: Input },],
        'actionEditEmitter': [{ type: Output },],
        'actionDeleteEmitter': [{ type: Output },],
    };
    return DnDatatableComponent;
}());
export { DnDatatableComponent };
//# sourceMappingURL=dn-datatable.component.js.map