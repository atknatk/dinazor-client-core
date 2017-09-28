import { OnInit } from '@angular/core';
import { RecentProjectsService } from './recent-projects.service';
export declare class RecentProjectsComponent implements OnInit {
    private projectsService;
    projects: Array<any>;
    constructor(projectsService: RecentProjectsService);
    ngOnInit(): void;
    clearProjects(): void;
}
