import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router, ROUTER_CONFIGURATION } from '@angular/router';
import { DnLoginModule } from '../../src/views/auth/login/login.module';
import { DnUserModule } from '../../src/views/user/user.module';
import { LayoutModule } from './app-layout/app-layout.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ComposeMessageComponent } from './compose-message.component';

import { DialogService } from './dialog.service';

import { HeroesModule } from './heroes/heroes.module';
import { PageNotFoundComponent } from './not-found.component';
import { DnLoadingModule } from '../../src/components/loading/dn-loading.module';
import { ANIMATION_TYPES } from '../../src/components/loading/dn-loading.config';
import { Profiler } from 'inspector';
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HeroesModule,
        DnUserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        DnLoadingModule.forRoot({
            animationType: ANIMATION_TYPES.threeBounce,
            backdropBackgroundColour: 'rgba(0,0,0,0.3)',
            backdropBorderRadius: '0',
            primaryColour: '#00ffff',
            secondaryColour: '#ffff00',
            tertiaryColour: '#ff00ff'
        }),
        DnLoginModule.forRoot({
            afterLoginNavigateRoute: '/kullanici'
        })
    ],
    declarations: [
        AppComponent,
        ComposeMessageComponent,
        PageNotFoundComponent
    ],
    providers: [
        DialogService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    // Diagnostic only: inspect router configuration
    constructor(router: Router) {
        console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    }
}
