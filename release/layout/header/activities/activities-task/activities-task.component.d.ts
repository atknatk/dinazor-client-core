import { OnInit } from '@angular/core';
export declare class ActivitiesTaskComponent implements OnInit {
    item: any;
    constructor();
    ngOnInit(): void;
    setProgressClasses(): {
        'progress-bar': boolean;
        'progress-bar-success': boolean;
        'bg-color-teal': boolean;
        'progress-bar-danger': boolean;
    };
}
