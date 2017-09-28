"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DnLoadingConfig = /** @class */ (function () {
    function DnLoadingConfig(config) {
        if (config === void 0) { config = {}; }
        this.backdropBorderRadius = config.backdropBorderRadius;
        this.backdropBackgroundColour = config.backdropBackgroundColour;
        this.fullScreenBackdrop = config.fullScreenBackdrop;
        this.animationType = config.animationType;
        this.primaryColour = config.primaryColour;
        this.secondaryColour = config.secondaryColour;
        this.tertiaryColour = config.tertiaryColour;
    }
    return DnLoadingConfig;
}());
exports.DnLoadingConfig = DnLoadingConfig;
exports.ANIMATION_TYPES = {
    threeBounce: 'three-bounce',
    rotatingPlane: 'rotating-plane',
    rectangleBounce: 'rectangle-bounce',
    wanderingCubes: 'wandering-cubes'
};
