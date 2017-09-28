import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { DnStorageService } from '../storage.service';
export declare class DnAuthGuard implements CanActivate {
    private dnStorageService;
    constructor(dnStorageService: DnStorageService);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean;
}
