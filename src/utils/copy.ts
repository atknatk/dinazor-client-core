/**
 * Created by cabbar on 17.05.2017.
 */
declare let $: any;

export function deepCopy(obj: any): any {
    return $.extend(true, {}, obj);
}
