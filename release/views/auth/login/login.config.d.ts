import { AuthUser } from '../../../model/auth-user';
export interface IDnLoginConfig {
    afterLoginNavigateRoute?: string;
    afterLoginSuccessEvent?: (user: AuthUser) => void;
    title?: string;
    description?: string;
    logo?: string;
}
export declare class DnLoginConfig implements IDnLoginConfig {
    afterLoginNavigateRoute?: string;
    afterLoginSuccessEvent?: (user: AuthUser) => void;
    title?: string;
    description?: string;
    logo?: string;
    constructor(config?: IDnLoginConfig);
}
