"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dn_loading_config_1 = require("./dn-loading.config");
var DnLoadingComponent = /** @class */ (function () {
    function DnLoadingComponent(loadingConfigService) {
        this.loadingConfigService = loadingConfigService;
        this.config = new dn_loading_config_1.DnLoadingConfig();
        this.ANIMATION_TYPES = dn_loading_config_1.ANIMATION_TYPES;
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
            animationType: dn_loading_config_1.ANIMATION_TYPES.threeBounce,
            backdropBackgroundColour: 'rgba(0, 0, 0, 0.3)',
            backdropBorderRadius: '0px',
            fullScreenBackdrop: false,
            primaryColour: '#ffffff',
            secondaryColour: '#ffffff',
            tertiaryColour: '#ffffff'
        };
    }
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
    DnLoadingComponent.prototype.getAnimationType = function (animationType) {
        var animationTypeSet;
        switch (animationType) {
            case dn_loading_config_1.ANIMATION_TYPES.threeBounce:
                animationTypeSet = dn_loading_config_1.ANIMATION_TYPES.threeBounce;
                break;
            case dn_loading_config_1.ANIMATION_TYPES.rectangleBounce:
                animationTypeSet = dn_loading_config_1.ANIMATION_TYPES.rectangleBounce;
                break;
            case dn_loading_config_1.ANIMATION_TYPES.rotatingPlane:
                animationTypeSet = dn_loading_config_1.ANIMATION_TYPES.rotatingPlane;
                break;
            case dn_loading_config_1.ANIMATION_TYPES.wanderingCubes:
                animationTypeSet = dn_loading_config_1.ANIMATION_TYPES.wanderingCubes;
                break;
            default:
                animationTypeSet = dn_loading_config_1.ANIMATION_TYPES.threeBounce;
        }
        return animationTypeSet;
    };
    __decorate([
        core_1.Input()
    ], DnLoadingComponent.prototype, "show", void 0);
    __decorate([
        core_1.Input()
    ], DnLoadingComponent.prototype, "config", void 0);
    DnLoadingComponent = __decorate([
        core_1.Component({
            selector: 'dn-loading',
            template: "\n        <div *ngIf=\"show\" class=\"backdrop\" [ngClass]=\"{'full-screen' : loadingConfig?.fullScreenBackdrop == true}\"\n             [ngStyle]=\"{'border-radius': loadingConfig?.backdropBorderRadius, 'background-color':\n              loadingConfig?.backdropBackgroundColour}\"></div>\n        <div *ngIf=\"show\">\n            <div *ngIf=\"getAnimationType(loadingConfig?.animationType) === ANIMATION_TYPES.threeBounce\"\n                 class=\"spinner-three-bounce\" [ngClass]=\"{'full-screen' : loadingConfig?.fullScreenBackdrop == true}\">\n                <div class=\"bounce1\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"bounce2\" [ngStyle]=\"{'background-color': loadingConfig?.secondaryColour}\"></div>\n                <div class=\"bounce3\" [ngStyle]=\"{'background-color': loadingConfig?.tertiaryColour}\"></div>\n            </div>\n            <div class=\"spinner-sk-rotateplane\"\n                 *ngIf=\"getAnimationType(loadingConfig?.animationType) === ANIMATION_TYPES.rotatingPlane\"\n                 [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"\n                 [ngClass]=\"{'full-screen' : loadingConfig?.fullScreenBackdrop == true}\"></div>\n            <div class=\"spinner-rectangle-bounce\"\n                 *ngIf=\"getAnimationType(loadingConfig?.animationType) === ANIMATION_TYPES.rectangleBounce\"\n                 [ngClass]=\"{'full-screen' : loadingConfig?.fullScreenBackdrop == true}\">\n                <div class=\"rect1\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"rect2\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"rect3\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"rect4\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"rect5\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n            </div>\n            <div class=\"spinner-wandering-cubes\"\n                 *ngIf=\"getAnimationType(loadingConfig?.animationType) === ANIMATION_TYPES.wanderingCubes\"\n                 [ngClass]=\"{'full-screen' : loadingConfig?.fullScreenBackdrop == true}\">\n                <div class=\"cube1\" [ngStyle]=\"{'background-color': loadingConfig?.primaryColour}\"></div>\n                <div class=\"cube2\" [ngStyle]=\"{'background-color': loadingConfig?.secondaryColour}\"></div>\n            </div>\n        </div>\n    ",
        })
    ], DnLoadingComponent);
    return DnLoadingComponent;
}());
exports.DnLoadingComponent = DnLoadingComponent;
