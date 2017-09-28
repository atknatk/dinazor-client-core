import { OnInit } from '@angular/core';
import { IDnLoadingConfig } from './dn-loading.config';
import { DnLoadingConfigService } from './dn-loading.service';
export declare class DnLoadingComponent implements OnInit {
    private loadingConfigService;
    show: boolean;
    config: IDnLoadingConfig;
    ANIMATION_TYPES: {
        threeBounce: string;
        rotatingPlane: string;
        rectangleBounce: string;
        wanderingCubes: string;
    };
    loadingConfig: IDnLoadingConfig;
    private defaultConfig;
    constructor(loadingConfigService: DnLoadingConfigService);
    getAnimationType(animationType: string): string;
    ngOnInit(): void;
}
