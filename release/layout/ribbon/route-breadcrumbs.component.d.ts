import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
export declare class RouteBreadcrumbsComponent implements OnInit {
    private route;
    private router;
    items: Array<string>;
    constructor(route: ActivatedRoute, router: Router);
    ngOnInit(): void;
    extract(route: any): void;
}
