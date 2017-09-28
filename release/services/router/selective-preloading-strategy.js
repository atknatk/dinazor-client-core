import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
var DnSelectivePreloadingStrategy = /** @class */ (function () {
    function DnSelectivePreloadingStrategy() {
        this.preloadedModules = [];
    }
    DnSelectivePreloadingStrategy.prototype.preload = function (route, load) {
        if (route.data && route.data['preload']) {
            // add the route path to the preloaded module array
            this.preloadedModules.push(route.path);
            // log the route path to the console
            console.log('Preloaded: ' + route.path);
            return load();
        }
        else {
            return Observable.of(null);
        }
    };
    DnSelectivePreloadingStrategy.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DnSelectivePreloadingStrategy.ctorParameters = function () { return []; };
    return DnSelectivePreloadingStrategy;
}());
export { DnSelectivePreloadingStrategy };
//# sourceMappingURL=selective-preloading-strategy.js.map