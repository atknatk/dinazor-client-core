import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { DnStorageService } from '../storage.service';
export declare class DnAuthGuard implements CanActivate {
    private router;
    private dnStorageService;
    constructor(router: Router, dnStorageService: DnStorageService);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean;
}
