/**
 * Created by cabbar on 19.04.2017.
 */
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { config } from '../dinazor.config';
import { AuthUser } from '../model/auth-user';
import { DnResultDataBase } from '../model/http-result-data-base';
import { isNullOrUndefinedOrEmpty } from '../utils/check';
import { DnNotificationService } from './notification.service';
import { DnStorageService } from './storage.service';

@Injectable()
export class DnHttpService<T> {
    private url: string;
    private plainUrl: string;
    private token: string;

    constructor(private http: Http,
                private dnStorageService: DnStorageService,
                private notificationService: DnNotificationService) {
    }

    delete(id: any): Observable<DnResultDataBase<T[]>> {
        return this.http.delete(this.getUrl(id))
            .map((res: Response) => res.json())
            .catch(this.showErrorMessage.bind(this));
    }

    deleteWithUrl(url): Observable<DnResultDataBase<T[]>> {
        return this.http.delete(url)
            .map((res: Response) => res.json())
            .catch(this.showErrorMessage.bind(this));
    }

    get(url?: string, extra?: any): Observable<DnResultDataBase<T[]>> {

        let serviceUrl: string = this.getUrl();
        if (url) {
            this.plainUrl = url;
            serviceUrl = 'api/' + url + this.getToken();
        }

        // if (this.httpCache.isCacheable(this.plainUrl)) {
        //     return this.httpCache.get(this.plainUrl, serviceUrl);
        // } else {
        if (extra && extra.loading && extra.context) {
            extra.context[extra.loading] = true;
        }
        return this.http.get(serviceUrl)
            .map((res: Response) => {
                const data = res.json();
                if (extra && extra.loading && extra.context) {
                    extra.context[extra.loading] = false;
                }
                return data;
            })
            .catch(err => {
                this.notificationService
                    .showError('Servis tarafında bir hata oluştu. Sistem yöneticisine başvurunuz. Hata Kodu: '
                        + err.status);
                if (extra && extra.loading && extra.context) {
                    extra.context[extra.loading] = false;
                }
                return Observable.throw(err.json().error || 'Server error');
            });
        // }
    }

    getById(id: number): Observable<DnResultDataBase<T[]>> {
        return this.http.get(this.getUrl(id))
            .map((res: Response) => res.json())
            .catch(this.showErrorMessage.bind(this));
    }

    initToken() {
        const user: AuthUser = this.dnStorageService.getItem(config.DINAZOR_USER_KEY);
        if (user)
            this.token = user.token;
    }

    post(body: object, url?: string, extra?: any): Observable<DnResultDataBase<T>> {
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions(
            {
                headers: headers
            });
        let _url: string = '';
        _url = url ? 'api/' + url + this.getToken() : this.getUrl();

        if (extra && extra.loading && extra.context) {
            extra.context[extra.loading] = true;
        }
        return this.http.post(_url, body, options)
            .map((res: Response) => {
                const data = res.json();
                if (extra && extra.loading && extra.context) {
                    extra.context[extra.loading] = false;
                }
                return data;
            })
            .catch(err => {
                this.notificationService
                    .showError('Servis tarafında bir hata oluştu. Sistem yöneticisine başvurunuz. Hata Kodu: '
                        + err.status);
                if (extra && extra.loading && extra.context) {
                    extra.context[extra.loading] = false;
                }
                return Observable.throw(err.json().error || 'Server error');
            });
    }

    postWithoutToken(body: object, url?: string): Observable<DnResultDataBase<T[]>> {
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});

        return this.http.post(url ? url : this.url, body, options)
            .map((res: Response) => res.json())
            .catch(this.showErrorMessage.bind(this));
    }

    put(body: object, url?: string, extra?: any): Observable<DnResultDataBase<T[]>> {
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        let serviceUrl: string = this.url;
        if (url) serviceUrl = 'api/' + url;
        if (extra && extra.loading && extra.context) {
            extra.context[extra.loading] = true;
        }
        return this.http.put(serviceUrl + '/' + body['id'] + this.getToken(), JSON.stringify(body), options)
            .map((res: Response) => {
                const data = res.json();
                if (extra && extra.loading && extra.context) {
                    extra.context[extra.loading] = false;
                }
                return data;
            })
            .catch(err => {
                this.notificationService
                    .showError('Servis tarafında bir hata oluştu. Sistem yöneticisine başvurunuz. Hata Kodu: '
                        + err.status);
                if (extra && extra.loading && extra.context) {
                    extra.context[extra.loading] = false;
                }
                return Observable.throw(err.json().error || 'Server error');
            });
    }

    setUrl(url: string) {
        this.plainUrl = url;
        this.url = url.indexOf('./') === 0 ? url.substring(2) : 'api/' + url;
        if (url.toLocaleLowerCase() === 'authorization') {
            return;
        }

        if (url !== '') {
            this.initToken();
        }
    }

    setUrlWithoutApi(url: string) {
        this.url = url;
    }

    private getToken(): string {
        if (isNullOrUndefinedOrEmpty(this.token)) {
            this.initToken();
        }
        if (this.token) {
            return '?token=' + this.token;
        } else {
            return '';
        }
    }

    private getUrl(id?: number): string {
        if (id) {
            return `${this.url}/${id}` + this.getToken();
        }
        return this.url + this.getToken();
    }

    private showErrorMessage(err: any): any {
        this.notificationService
            .showError('Servis tarafında bir hata oluştu. Sistem yöneticisine başvurunuz. Hata Kodu: '
                + err.status);
        return Observable.throw(err.json().error || 'Server error');
    }
}
