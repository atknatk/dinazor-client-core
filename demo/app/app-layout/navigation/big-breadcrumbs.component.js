"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BigBreadcrumbsComponent = /** @class */ (function () {
    function BigBreadcrumbsComponent() {
    }
    __decorate([
        core_1.Input()
    ], BigBreadcrumbsComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input()
    ], BigBreadcrumbsComponent.prototype, "items", void 0);
    BigBreadcrumbsComponent = __decorate([
        core_1.Component({
            selector: 'dn-big-breadcrumbs',
            template: "\n        <div><h1 class='page-title txt-color-blueDark'>\n            <i class='fa-fw fa fa-{{icon}}'></i>{{items[0]}}\n            <span *ngFor='let item of items.slice(1)'>> {{item}}</span>\n        </h1></div>\n    ",
        })
    ], BigBreadcrumbsComponent);
    return BigBreadcrumbsComponent;
}());
exports.BigBreadcrumbsComponent = BigBreadcrumbsComponent;
