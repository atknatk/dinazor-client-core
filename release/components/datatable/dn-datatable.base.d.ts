import { DnDatatableColumnBase } from './dn-datatable-column.base';
/**
 * Created by cabbar on 28.03.2017.
 */
export declare class DnDatatableBase {
    restUrl: string;
    id: string;
    columns: DnDatatableColumnBase[];
    class: string;
    editButton: boolean;
    deleteButton: boolean;
    editRole: number;
    deleteRole: number;
    option: {};
    widgetId: string;
    getDatatable: () => any;
    refreshButton: boolean;
    afterInit: (_: any) => any;
    constructor(options?: {
        restUrl?: string;
        id?: string;
        columns?: DnDatatableColumnBase[];
        class?: string;
        editButton?: boolean;
        deleteButton?: boolean;
        editRole?: number;
        deleteRole?: number;
        option?: {};
        widgetId?: string;
        refreshButton?: boolean;
        afterInit?: (_: any) => any;
    });
}
