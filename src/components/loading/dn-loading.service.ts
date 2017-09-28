import { Injectable, Inject, Optional } from '@angular/core';
import { DnLoadingConfig, IDnLoadingConfig } from './dn-loading.config';

@Injectable()
export class DnLoadingConfigService {
    public loadingConfig: IDnLoadingConfig;

    constructor(@Optional() @Inject('loadingConfig') private config: IDnLoadingConfig) {
        this.loadingConfig = config || new DnLoadingConfig();
    }
}