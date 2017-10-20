import { Inject, Injectable, Optional } from '@angular/core';
import { DnLogoutConfig, IDnLogoutConfig } from './logout.config';

@Injectable()
export class DnLogoutConfigService {
    public logoutConfig: IDnLogoutConfig;

    constructor(@Optional() @Inject('logoutConfig') private config: IDnLogoutConfig) {
        this.logoutConfig = config || new DnLogoutConfig();
    }
}
