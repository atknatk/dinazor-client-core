"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by cabbar on 27.03.2017.
 */
var core_1 = require("@angular/core");
var DnDynamicFormWidgetComponent = /** @class */ (function () {
    function DnDynamicFormWidgetComponent() {
        this.payLoadData = new core_1.EventEmitter();
    }
    DnDynamicFormWidgetComponent.prototype.onSubmit = function (payLoadData) {
        this.payLoadData.emit(payLoadData);
    };
    __decorate([
        core_1.Input()
    ], DnDynamicFormWidgetComponent.prototype, "dnWidget", void 0);
    __decorate([
        core_1.Output()
    ], DnDynamicFormWidgetComponent.prototype, "payLoadData", void 0);
    DnDynamicFormWidgetComponent = __decorate([
        core_1.Component({
            selector: 'dn-dynamic-form-widget',
            templateUrl: './dn-dynamic-form-widget.component.html',
        })
    ], DnDynamicFormWidgetComponent);
    return DnDynamicFormWidgetComponent;
}());
exports.DnDynamicFormWidgetComponent = DnDynamicFormWidgetComponent;
