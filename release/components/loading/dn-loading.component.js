import { Component, Input } from '@angular/core';
import { ANIMATION_TYPES, DnLoadingConfig } from './dn-loading.config';
import { DnLoadingConfigService } from './dn-loading.service';
var DnLoadingComponent = /** @class */ (function () {
    function DnLoadingComponent(loadingConfigService) {
        this.loadingConfigService = loadingConfigService;
        this.config = new DnLoadingConfig();
        this.ANIMATION_TYPES = ANIMATION_TYPES;
        this.loadingConfig = {
            animationType: '',
            backdropBackgroundColour: '',
            backdropBorderRadius: '',
            fullScreenBackdrop: false,
            primaryColour: '',
            secondaryColour: '',
            tertiaryColour: ''
        };
        this.defaultConfig = {
            animationType: ANIMATION_TYPES.threeBounce,
            backdropBackgroundColour: 'rgba(0, 0, 0, 0.3)',
            backdropBorderRadius: '0px',
            fullScreenBackdrop: false,
            primaryColour: '#ffffff',
            secondaryColour: '#ffffff',
            tertiaryColour: '#ffffff'
        };
    }
    DnLoadingComponent.prototype.getAnimationType = function (animationType) {
        var animationTypeSet;
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
    };
    DnLoadingComponent.prototype.ngOnInit = function () {
        for (var option in this.defaultConfig) {
            if (typeof this.loadingConfig[option] === 'boolean') {
                this.loadingConfig[option] = this.config[option] != null ? this.config[option] : false;
                if (this.loadingConfig[option] === false) {
                    this.loadingConfig[option] = this.loadingConfigService.loadingConfig[option] != null ?
                        this.loadingConfigService.loadingConfig[option] : this.defaultConfig[option];
                }
            }
            else {
                this.loadingConfig[option] = this.config[option] != null ? this.config[option] : '';
                if (this.loadingConfig[option] === '') {
                    this.loadingConfig[option] = this.loadingConfigService.loadingConfig[option] != null ?
                        this.loadingConfigService.loadingConfig[option] : this.defaultConfig[option];
                }
            }
        }
    };
    DnLoadingComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-loading',
                    template: "\n        <div *ngIf=\"show\" class=\"backdrop\" [ngClass]=\"{'full-screen' : loadingConfig?.fullScreenBackdrop == true}\"\n             [ngStyle]=\"{'border-radius': loadingConfig?.backdropBorderRadius, 'background-color':\n              loadingConfig?.backdropBackgroundColour}\"></div>\n        <div *ngIf=\"show\">\n            <div *ngIf=\"getAnimationType(loadingConfig?.animationType) === ANIMATION_TYPES.threeBounce\"\n                 class=\"spinner-three-bounce\" [ngClass]=\"{'full-screen' : loadingConfig?.fullScreenBackdrop == true}\">\n                <div class=\"bounce1\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"bounce2\" [ngStyle]=\"{'background-color': loadingConfig?.secondaryColour}\"></div>\n                <div class=\"bounce3\" [ngStyle]=\"{'background-color': loadingConfig?.tertiaryColour}\"></div>\n            </div>\n            <div class=\"spinner-sk-rotateplane\"\n                 *ngIf=\"getAnimationType(loadingConfig?.animationType) === ANIMATION_TYPES.rotatingPlane\"\n                 [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"\n                 [ngClass]=\"{'full-screen' : loadingConfig?.fullScreenBackdrop == true}\"></div>\n            <div class=\"spinner-rectangle-bounce\"\n                 *ngIf=\"getAnimationType(loadingConfig?.animationType) === ANIMATION_TYPES.rectangleBounce\"\n                 [ngClass]=\"{'full-screen' : loadingConfig?.fullScreenBackdrop == true}\">\n                <div class=\"rect1\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"rect2\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"rect3\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"rect4\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"rect5\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n            </div>\n            <div class=\"spinner-wandering-cubes\"\n                 *ngIf=\"getAnimationType(loadingConfig?.animationType) === ANIMATION_TYPES.wanderingCubes\"\n                 [ngClass]=\"{'full-screen' : loadingConfig?.fullScreenBackdrop == true}\">\n                <div class=\"cube1\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"cube2\" [ngStyle]=\"{'background-color': loadingConfig?.secondaryColour}\"></div>\n            </div>\n        </div>\n        <ng-content></ng-content>\n    ",
                },] },
    ];
    /** @nocollapse */
    DnLoadingComponent.ctorParameters = function () { return [
        { type: DnLoadingConfigService, },
    ]; };
    DnLoadingComponent.propDecorators = {
        'show': [{ type: Input },],
        'config': [{ type: Input },],
    };
    return DnLoadingComponent;
}());
export { DnLoadingComponent };
//# sourceMappingURL=dn-loading.component.js.map