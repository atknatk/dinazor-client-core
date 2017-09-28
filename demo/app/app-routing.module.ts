import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DnLoginComponent } from '../../src/views/auth/login/login.component';
import { DnUserComponent } from '../../src/views/user/user.component';
import { AuthLayoutComponent } from './app-layout/auth-layout.component';
import { MainLayoutComponent } from './app-layout/dn-main-layout.component';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { PageNotFoundComponent } from './not-found.component';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

const appRoutes: Routes = [
    {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'login',
                component: DnLoginComponent,
            }
        ]
    },
    {
        path: 'kullanici',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                component: DnUserComponent,
            }
        ]
    },
    {path: '', redirectTo: '/auth/login', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                // enableTracing: true, // <-- debugging purposes only
                // preloadingStrategy: SelectivePreloadingStrategy,
                useHash: false

            }
        )
    ],
    exports: [
        RouterModule
    ],
    providers: [
        CanDeactivateGuard,
        SelectivePreloadingStrategy
    ]
})
export class AppRoutingModule {
}
