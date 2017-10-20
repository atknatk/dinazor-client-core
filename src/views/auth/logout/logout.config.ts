import { AuthUser } from '../../../model/auth-user';
import { noop } from '../../../utils/common';

export interface IDnLogoutConfig {
    afterLogoutSuccessEvent?: () => void;
}

export class DnLogoutConfig  implements IDnLogoutConfig  {
    afterLogoutSuccessEvent?: () => void;

    // [key: string]: string | boolean | undefined;

    constructor(config: IDnLogoutConfig  = {}) {
        this.afterLogoutSuccessEvent = config.afterLogoutSuccessEvent || noop;
    }
}
