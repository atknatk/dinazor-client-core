import { Component, ElementRef, Renderer } from '@angular/core';
import { ActivitiesService } from './activities.service';
var ActivitiesComponent = /** @class */ (function () {
    function ActivitiesComponent(el, renderer, activitiesService) {
        this.el = el;
        this.renderer = renderer;
        this.activitiesService = activitiesService;
        this.active = false;
        this.loading = false;
        this.activities = [];
        this.count = 0;
        this.lastUpdate = new Date();
    }
    ActivitiesComponent.prototype.ngOnInit = function () {
        /* this.activitiesService.getActivities().subscribe(data=> {
           this.activities = data;
           this.count = data.reduce((sum, it)=> sum + it.data.length, 0);
           this.currentActivity = data[0];
         });*/
    };
    ActivitiesComponent.prototype.setActivity = function (activity) {
        this.currentActivity = activity;
    };
    ActivitiesComponent.prototype.onToggle = function () {
        var _this = this;
        var dropdown = $('.ajax-dropdown', this.el.nativeElement);
        this.active = !this.active;
        if (this.active) {
            dropdown.fadeIn();
            this.documentSub = this.renderer.listenGlobal('document', 'mouseup', function (event) {
                if (!_this.el.nativeElement.contains(event.target)) {
                    dropdown.fadeOut();
                    _this.active = false;
                    _this.documentUnsub();
                }
            });
        }
        else {
            dropdown.fadeOut();
            this.documentUnsub();
        }
    };
    ActivitiesComponent.prototype.update = function () {
        var _this = this;
        this.loading = true;
        setTimeout(function () {
            _this.lastUpdate = new Date();
            _this.loading = false;
        }, 1000);
    };
    ActivitiesComponent.prototype.ngOnDestroy = function () {
        this.documentUnsub();
    };
    ActivitiesComponent.prototype.documentUnsub = function () {
        this.documentSub && this.documentSub();
        this.documentSub = null;
    };
    ActivitiesComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-activities',
                    templateUrl: './activities.component.html',
                    providers: [ActivitiesService],
                },] },
    ];
    /** @nocollapse */
    ActivitiesComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer, },
        { type: ActivitiesService, },
    ]; };
    return ActivitiesComponent;
}());
export { ActivitiesComponent };
//# sourceMappingURL=activities.component.js.map