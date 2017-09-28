"use strict";
/**
 * Created by griga on 12/26/16.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function FadeZoomInTop() {
    var __ref__ = window['Reflect'];
    function parseMeta(metaInformation) {
        for (var _i = 0, metaInformation_1 = metaInformation; _i < metaInformation_1.length; _i++) {
            var metadata = metaInformation_1[_i]; // metadata is @Component metadata
            // decorator logic goes here
            // metadata.animations = [fadeZoomInTop()];
            // metadata.host = {'[@fadeZoomInTop]': ''};
        }
    }
    // value represents the annotation parameter(s)
    return function (target) {
        var metaInformation = __ref__.getOwnMetadata('annotations', target);
        if (metaInformation) {
            parseMeta(metaInformation);
        }
    };
}
exports.FadeZoomInTop = FadeZoomInTop;
