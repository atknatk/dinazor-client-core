import { Component, ElementRef, Input } from '@angular/core';
import { Guid } from '../../utils/guid';
var WidgetComponent = /** @class */ (function () {
    function WidgetComponent(el) {
        this.el = el;
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
    WidgetComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.widgetId)
            this.widgetId = Guid.newGuid();
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
    WidgetComponent.counter = 0;
    WidgetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-widget',
                    template: "\n        <div id='{{widgetId}}' class='jarviswidget dinazor-width-animation'\n\n        >\n            <ng-content></ng-content>\n        </div>"
                },] },
    ];
    /** @nocollapse */
    WidgetComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    WidgetComponent.propDecorators = {
        'widgetId': [{ type: Input },],
        'name': [{ type: Input },],
        'colorbutton': [{ type: Input },],
        'editbutton': [{ type: Input },],
        'togglebutton': [{ type: Input },],
        'deletebutton': [{ type: Input },],
        'fullscreenbutton': [{ type: Input },],
        'custombutton': [{ type: Input },],
        'collapsed': [{ type: Input },],
        'sortable': [{ type: Input },],
        'hidden': [{ type: Input },],
        'color': [{ type: Input },],
        'load': [{ type: Input },],
        'refresh': [{ type: Input },],
        'searchbutton': [{ type: Input },],
    };
    return WidgetComponent;
}());
export { WidgetComponent };
//# sourceMappingURL=widget.component.js.map