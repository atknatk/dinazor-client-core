/**
 * Created by cabbar on 12.04.2017.
 */
export interface DnSelect2Item {
  id: string;
  name: string;
  entity?: any;
}

export interface DnSelect2ItemEntity<T> extends DnSelect2Item{
  entity?: T;
}

