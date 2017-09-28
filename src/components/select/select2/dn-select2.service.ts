/**
 * Created by cabbar on 12.04.2017.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DnHttpService } from '../../../services/http.service';
import { isNullOrUndefined } from '../../../utils/check';
import { DnSelect2Item } from './dn-select2-item';

@Injectable()
export class DnSelect2Service {

    private list: DnSelect2Item[] = [];
    private serviceUrl;

    constructor(private service: DnHttpService<any>) {
    }

    public addItem(item: DnSelect2Item) {
        this.list.push(item);

    }

    public getItems(ids: string[]): Observable<DnSelect2Item[]> {
        const selectedItems: DnSelect2Item[] = [];

        this.list.forEach(item => {
            ids.forEach(id => {
                if (item.id === id) {
                    selectedItems.push(item);
                }
            });
        });

        return Observable.of(selectedItems);
    }

    public listData(pattern: string, displayText: (_: DnSelect2Item) => string): Observable<DnSelect2Item[]> {

        const filteredList: DnSelect2Item[] = [];

        this.list.forEach(country => {
            if (displayText !== undefined) {
                const text = displayText(Object.assign({entity: country}, country));
                if (!isNullOrUndefined(text)) {
                    if (displayText(Object.assign({entity: country}, country)).toUpperCase().indexOf(pattern.toUpperCase()) !== -1) {
                        filteredList.push(country);
                    }
                }
            } else {
                if (country.name.toUpperCase().indexOf(pattern.toUpperCase()) !== -1) {
                    filteredList.push(country);
                }
            }
        });

        filteredList.sort((item1: DnSelect2Item, item2: DnSelect2Item) => {
            return this.sortFunction(Object.assign({entity: item1}, item1), Object.assign({entity: item2}, item2), displayText);
        });

        return Observable.of(filteredList);
    }

    public listDataMax(pattern: string, maxResults: number, displayText: (_: DnSelect2Item) => string): Observable<{ count: number, results: DnSelect2Item[] }> {
        let ths = this;
        const filteredList = this.list
            .filter((country) => {
                if (displayText !== undefined) {
                    return displayText(country).toUpperCase().indexOf(pattern.toUpperCase()) !== -1;
                } else {
                    return country.name.toUpperCase().indexOf(pattern.toUpperCase()) !== -1;
                }

            })
            .sort((item1, item2) => {
                return ths.sortFunction(Object.assign({entity: item1}, item1), Object.assign({entity: item2}, item2), displayText);
            });

        return Observable
            .timer(1000)
            .map((t) => {
                return {
                    count: filteredList.length,
                    results: maxResults && maxResults < filteredList.length ? filteredList.splice(0, maxResults) : filteredList
                };
            });
    }

    public loadDataFromLocal(data: any[]) {
        this.list = data;
    }

    public loadDataFromService(url: string) {
        this.serviceUrl = url;
        this.list = [];
        if (isNullOrUndefined(url)) return;
        this.service.setUrl(url);
        this.service.get().subscribe(
            res => {
                if (res['isSuccess']) {
                    const data = res['data'];
                    if (data && Array.isArray(data)) {
                        for (let i = 0; i < data.length; i++) {
                            this.list.push(data[i]);
                        }
                    }
                }
            }
        );
    }

    public reload() {
        if (this.serviceUrl)
            this.loadDataFromService(this.serviceUrl);
    }

    public removeItem(item: DnSelect2Item) {
        this.list = this.list.filter(function(obj) {
            return obj.id !== item.id;
        });
    }

    private sortFunction(item1: DnSelect2Item, item2: DnSelect2Item, displayText: (_: DnSelect2Item) => string) {
        if (displayText !== undefined) {
            if (displayText(item1) < displayText(item2)) {
                return -1;
            }
            if (displayText(item1) > displayText(item2)) {
                return 1;
            }
        } else {
            if (item1.name < item2.name) {
                return -1;
            }
            if (item1.name > item2.name) {
                return 1;
            }
        }
        return 0;
    }
}
