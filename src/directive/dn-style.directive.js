"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by cabbar on 30.03.2017.
 */
var core_1 = require("@angular/core");
var DnStyleDirective = /** @class */ (function () {
    function DnStyleDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    DnStyleDirective.prototype.ngOnInit = function () {
        if (this.styles) {
            for (var _i = 0, _a = this.styles; _i < _a.length; _i++) {
                var style = _a[_i];
                this.renderer.setElementStyle(this.el.nativeElement, style.key, style.value);
            }
        }
    };
    __decorate([
        core_1.Input('dnStyle')
    ], DnStyleDirective.prototype, "styles", void 0);
    DnStyleDirective = __decorate([
        core_1.Directive({
            selector: '[dnStyle]'
        })
    ], DnStyleDirective);
    return DnStyleDirective;
}());
exports.DnStyleDirective = DnStyleDirective;
