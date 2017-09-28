import { Component, Input, OnInit } from '@angular/core';

import { ANIMATION_TYPES, DnLoadingConfig, IDnLoadingConfig } from './dn-loading.config';
import { DnLoadingConfigService } from './dn-loading.service';

@Component({
    selector: 'dn-loading',
    template: `
        <div *ngIf="show" class="backdrop" [ngClass]="{'full-screen' : loadingConfig?.fullScreenBackdrop == true}"
             [ngStyle]="{'border-radius': loadingConfig?.backdropBorderRadius, 'background-color':
              loadingConfig?.backdropBackgroundColour}"></div>
        <div *ngIf="show">
            <div *ngIf="getAnimationType(loadingConfig?.animationType) === ANIMATION_TYPES.threeBounce"
                 class="spinner-three-bounce" [ngClass]="{'full-screen' : loadingConfig?.fullScreenBackdrop == true}">
                <div class="bounce1" [ngStyle]="{'background-color': loadingConfig?.primaryColour}"></div>
                <div class="bounce2" [ngStyle]="{'background-color': loadingConfig?.secondaryColour}"></div>
                <div class="bounce3" [ngStyle]="{'background-color': loadingConfig?.tertiaryColour}"></div>
            </div>
            <div class="spinner-sk-rotateplane"
                 *ngIf="getAnimationType(loadingConfig?.animationType) === ANIMATION_TYPES.rotatingPlane"
                 [ngStyle]="{'background-color': loadingConfig?.primaryColour}"
                 [ngClass]="{'full-screen' : loadingConfig?.fullScreenBackdrop == true}"></div>
            <div class="spinner-rectangle-bounce"
                 *ngIf="getAnimationType(loadingConfig?.animationType) === ANIMATION_TYPES.rectangleBounce"
                 [ngClass]="{'full-screen' : loadingConfig?.fullScreenBackdrop == true}">
                <div class="rect1" [ngStyle]="{'background-color': loadingConfig?.primaryColour}"></div>
                <div class="rect2" [ngStyle]="{'background-color': loadingConfig?.primaryColour}"></div>
                <div class="rect3" [ngStyle]="{'background-color': loadingConfig?.primaryColour}"></div>
                <div class="rect4" [ngStyle]="{'background-color': loadingConfig?.primaryColour}"></div>
                <div class="rect5" [ngStyle]="{'background-color': loadingConfig?.primaryColour}"></div>
            </div>
            <div class="spinner-wandering-cubes"
                 *ngIf="getAnimationType(loadingConfig?.animationType) === ANIMATION_TYPES.wanderingCubes"
                 [ngClass]="{'full-screen' : loadingConfig?.fullScreenBackdrop == true}">
                <div class="cube1" [ngStyle]="{'background-color': loadingConfig?.primaryColour}"></div>
                <div class="cube2" [ngStyle]="{'background-color': loadingConfig?.secondaryColour}"></div>
            </div>
        </div>
        <ng-content></ng-content>
    `,
})
export class DnLoadingComponent implements OnInit {
    @Input() show: boolean;
    @Input() config: IDnLoadingConfig = new DnLoadingConfig();

    public ANIMATION_TYPES = ANIMATION_TYPES;

    public loadingConfig: IDnLoadingConfig = {
        animationType: '',
        backdropBackgroundColour: '',
        backdropBorderRadius: '',
        fullScreenBackdrop: false,
        primaryColour: '',
        secondaryColour: '',
        tertiaryColour: ''
    };

    private defaultConfig: IDnLoadingConfig = {
        animationType: ANIMATION_TYPES.threeBounce,
        backdropBackgroundColour: 'rgba(0, 0, 0, 0.3)',
        backdropBorderRadius: '0px',
        fullScreenBackdrop: false,
        primaryColour: '#ffffff',
        secondaryColour: '#ffffff',
        tertiaryColour: '#ffffff'
    };

    constructor(private loadingConfigService: DnLoadingConfigService) {
    }

    public getAnimationType(animationType: string): string {
        let animationTypeSet: string;
        switch (animationType) {
            case ANIMATION_TYPES.threeBounce:
                animationTypeSet = ANIMATION_TYPES.threeBounce;
                break;
            case ANIMATION_TYPES.rectangleBounce:
                animationTypeSet = ANIMATION_TYPES.rectangleBounce;
                break;
            case ANIMATION_TYPES.rotatingPlane:
                animationTypeSet = ANIMATION_TYPES.rotatingPlane;
                break;
            case ANIMATION_TYPES.wanderingCubes:
                animationTypeSet = ANIMATION_TYPES.wanderingCubes;
                break;
            default:
                animationTypeSet = ANIMATION_TYPES.threeBounce;
        }
        return animationTypeSet;
    }

    ngOnInit() {
        for (const option in this.defaultConfig) {
            if (typeof this.loadingConfig[option] === 'boolean') {
                this.loadingConfig[option] = this.config[option] != null ? this.config[option] : false;

                if (this.loadingConfig[option] === false) {
                    this.loadingConfig[option] = this.loadingConfigService.loadingConfig[option] != null ?
                        this.loadingConfigService.loadingConfig[option] : this.defaultConfig[option];
                }
            } else {
                this.loadingConfig[option] = this.config[option] != null ? this.config[option] : '';

                if (this.loadingConfig[option] === '') {
                    this.loadingConfig[option] = this.loadingConfigService.loadingConfig[option] != null ?
                        this.loadingConfigService.loadingConfig[option] : this.defaultConfig[option];
                }
            }
        }
    }
}
