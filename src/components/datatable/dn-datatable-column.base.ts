/**
 * Created by cabbar on 28.03.2017.
 */
export class DnDatatableColumnBase {
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

  constructor(options: {
    title?: string,
    columnType?: string,
    class?: string,
    width?: string,
    style?: string,
    serverKey?: any,
    orderable?: boolean,
    dateFormat?: any,
    hideInCrud?: boolean,
    content?: string,
    render?: (data, type, row) => string;
  } = {}) {
    this.title = options.title;
    this.width = options.width;
    this.class = options.class || '';
    this.columnType = options.columnType || 'text';
    this.style = options.style || '';
    this.content = options.content;
    this.serverKey = options.serverKey;
    this.orderable = options.orderable === undefined || options.orderable == null ? true : options.orderable;
    this.dateFormat = options.dateFormat;
    this.hideInCrud = options.hideInCrud === undefined || options.hideInCrud == null ? false : options.hideInCrud;
    this.render = options.render;
  }
}
