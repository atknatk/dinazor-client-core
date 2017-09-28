import { Component } from '@angular/core';
var FullScreenComponent = /** @class */ (function () {
    function FullScreenComponent() {
    }
    FullScreenComponent.prototype.onToggle = function () {
        var $body = $('body');
        var documentMethods = {
            enter: ['requestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullscreen', 'msRequestFullscreen'],
            exit: ['cancelFullScreen', 'mozCancelFullScreen', 'webkitCancelFullScreen', 'msCancelFullScreen']
        };
        if (!$body.hasClass('full-screen')) {
            $body.addClass('full-screen');
            document.documentElement[documentMethods.enter.filter(function (method) {
                return document.documentElement[method];
            })[0]]();
        }
        else {
            $body.removeClass('full-screen');
            document[documentMethods.exit.filter(function (method) {
                return document[method];
            })[0]]();
        }
    };
    FullScreenComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-full-screen',
                    templateUrl: './full-screen.component.html'
                },] },
    ];
    /** @nocollapse */
    FullScreenComponent.ctorParameters = function () { return []; };
    return FullScreenComponent;
}());
export { FullScreenComponent };
//# sourceMappingURL=full-screen.component.js.map