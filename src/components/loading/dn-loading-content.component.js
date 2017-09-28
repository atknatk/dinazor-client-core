"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Created by Cabbar on 20.06.2017.
 */
var DnLoadingContentComponent = /** @class */ (function () {
    function DnLoadingContentComponent() {
    }
    __decorate([
        core_1.Input()
    ], DnLoadingContentComponent.prototype, "show", void 0);
    DnLoadingContentComponent = __decorate([
        core_1.Component({
            selector: 'dn-loading-content',
            template: "\n    <div id=\"content\">\n      <dn-loading [show]=\"show\"></dn-loading>\n      <ng-content></ng-content>\n    </div>"
        })
    ], DnLoadingContentComponent);
    return DnLoadingContentComponent;
}());
exports.DnLoadingContentComponent = DnLoadingContentComponent;
