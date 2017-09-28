/**
 * Created by cabbar on 30.03.2017.
 */
import { ElementRef, OnInit, Renderer } from '@angular/core';
import { DnKeyValueBase } from '../model/keyvalue.model';
export declare class DnStyleDirective implements OnInit {
    private el;
    renderer: Renderer;
    constructor(el: ElementRef, renderer: Renderer);
    ngOnInit(): void;
    styles: Array<DnKeyValueBase<string>>;
}
