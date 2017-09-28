/**
 * Created by cabbar on 28.03.2017.
 */
export declare class DnDatatableColumnBase {
    title: string;
    columnType: string;
    class: string;
    style: string;
    serverKey: any;
    orderable: boolean;
    dateFormat: any;
    hideInCrud: boolean;
    content: string;
    width: string;
    render: (data, type, row) => string;
    constructor(options?: {
        title?: string;
        columnType?: string;
        class?: string;
        width?: string;
        style?: string;
        serverKey?: any;
        orderable?: boolean;
        dateFormat?: any;
        hideInCrud?: boolean;
        content?: string;
        render?: (data, type, row) => string;
    });
}
