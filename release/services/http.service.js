/**
 * Created by cabbar on 19.04.2017.
 */
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { config } from '../dinazor.config';
import { isNullOrUndefinedOrEmpty } from '../utils/check';
import { DnNotificationService } from './notification.service';
import { DnStorageService } from './storage.service';
var DnHttpService = /** @class */ (function () {
    function DnHttpService(http, dnStorageService, notificationService) {
        this.http = http;
        this.dnStorageService = dnStorageService;
        this.notificationService = notificationService;
    }
    DnHttpService.prototype.delete = function (id) {
        return this.http.delete(this.getUrl(id))
            .map(function (res) { return res.json(); })
            .catch(this.showErrorMessage.bind(this));
    };
    DnHttpService.prototype.deleteWithUrl = function (url) {
        return this.http.delete(url)
            .map(function (res) { return res.json(); })
            .catch(this.showErrorMessage.bind(this));
    };
    DnHttpService.prototype.get = function (url, extra) {
        var _this = this;
        var serviceUrl = this.getUrl();
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
            .map(function (res) {
            var data = res.json();
            if (extra && extra.loading && extra.context) {
                extra.context[extra.loading] = false;
            }
            return data;
        })
            .catch(function (err) {
            _this.notificationService
                .showError('Servis tarafında bir hata oluştu. Sistem yöneticisine başvurunuz. Hata Kodu: '
                + err.status);
            if (extra && extra.loading && extra.context) {
                extra.context[extra.loading] = false;
            }
            return Observable.throw(err.json().error || 'Server error');
        });
        // }
    };
    DnHttpService.prototype.getById = function (id) {
        return this.http.get(this.getUrl(id))
            .map(function (res) { return res.json(); })
            .catch(this.showErrorMessage.bind(this));
    };
    DnHttpService.prototype.initToken = function () {
        var user = this.dnStorageService.getItem(config.DINAZOR_USER_KEY);
        if (user)
            this.token = user.token;
    };
    DnHttpService.prototype.post = function (body, url, extra) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({
            headers: headers
        });
        var _url = '';
        _url = url ? 'api/' + url + this.getToken() : this.getUrl();
        if (extra && extra.loading && extra.context) {
            extra.context[extra.loading] = true;
        }
        return this.http.post(_url, body, options)
            .map(function (res) {
            var data = res.json();
            if (extra && extra.loading && extra.context) {
                extra.context[extra.loading] = false;
            }
            return data;
        })
            .catch(function (err) {
            _this.notificationService
                .showError('Servis tarafında bir hata oluştu. Sistem yöneticisine başvurunuz. Hata Kodu: '
                + err.status);
            if (extra && extra.loading && extra.context) {
                extra.context[extra.loading] = false;
            }
            return Observable.throw(err.json().error || 'Server error');
        });
    };
    DnHttpService.prototype.postWithoutToken = function (body, url) {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        return this.http.post(url ? url : this.url, body, options)
            .map(function (res) { return res.json(); })
            .catch(this.showErrorMessage.bind(this));
    };
    DnHttpService.prototype.put = function (body, url, extra) {
        var _this = this;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        var serviceUrl = this.url;
        if (url)
            serviceUrl = 'api/' + url;
        if (extra && extra.loading && extra.context) {
            extra.context[extra.loading] = true;
        }
        return this.http.put(serviceUrl + '/' + body['id'] + this.getToken(), JSON.stringify(body), options)
            .map(function (res) {
            var data = res.json();
            if (extra && extra.loading && extra.context) {
                extra.context[extra.loading] = false;
            }
            return data;
        })
            .catch(function (err) {
            _this.notificationService
                .showError('Servis tarafında bir hata oluştu. Sistem yöneticisine başvurunuz. Hata Kodu: '
                + err.status);
            if (extra && extra.loading && extra.context) {
                extra.context[extra.loading] = false;
            }
            return Observable.throw(err.json().error || 'Server error');
        });
    };
    DnHttpService.prototype.setUrl = function (url) {
        this.plainUrl = url;
        this.url = url.indexOf('./') === 0 ? url.substring(2) : 'api/' + url;
        if (url.toLocaleLowerCase() === 'authorization') {
            return;
        }
        if (url !== '') {
            this.initToken();
        }
    };
    DnHttpService.prototype.setUrlWithoutApi = function (url) {
        this.url = url;
    };
    DnHttpService.prototype.getToken = function () {
        if (isNullOrUndefinedOrEmpty(this.token)) {
            this.initToken();
        }
        if (this.token) {
            return '?token=' + this.token;
        }
        else {
            return '';
        }
    };
    DnHttpService.prototype.getUrl = function (id) {
        if (id) {
            return this.url + "/" + id + this.getToken();
        }
        return this.url + this.getToken();
    };
    DnHttpService.prototype.showErrorMessage = function (err) {
        this.notificationService
            .showError('Servis tarafında bir hata oluştu. Sistem yöneticisine başvurunuz. Hata Kodu: '
            + err.status);
        return Observable.throw(err.json().error || 'Server error');
    };
    DnHttpService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DnHttpService.ctorParameters = function () { return [
        { type: Http, },
        { type: DnStorageService, },
        { type: DnNotificationService, },
    ]; };
    return DnHttpService;
}());
export { DnHttpService };
//# sourceMappingURL=http.service.js.map