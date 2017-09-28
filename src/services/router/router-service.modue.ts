/**
 * Exported Modules
 * @type {Array}
 */

import { DnAuthGuard } from './auth-guard.service';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DnCanDeactivateGuard } from './can-deactivate-guard.service';
import { DnSelectivePreloadingStrategy } from './selective-preloading-strategy';

const modules = [
    HttpModule,
];

@NgModule({
    providers: [
        DnAuthGuard,
        DnCanDeactivateGuard,
        DnSelectivePreloadingStrategy
    ],
    exports: [...modules],
    imports: [...modules]
})
export class DnRouterServiceModue {
}
