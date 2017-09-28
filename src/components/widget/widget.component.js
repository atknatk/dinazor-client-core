"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WidgetComponent = /** @class */ (function () {
    function WidgetComponent(el, router) {
        this.el = el;
        this.router = router;
        this.colorbutton = false;
        this.editbutton = false;
        this.togglebutton = false;
        this.deletebutton = false;
        this.fullscreenbutton = false;
        this.custombutton = false;
        this.collapsed = false;
        this.sortable = false;
        this.hidden = false;
        this.load = false;
        this.refresh = false;
        this.searchbutton = false;
    }
    WidgetComponent_1 = WidgetComponent;
    WidgetComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.widgetId)
            this.widgetId = this.genId();
        var widget = this.el.nativeElement.children[0];
        if (this.sortable) {
            widget.className += ' jarviswidget-sortable';
        }
        if (this.color) {
            widget.className += (' jarviswidget-color-' + this.color);
        }
        ['colorbutton',
            'editbutton',
            'togglebutton',
            'deletebutton',
            'fullscreenbutton',
            'custombutton',
            'sortable'
        ].forEach(function (option) {
            if (!_this[option]) {
                widget.setAttribute('data-widget-' + option, 'false');
            }
        });
        [
            'hidden',
            'collapsed'
        ].forEach(function (option) {
            if (_this[option]) {
                widget.setAttribute('data-widget-' + option, 'true');
            }
        });
        // ['refresh', 'load'].forEach(function (option) {
        //   if (this[option])
        //     widgetProps['data-widget-' + option] = this[option]
        // }.bind(this));
    };
    WidgetComponent.prototype.ngAfterViewInit = function () {
        var $widget = $(this.el.nativeElement);
        if (this.editbutton) {
            $widget.find('.widget-body')
                .prepend('<div class=\'jarviswidget-editbox\'><input class=\'form-control\' type=\'text\'></div>');
        }
        var isFiller = $widget.hasClass('sa-fx-col');
        if ($widget.attr('class')) {
            $widget.find('.jarviswidget').addClass($widget.attr('class'));
            $widget.attr('class', '');
        }
        if (isFiller) {
            $widget.attr('class', 'sa-fx-col');
        }
    };
    WidgetComponent.prototype.genId = function () {
        if (this.name) {
            return this.name;
        }
        else {
            var heading = this.el.nativeElement.querySelector('header h2');
            var id = heading ? heading.textContent.trim() : 'jarviswidget-' + WidgetComponent_1.counter++;
            id = id.toLowerCase().replace(/\W+/gm, '-');
            var url = this.router.url.substr(1).replace(/\//g, '-');
            id = url + '--' + id;
            return id;
        }
    };
    WidgetComponent.counter = 0;
    __decorate([
        core_1.Input()
    ], WidgetComponent.prototype, "widgetId", void 0);
    __decorate([
        core_1.Input()
    ], WidgetComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input()
    ], WidgetComponent.prototype, "colorbutton", void 0);
    __decorate([
        core_1.Input()
    ], WidgetComponent.prototype, "editbutton", void 0);
    __decorate([
        core_1.Input()
    ], WidgetComponent.prototype, "togglebutton", void 0);
    __decorate([
        core_1.Input()
    ], WidgetComponent.prototype, "deletebutton", void 0);
    __decorate([
        core_1.Input()
    ], WidgetComponent.prototype, "fullscreenbutton", void 0);
    __decorate([
        core_1.Input()
    ], WidgetComponent.prototype, "custombutton", void 0);
    __decorate([
        core_1.Input()
    ], WidgetComponent.prototype, "collapsed", void 0);
    __decorate([
        core_1.Input()
    ], WidgetComponent.prototype, "sortable", void 0);
    __decorate([
        core_1.Input()
    ], WidgetComponent.prototype, "hidden", void 0);
    __decorate([
        core_1.Input()
    ], WidgetComponent.prototype, "color", void 0);
    __decorate([
        core_1.Input()
    ], WidgetComponent.prototype, "load", void 0);
    __decorate([
        core_1.Input()
    ], WidgetComponent.prototype, "refresh", void 0);
    __decorate([
        core_1.Input()
    ], WidgetComponent.prototype, "searchbutton", void 0);
    WidgetComponent = WidgetComponent_1 = __decorate([
        core_1.Component({
            selector: 'dn-widget',
            template: "\n        <div id='{{widgetId}}' class='jarviswidget dinazor-width-animation'\n\n        >\n            <ng-content></ng-content>\n        </div>"
        })
    ], WidgetComponent);
    return WidgetComponent;
    var WidgetComponent_1;
}());
exports.WidgetComponent = WidgetComponent;
