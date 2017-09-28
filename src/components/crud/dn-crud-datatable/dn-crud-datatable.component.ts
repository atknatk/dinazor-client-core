/**
 * Created by cabbar on 28.03.2017.
 */

import { Component, Input } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { DnDatatableColumnBase } from '../../datatable/dn-datatable-column.base';

@Component({
    selector: 'dn-crud-datatable',
    templateUrl: './dn-crud-datatable.component.html',
    styles: []
})
export class DnCrudDatatableComponent {
    @Input() columns: DnDatatableColumnBase[];

    constructor() {
        console.log(this.columns);
    }
}
