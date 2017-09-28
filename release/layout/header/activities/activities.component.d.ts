import { ElementRef, OnDestroy, OnInit, Renderer } from '@angular/core';
import { ActivitiesService } from './activities.service';
export declare class ActivitiesComponent implements OnInit, OnDestroy {
    private el;
    private renderer;
    private activitiesService;
    count: number;
    lastUpdate: any;
    active: boolean;
    activities: any;
    currentActivity: any;
    loading: boolean;
    constructor(el: ElementRef, renderer: Renderer, activitiesService: ActivitiesService);
    ngOnInit(): void;
    setActivity(activity: any): void;
    private documentSub;
    onToggle(): void;
    update(): void;
    ngOnDestroy(): void;
    documentUnsub(): void;
}
