"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DblClickCopyDirective = /** @class */ (function () {
    function DblClickCopyDirective(element) {
        this.element = element;
        this.onCopy = new core_1.EventEmitter();
    }
    Object.defineProperty(DblClickCopyDirective.prototype, "title", {
        get: function () {
            return 'Double click to copy to clipboard';
        },
        enumerable: true,
        configurable: true
    });
    DblClickCopyDirective.prototype.onDblClick = function (event) {
        var selection = getSelection();
        var range = document.createRange();
        range.selectNodeContents(this.element.nativeElement);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        this.onCopy.emit(range);
        console.log("Copied " + range + " to your clipboard!");
    };
    __decorate([
        core_1.Output()
    ], DblClickCopyDirective.prototype, "onCopy", void 0);
    __decorate([
        core_1.HostBinding('attr.title')
    ], DblClickCopyDirective.prototype, "title", null);
    __decorate([
        core_1.HostListener('dblclick', ['$event'])
    ], DblClickCopyDirective.prototype, "onDblClick", null);
    DblClickCopyDirective = __decorate([
        core_1.Directive({ selector: '[dbl-click-copy]' })
    ], DblClickCopyDirective);
    return DblClickCopyDirective;
}());
exports.DblClickCopyDirective = DblClickCopyDirective;
