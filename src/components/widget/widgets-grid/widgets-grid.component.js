"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var widget_defaults_1 = require("../widget.defaults");
require("@dinazor/plugins/dnwidgets/jarvis.widget.ng2.js");
var WidgetsGridComponent = /** @class */ (function () {
    function WidgetsGridComponent(el) {
        this.el = el;
    }
    WidgetsGridComponent.prototype.ngAfterViewInit = function () {
        $('#widgets-grid', this.el.nativeElement).jarvisWidgets(widget_defaults_1.default);
    };
    WidgetsGridComponent = __decorate([
        core_1.Component({
            selector: 'dn-widgets-grid',
            template: "\n     <section id='widgets-grid'>\n       <ng-content></ng-content>\n     </section>\n  ",
            styles: []
        })
    ], WidgetsGridComponent);
    return WidgetsGridComponent;
}());
exports.WidgetsGridComponent = WidgetsGridComponent;
