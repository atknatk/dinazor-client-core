"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// corejs
require("core-js/es6");
require("core-js/es7/object");
require("core-js/es7/reflect");
// typescript
require("ts-helpers");
// zonejs
require("zone.js/dist/zone");
// rx
require("rxjs");
// angular2
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
require("@angular/common");
require("@angular/forms");
// optimization for production
// https://github.com/AngularClass/angular2-webpack-starter/blob/master/src/platform/environment.ts#L17
if (IS_PRODUCTION) {
    platform_browser_1.disableDebugTools();
    core_1.enableProdMode();
}
if (IS_DEV) {
    Error.stackTraceLimit = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}
