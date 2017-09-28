import { Injectable } from '@angular/core';
var RecentProjectsService = /** @class */ (function () {
    function RecentProjectsService() {
        this.projects = [
            {
                'href': '/',
                'title': 'Online e-merchant management system - attaching integration with the iOS'
            },
            {
                'href': '/',
                'title': 'Notes on pipeline upgradee'
            },
            {
                'href': '/',
                'title': 'Assesment Report for merchant account'
            }
        ];
    }
    RecentProjectsService.prototype.getProjects = function () {
        return this.projects;
    };
    RecentProjectsService.prototype.clearProjects = function () {
        this.projects = [];
    };
    RecentProjectsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    RecentProjectsService.ctorParameters = function () { return []; };
    return RecentProjectsService;
}());
export { RecentProjectsService };
//# sourceMappingURL=recent-projects.service.js.map