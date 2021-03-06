"use strict";
/**
 * Created by griga on 12/26/16.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
/* *****************************************\
 * Sliding Animations
 \* *****************************************/
function slideToRight() {
    return animations_1.trigger('slideToRight', [
        animations_1.state('void', animations_1.style({ position: 'fixed', width: '100%' })),
        animations_1.state('*', animations_1.style({ position: 'fixed', width: '100%' })),
        animations_1.transition(':enter', [
            animations_1.style({ transform: 'translateX(-100%)' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateX(0%)' }))
        ]),
        animations_1.transition(':leave', [
            animations_1.style({ transform: 'translateX(0%)' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateX(100%)' }))
        ])
    ]);
}
exports.slideToRight = slideToRight;
function slideToLeft() {
    return animations_1.trigger('slideToLeft', [
        animations_1.state('void', animations_1.style({ position: 'fixed', width: '100%' })),
        animations_1.state('*', animations_1.style({ position: 'fixed', width: '100%' })),
        animations_1.transition(':enter', [
            animations_1.style({ transform: 'translateX(100%)' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateX(0%)' }))
        ]),
        animations_1.transition(':leave', [
            animations_1.style({ transform: 'translateX(0%)' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateX(-100%)' }))
        ])
    ]);
}
exports.slideToLeft = slideToLeft;
function slideToTop() {
    return animations_1.trigger('slideToTop', [
        animations_1.state('void', animations_1.style({ position: 'fixed', width: '100%', flex: '1' })),
        animations_1.state('*', animations_1.style({ position: 'fixed', width: '100%', flex: '1' })),
        animations_1.transition(':enter', [
            animations_1.style({ transform: 'translateY(-100%)' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateY(0%)' }))
        ]),
        animations_1.transition(':leave', [
            animations_1.style({ transform: 'translateY(0%)' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateY(100%)' }))
        ])
    ]);
}
exports.slideToTop = slideToTop;
function slideToBottom() {
    return animations_1.trigger('slideToBottom', [
        animations_1.state('void', animations_1.style({ position: 'fixed', width: '100%', flex: '1' })),
        animations_1.state('*', animations_1.style({ position: 'fixed', width: '100%', flex: '1' })),
        animations_1.transition(':enter', [
            animations_1.style({ transform: 'translateY(100%)' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateY(0%)' }))
        ]),
        animations_1.transition(':leave', [
            animations_1.style({ transform: 'translateY(0%)' }),
            animations_1.animate('0.5s ease-in-out', animations_1.style({ transform: 'translateY(-100%)' }))
        ])
    ]);
}
exports.slideToBottom = slideToBottom;
/* *****************************************\
 * Fading Animations
 \* *****************************************/
function fadeInTop() {
    return animations_1.trigger('fadeInTop', [
        animations_1.state('void', animations_1.style({ opacity: '0' })),
        animations_1.state('*', animations_1.style({ top: '0px', height: '100%', width: '100%', position: 'absolute' })),
        animations_1.transition(':enter', [
            animations_1.style({ transform: 'translateY(10px)' }),
            animations_1.animate('.5s 1s ease-in', animations_1.style({
                transform: 'translateY(0)',
                opacity: '1'
            }))
        ]),
        animations_1.transition(':leave', [
            animations_1.style({ transform: 'translateY(0)' }),
            animations_1.animate('.2s 1s ease-in', animations_1.style({
                transform: 'translateY(10px)',
                opacity: '0'
            }))
        ])
    ]);
}
exports.fadeInTop = fadeInTop;
function fadeInLeft() {
    return animations_1.trigger('fadeInLeft', [
        animations_1.state('void', animations_1.style({ opacity: '0', flex: '0 2', position: 'absolute' })),
        animations_1.state('*', animations_1.style({ flex: '1 0', top: '0px' })),
        animations_1.transition(':enter', [
            animations_1.style({ transform: 'translateX(10px)' }),
            animations_1.animate('.5s ease-in', animations_1.style({
                transform: 'translateX(0)',
                opacity: '1'
            }))
        ]),
        animations_1.transition(':leave', [
            animations_1.style({ transform: 'translateX(0)' }),
            animations_1.animate('.5s ease-out', animations_1.style({
                transform: 'translateX(50px)',
                opacity: '0'
            }))
        ])
    ]);
}
exports.fadeInLeft = fadeInLeft;
/* *****************************************\
 * Fading Animations
 \* *****************************************/
function fadeZoomInTop() {
    return animations_1.trigger('fadeZoomInTop', [
        animations_1.state('void', animations_1.style({ opacity: '0' })),
        animations_1.state('*', animations_1.style({ top: '0px', height: '100%', width: '100%', position: 'absolute' })),
        // state('*', style({flex: '1'})),
        animations_1.transition(':enter', [
            animations_1.style({ transform: 'translate3d(0, 10px, 0) ' }),
            animations_1.animate('0.5s ease-out', animations_1.style({
                transform: 'translate3d(0, 0, 0)',
                opacity: '1'
            }))
        ]),
        animations_1.transition(':leave', [
            animations_1.style({ transform: 'translate3d(0, 0, 0) ' }),
            animations_1.animate('0.2s ease-in', animations_1.style({
                transform: 'translate3d(0, 40px, 0)',
                opacity: '0'
            }))
        ])
    ]);
}
exports.fadeZoomInTop = fadeZoomInTop;
