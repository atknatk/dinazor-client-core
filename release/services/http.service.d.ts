import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { DnResultDataBase } from '../model/http-result-data-base';
import { DnNotificationService } from './notification.service';
import { DnStorageService } from './storage.service';
export declare class DnHttpService<T> {
    private http;
    private dnStorageService;
    private notificationService;
    private url;
    private plainUrl;
    private token;
    constructor(http: Http, dnStorageService: DnStorageService, notificationService: DnNotificationService);
    delete(id: any): Observable<DnResultDataBase<T[]>>;
    deleteWithUrl(url: any): Observable<DnResultDataBase<T[]>>;
    get(url?: string, extra?: any): Observable<DnResultDataBase<T[]>>;
    getById(id: number): Observable<DnResultDataBase<T[]>>;
    initToken(): void;
    post(body: object, url?: string, extra?: any): Observable<DnResultDataBase<T>>;
    postWithoutToken(body: object, url?: string): Observable<DnResultDataBase<T[]>>;
    put(body: object, url?: string, extra?: any): Observable<DnResultDataBase<T[]>>;
    setUrl(url: string): void;
    setUrlWithoutApi(url: string): void;
    private getToken();
    private getUrl(id?);
    private showErrorMessage(err);
}
