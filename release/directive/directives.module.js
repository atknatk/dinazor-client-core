import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DblClickCopyDirective } from './dbl-click-copy.directive';
import { VisibilityDirective } from './visibility.directive';
import { DnStyleDirective } from './dn-style.directive';
var directives = [
    VisibilityDirective,
    DblClickCopyDirective,
    DnStyleDirective
];
var DirectivesModule = /** @class */ (function () {
    function DirectivesModule() {
    }
    DirectivesModule.decorators = [
        { type: NgModule, args: [{
                    declarations: directives.slice(),
                    exports: directives.slice(),
                    imports: [CommonModule]
                },] },
    ];
    /** @nocollapse */
    DirectivesModule.ctorParameters = function () { return []; };
    return DirectivesModule;
}());
export { DirectivesModule };
//# sourceMappingURL=directives.module.js.map