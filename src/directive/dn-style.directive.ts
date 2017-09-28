/**
 * Created by cabbar on 30.03.2017.
 */
import {
    Directive,
    ElementRef,
    Input, OnInit, Renderer
} from '@angular/core';
import { DnKeyValueBase } from '../model/keyvalue.model';

@Directive({
    selector: '[dnStyle]'
})
export class DnStyleDirective implements OnInit {
    constructor(private el: ElementRef, public renderer: Renderer) {

    }

    ngOnInit(): void {
        if (this.styles) {
            for (const style of this.styles) {
                this.renderer.setElementStyle(this.el.nativeElement, style.key, style.value);
            }
        }

    }

    @Input('dnStyle') styles: Array<DnKeyValueBase<string>>;

}
