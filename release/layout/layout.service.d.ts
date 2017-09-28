import 'rxjs/add/operator/debounceTime';
import { Subscription } from 'rxjs/Subscription';
export declare class LayoutService {
    isActivated: boolean;
    smartSkin: string;
    store: any;
    private subject;
    constructor();
    dumpStorage(): void;
    factoryReset(): void;
    onCollapseMenu(value?: any): void;
    onColorblindFriendly(): void;
    onFixedHeader(): void;
    onFixedNavigation(): void;
    onFixedPageFooter(): void;
    onFixedRibbon(): void;
    onInsideContainer(): void;
    onMenuOnTop(): void;
    onMinifyMenu(): void;
    onRtl(): void;
    onShortcutToggle(condition?: any): void;
    onSmartSkin(skin: any): void;
    processBody(state: any): void;
    subscribe(next: any, err?: any, complete?: any): Subscription;
    trigger(): void;
}
