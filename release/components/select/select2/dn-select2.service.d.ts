import { Observable } from 'rxjs/Rx';
import { DnHttpService } from '../../../services/http.service';
import { DnSelect2Item } from './dn-select2-item';
export declare class DnSelect2Service {
    private service;
    private list;
    private serviceUrl;
    constructor(service: DnHttpService<any>);
    addItem(item: DnSelect2Item): void;
    getItems(ids: string[]): Observable<DnSelect2Item[]>;
    listData(pattern: string, displayText: (_: DnSelect2Item) => string): Observable<DnSelect2Item[]>;
    listDataMax(pattern: string, maxResults: number, displayText: (_: DnSelect2Item) => string): Observable<{
        count: number;
        results: DnSelect2Item[];
    }>;
    loadDataFromLocal(data: any[]): void;
    loadDataFromService(url: string): void;
    reload(): void;
    removeItem(item: DnSelect2Item): void;
    private sortFunction(item1, item2, displayText);
}
