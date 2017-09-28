export interface IDnLoadingConfig {
    backdropBorderRadius?: string;
    backdropBackgroundColour?: string;
    fullScreenBackdrop?: boolean;
    animationType?: string;
    primaryColour?: string;
    secondaryColour?: string;
    tertiaryColour?: string;
    [key: string]: string | boolean | undefined;
}
export declare class DnLoadingConfig implements IDnLoadingConfig {
    backdropBorderRadius?: string;
    backdropBackgroundColour?: string;
    fullScreenBackdrop?: boolean;
    animationType?: string;
    primaryColour?: string;
    secondaryColour?: string;
    tertiaryColour?: string;
    [key: string]: string | boolean | undefined;
    constructor(config?: IDnLoadingConfig);
}
export declare const ANIMATION_TYPES: {
    threeBounce: string;
    rotatingPlane: string;
    rectangleBounce: string;
    wanderingCubes: string;
};
