/**
 * Created by cabbar on 19.04.2017.
 */
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { config } from '../../dinazor.config';
import { AuthUser } from '../../model/auth-user';
import { DnResultDataBase } from '../../model/http-result-data-base';
import { DnHttpService } from '../../services/http.service';
import { DnStorageService } from '../../services/storage.service';
import { isNullOrUndefined } from '../../utils/check';
import { DnLoginBase } from './login/login-base';

@Injectable()
export class DnAuthService {
    user: AuthUser;

    constructor(private dnService: DnHttpService<DnResultDataBase<any>>,
                private dnStorageService: DnStorageService) {
        this.user = this.dnStorageService.getItem(config.DINAZOR_USER_KEY);
    }

    isAuthorized(roles: number[]): boolean {
        if (isNullOrUndefined(roles)) return false;
        if (roles.length === 1 && roles[0] === -1) return true;
        return this.user.roleList.filter((elem) => {
            return roles.indexOf(elem) > -1;
        }).length > 0;
    }

    login(mail: string, password: string): Observable<DnResultDataBase<any>> {
        const data: DnLoginBase = {
            mail,
            password,
            client: {
                hddSerialNo: 'hdd',
                biosVersion: '1.1.1',
                mail,
                password,
                clientIdentifier: '1.1.1hddaatika123'
            }
        };

        return this.dnService.postWithoutToken(data, 'api/Authorization');
    }

    logout() {
        const user: any = this.dnStorageService.getItem(config.DINAZOR_USER_KEY);
        const token = user.token;
        this.dnService.deleteWithUrl('api/Authorization?token=' + token).subscribe();
        this.dnStorageService.removeItem(config.DINAZOR_USER_KEY);
    }
}
