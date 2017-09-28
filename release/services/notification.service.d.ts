import '@dinazor/plugins/notification';
import { Observable } from 'rxjs/Observable';
import { DnResultBase } from '../model/http-result-base';
export declare class DnNotificationService {
    bigBox(data: any, cb?: any): void;
    confirm(message: string, title: string, cb: () => void, no?: () => void): void;
    removeConfirm(cb: () => Observable<any>, afterSuccesDelete?: (param1?: any, param2?: any, param3?: any, param4?: any) => void, param1?: any, param2?: any, param3?: any, param4?: any): void;
    showDinazorResultMessage(res: DnResultBase): void;
    showError(message: string, title?: string, cb?: any): void;
    showSuccess(message: string, title?: string, cb?: any): void;
    showWarning(message: string, title?: string, cb?: any): void;
    smallBox(data: any, cb?: any): void;
    smartMessageBox(data: any, cb?: any): void;
    subscribeMessage(res: DnResultBase): void;
}
