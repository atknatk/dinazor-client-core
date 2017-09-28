import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
export declare class DnCanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(component: CanComponentDeactivate): boolean | Promise<boolean> | Observable<boolean>;
}
