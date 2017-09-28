"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by cabbar on 12.04.2017.
 */
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
var check_1 = require("../../../utils/check");
var DnSelect2Service = /** @class */ (function () {
    function DnSelect2Service(service) {
        this.service = service;
        this.list = [];
    }
    DnSelect2Service.prototype.addItem = function (item) {
        this.list.push(item);
    };
    DnSelect2Service.prototype.getItems = function (ids) {
        var selectedItems = [];
        this.list.forEach(function (item) {
            ids.forEach(function (id) {
                if (item.id === id) {
                    selectedItems.push(item);
                }
            });
        });
        return Rx_1.Observable.of(selectedItems);
    };
    DnSelect2Service.prototype.listData = function (pattern, displayText) {
        var _this = this;
        var filteredList = [];
        this.list.forEach(function (country) {
            if (displayText !== undefined) {
                var text = displayText(Object.assign({ entity: country }, country));
                if (!check_1.isNullOrUndefined(text)) {
                    if (displayText(Object.assign({ entity: country }, country)).toUpperCase().indexOf(pattern.toUpperCase()) !== -1) {
                        filteredList.push(country);
                    }
                }
            }
            else {
                if (country.name.toUpperCase().indexOf(pattern.toUpperCase()) !== -1) {
                    filteredList.push(country);
                }
            }
        });
        filteredList.sort(function (item1, item2) {
            return _this.sortFunction(Object.assign({ entity: item1 }, item1), Object.assign({ entity: item2 }, item2), displayText);
        });
        return Rx_1.Observable.of(filteredList);
    };
    DnSelect2Service.prototype.listDataMax = function (pattern, maxResults, displayText) {
        var ths = this;
        var filteredList = this.list
            .filter(function (country) {
            if (displayText !== undefined) {
                return displayText(country).toUpperCase().indexOf(pattern.toUpperCase()) !== -1;
            }
            else {
                return country.name.toUpperCase().indexOf(pattern.toUpperCase()) !== -1;
            }
        })
            .sort(function (item1, item2) {
            return ths.sortFunction(Object.assign({ entity: item1 }, item1), Object.assign({ entity: item2 }, item2), displayText);
        });
        return Rx_1.Observable
            .timer(1000)
            .map(function (t) {
            return {
                count: filteredList.length,
                results: maxResults && maxResults < filteredList.length ? filteredList.splice(0, maxResults) : filteredList
            };
        });
    };
    DnSelect2Service.prototype.loadDataFromLocal = function (data) {
        this.list = data;
    };
    DnSelect2Service.prototype.loadDataFromService = function (url) {
        var _this = this;
        this.serviceUrl = url;
        this.list = [];
        if (check_1.isNullOrUndefined(url))
            return;
        this.service.setUrl(url);
        this.service.get().subscribe(function (res) {
            if (res['isSuccess']) {
                var data = res['data'];
                if (data && Array.isArray(data)) {
                    for (var i = 0; i < data.length; i++) {
                        _this.list.push(data[i]);
                    }
                }
            }
        });
    };
    DnSelect2Service.prototype.reload = function () {
        if (this.serviceUrl)
            this.loadDataFromService(this.serviceUrl);
    };
    DnSelect2Service.prototype.removeItem = function (item) {
        this.list = this.list.filter(function (obj) {
            return obj.id !== item.id;
        });
    };
    DnSelect2Service.prototype.sortFunction = function (item1, item2, displayText) {
        if (displayText !== undefined) {
            if (displayText(item1) < displayText(item2)) {
                return -1;
            }
            if (displayText(item1) > displayText(item2)) {
                return 1;
            }
        }
        else {
            if (item1.name < item2.name) {
                return -1;
            }
            if (item1.name > item2.name) {
                return 1;
            }
        }
        return 0;
    };
    DnSelect2Service = __decorate([
        core_1.Injectable()
    ], DnSelect2Service);
    return DnSelect2Service;
}());
exports.DnSelect2Service = DnSelect2Service;
