import { Directive, ElementRef, Input, OnInit } from '@angular/core';

declare let $: any;

/*$.widget('ui.dialog', $.extend({}, $.ui.dialog.prototype, {
    _title: function (title) {
        if (!this.options.title) {
            title.html('&#160;');
        } else {
            title.html(this.options.title);
        }
    }
}));*/

@Directive({
    selector: '[dnJquiDialog]'
})
export class JquiDialog implements OnInit {

    @Input() dnJquiDialog: any;

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        $(this.el.nativeElement).dialog(this.dnJquiDialog);
    }
}
