import { AuthUser } from '../../../model/auth-user';
import { noop } from '../../../utils/common';

export interface IDnLoginConfig {
    afterLoginNavigateRoute?: string;
    afterLoginSuccessEvent?: (user: AuthUser) => void;
    title?: string;
    description?: string;
    logo?: string;
}

export class DnLoginConfig implements IDnLoginConfig {
    afterLoginNavigateRoute?: string;
    afterLoginSuccessEvent?: (user: AuthUser) => void;
    title?: string;
    description?: string;
    logo?: string;

    // [key: string]: string | boolean | undefined;

    constructor(config: IDnLoginConfig = {}) {
        this.afterLoginNavigateRoute = config.afterLoginNavigateRoute || '/home';
        this.afterLoginSuccessEvent = config.afterLoginSuccessEvent || noop;
        this.title = config.title || 'title';
        this.description = config.description || 'description';
        this.logo = config.logo;
    }
}

