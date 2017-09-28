import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DnLoadingComponent } from './dn-loading.component';
import { DnLoadingConfigService } from './dn-loading.service';
import { IDnLoadingConfig } from './dn-loading.config';
import { DnLoadingContentComponent } from './dn-loading-content.component';

@NgModule({
    imports: [CommonModule],
    exports: [DnLoadingComponent, DnLoadingContentComponent],
    declarations: [DnLoadingComponent, DnLoadingContentComponent],
    providers: [DnLoadingConfigService],
})
export class DnLoadingModule {
    static forRoot(loadingConfig: IDnLoadingConfig): ModuleWithProviders {
        return {
            ngModule: DnLoadingModule,
            providers: [{provide: 'loadingConfig', useValue: loadingConfig}]
        };
    }
}
