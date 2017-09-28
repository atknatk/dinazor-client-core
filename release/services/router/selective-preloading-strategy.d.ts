import { PreloadingStrategy, Route } from '@angular/router';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
export declare class DnSelectivePreloadingStrategy implements PreloadingStrategy {
    preloadedModules: string[];
    preload(route: Route, load: () => Observable<any>): Observable<any>;
}
