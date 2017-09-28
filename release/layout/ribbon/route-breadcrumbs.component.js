import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
var RouteBreadcrumbsComponent = /** @class */ (function () {
    function RouteBreadcrumbsComponent(route, router) {
        this.route = route;
        this.router = router;
        this.items = [];
    }
    RouteBreadcrumbsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events
            .filter(function (e) { return e instanceof NavigationEnd; })
            .subscribe(function (v) {
            _this.items = [];
            _this.extract(_this.router.routerState.root);
        });
    };
    RouteBreadcrumbsComponent.prototype.extract = function (route) {
        var _this = this;
        var pageTitle = route.data.value['pageTitle'];
        if (pageTitle && this.items.indexOf(pageTitle) == -1) {
            this.items.push(route.data.value['pageTitle']);
        }
        if (route.children) {
            route.children.forEach(function (it) {
                _this.extract(it);
            });
        }
    };
    RouteBreadcrumbsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-route-breadcrumbs',
                    template: "\n        <ol class='breadcrumb'>\n           <li *ngFor='let item of items'>{{item}}</li>\n        </ol>\n  ",
                    styles: []
                },] },
    ];
    /** @nocollapse */
    RouteBreadcrumbsComponent.ctorParameters = function () { return [
        { type: ActivatedRoute, },
        { type: Router, },
    ]; };
    return RouteBreadcrumbsComponent;
}());
export { RouteBreadcrumbsComponent };
//# sourceMappingURL=route-breadcrumbs.component.js.map