/**
 * Created by cabbar on 19.04.2017.
 */
export interface DinazorMenuModel {
    label: string;
    route: string;
    icon: string;
    title: string;
    roles: number[];
    childrens: DinazorMenuModel[];
}
