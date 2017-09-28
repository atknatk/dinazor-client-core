import { OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';
export declare class RibbonComponent implements OnInit {
    private layoutService;
    constructor(layoutService: LayoutService);
    ngOnInit(): void;
    resetWidgets(): void;
}
