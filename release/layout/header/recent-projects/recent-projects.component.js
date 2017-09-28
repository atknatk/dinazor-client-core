import { Component } from '@angular/core';
import { RecentProjectsService } from './recent-projects.service';
var RecentProjectsComponent = /** @class */ (function () {
    function RecentProjectsComponent(projectsService) {
        this.projectsService = projectsService;
    }
    RecentProjectsComponent.prototype.ngOnInit = function () {
        this.projects = this.projectsService.getProjects();
    };
    RecentProjectsComponent.prototype.clearProjects = function () {
        this.projectsService.clearProjects();
        this.projects = this.projectsService.getProjects();
    };
    RecentProjectsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-recent-projects',
                    templateUrl: './recent-projects.component.html',
                    providers: [RecentProjectsService]
                },] },
    ];
    /** @nocollapse */
    RecentProjectsComponent.ctorParameters = function () { return [
        { type: RecentProjectsService, },
    ]; };
    return RecentProjectsComponent;
}());
export { RecentProjectsComponent };
//# sourceMappingURL=recent-projects.component.js.map