import { DnDatatableColumnBase } from './dn-datatable-column.base';
import { isNullOrUndefined } from '../../utils/check';
import { noop } from '../../utils/common';
import { Guid } from '../../utils/guid';

/**
 * Created by cabbar on 28.03.2017.
 */

export class DnDatatableBase {
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
  getDatatable: () => any = noop;
  refreshButton: boolean;
  afterInit: (_: any) => any;

  constructor(options: {
    restUrl?: string,
    id?: string,
    columns?: DnDatatableColumnBase[],
    class?: string,
    editButton?: boolean,
    deleteButton?: boolean,
    editRole?: number,
    deleteRole?: number,
    option?: {},
    widgetId?: string,
    refreshButton?: boolean
    afterInit?: (_: any) => any
  } = {}) {
    this.restUrl = options.restUrl;
    this.id = options.id || Guid.newGuid();
    this.columns = options.columns;
    this.editRole = options.editRole;
    this.deleteRole = options.deleteRole;
    this.class = options.class || '';
    this.editButton = options.editButton;
    this.deleteButton = options.deleteButton;
    this.option = options.option || {};
    this.widgetId = options.widgetId;
    this.refreshButton = isNullOrUndefined(options.refreshButton) ? false : options.refreshButton;
    this.afterInit = isNullOrUndefined(options.afterInit) ? noop : options.afterInit;
  }
}
