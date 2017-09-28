"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var activities_service_1 = require("./activities.service");
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
    ActivitiesComponent = __decorate([
        core_1.Component({
            selector: 'dn-activities',
            templateUrl: './activities.component.html',
            providers: [activities_service_1.ActivitiesService],
        })
    ], ActivitiesComponent);
    return ActivitiesComponent;
}());
exports.ActivitiesComponent = ActivitiesComponent;
