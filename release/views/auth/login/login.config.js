import { noop } from '../../../utils/common';
var DnLoginConfig = /** @class */ (function () {
    // [key: string]: string | boolean | undefined;
    function DnLoginConfig(config) {
        if (config === void 0) { config = {}; }
        this.afterLoginNavigateRoute = config.afterLoginNavigateRoute || '/home';
        this.afterLoginSuccessEvent = config.afterLoginSuccessEvent || noop;
        this.title = config.title || 'title';
        this.description = config.description || 'description';
        this.logo = config.logo;
    }
    return DnLoginConfig;
}());
export { DnLoginConfig };
//# sourceMappingURL=login.config.js.map