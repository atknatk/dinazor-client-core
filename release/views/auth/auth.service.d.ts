import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AuthUser } from '../../model/auth-user';
import { DnResultDataBase } from '../../model/http-result-data-base';
import { DnHttpService } from '../../services/http.service';
import { DnStorageService } from '../../services/storage.service';
export declare class DnAuthService {
    private dnService;
    private dnStorageService;
    user: AuthUser;
    constructor(dnService: DnHttpService<DnResultDataBase<any>>, dnStorageService: DnStorageService);
    isAuthorized(roles: number[]): boolean;
    login(mail: string, password: string): Observable<DnResultDataBase<any>>;
    logout(): void;
}
