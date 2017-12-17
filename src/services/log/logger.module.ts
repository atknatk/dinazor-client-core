import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DnLoggerConfig } from './logger-config';
import { DnLoggerService } from './logger.service';
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [
        CommonModule,
        HttpModule
    ]
})
export class DnLoggerModule {
    static forRoot(config: DnLoggerConfig | null | undefined): ModuleWithProviders {
        return {
            ngModule: DnLoggerModule,
            providers: [
                {provide: DnLoggerConfig, useValue: config || {}},
                DnLoggerService,
            ]
        };
    }
}