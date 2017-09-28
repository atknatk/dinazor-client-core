import { Component, Input } from '@angular/core';
var ActivitiesNotificationComponent = /** @class */ (function () {
    function ActivitiesNotificationComponent() {
    }
    ActivitiesNotificationComponent.prototype.ngOnInit = function () {
    };
    ActivitiesNotificationComponent.prototype.setClasses = function () {
        var classes = {
            'fa fa-fw fa-2x': true
        };
        classes[this.item.icon] = true;
        return classes;
    };
    ActivitiesNotificationComponent.decorators = [
        { type: Component, args: [{
                    selector: '[activitiesNotification]',
                    templateUrl: './activities-notification.component.html',
                },] },
    ];
    /** @nocollapse */
    ActivitiesNotificationComponent.ctorParameters = function () { return []; };
    ActivitiesNotificationComponent.propDecorators = {
        'item': [{ type: Input },],
    };
    return ActivitiesNotificationComponent;
}());
export { ActivitiesNotificationComponent };
//# sourceMappingURL=activities-notification.component.js.map