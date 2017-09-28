import { Inject, Injectable, Optional } from '@angular/core';
import { DnLoginConfig, IDnLoginConfig } from './login.config';

@Injectable()
export class DnLoginConfigService {
    public loginConfig: IDnLoginConfig;

    constructor(@Optional() @Inject('loginConfig') private config: IDnLoginConfig) {
        this.loginConfig = config || new DnLoginConfig();
    }
}
