import { Component, Input } from '@angular/core';
var ActivitiesTaskComponent = /** @class */ (function () {
    function ActivitiesTaskComponent() {
    }
    ActivitiesTaskComponent.prototype.ngOnInit = function () {
    };
    ActivitiesTaskComponent.prototype.setProgressClasses = function () {
        return {
            'progress-bar': true,
            'progress-bar-success': this.item.status == 'MINOR' || this.item.status == 'NORMAL',
            'bg-color-teal': this.item.status == 'PRIMARY' || this.item.status == 'URGENT',
            'progress-bar-danger': this.item.status == 'CRITICAL'
        };
    };
    ActivitiesTaskComponent.decorators = [
        { type: Component, args: [{
                    selector: '[activitiesTask]',
                    templateUrl: './activities-task.component.html',
                },] },
    ];
    /** @nocollapse */
    ActivitiesTaskComponent.ctorParameters = function () { return []; };
    ActivitiesTaskComponent.propDecorators = {
        'item': [{ type: Input },],
    };
    return ActivitiesTaskComponent;
}());
export { ActivitiesTaskComponent };
//# sourceMappingURL=activities-task.component.js.map