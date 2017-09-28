import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from '../../utils/guid';

declare let $: any;

@Component({

    selector: 'dn-widget',
    template: `
        <div id='{{widgetId}}' class='jarviswidget dinazor-width-animation'

        >
            <ng-content></ng-content>
        </div>`
})
export class WidgetComponent implements OnInit, AfterViewInit {
    static counter: number = 0;

    @Input() public widgetId: string;
    @Input() public name: string;
    @Input() public colorbutton: boolean = false;
    @Input() public editbutton: boolean = false;
    @Input() public togglebutton: boolean = false;
    @Input() public deletebutton: boolean = false;
    @Input() public fullscreenbutton: boolean = false;
    @Input() public custombutton: boolean = false;
    @Input() public collapsed: boolean = false;
    @Input() public sortable: boolean = false;
    @Input() public hidden: boolean = false;
    @Input() public color: string;
    @Input() public load: boolean = false;
    @Input() public refresh: boolean = false;
    @Input() public searchbutton: boolean = false;

    constructor(public el: ElementRef) {

    }

    ngOnInit() {
        if (this.widgetId) this.widgetId = Guid.newGuid();
        const widget = this.el.nativeElement.children[0];

        if (this.sortable) {
            widget.className += ' jarviswidget-sortable';
        }

        if (this.color) {
            widget.className += (' jarviswidget-color-' + this.color);
        }

        ['colorbutton',
            'editbutton',
            'togglebutton',
            'deletebutton',
            'fullscreenbutton',
            'custombutton',
            'sortable'
        ].forEach((option) => {
            if (!this[option]) {
                widget.setAttribute('data-widget-' + option, 'false');
            }
        });

        [
            'hidden',
            'collapsed'
        ].forEach((option) => {
            if (this[option]) {
                widget.setAttribute('data-widget-' + option, 'true');
            }
        });

        // ['refresh', 'load'].forEach(function (option) {
        //   if (this[option])
        //     widgetProps['data-widget-' + option] = this[option]
        // }.bind(this));

    }

    ngAfterViewInit(): any {
        const $widget = $(this.el.nativeElement);

        if (this.editbutton) {
            $widget.find('.widget-body')
                .prepend('<div class=\'jarviswidget-editbox\'><input class=\'form-control\' type=\'text\'></div>');
        }

        const isFiller = $widget.hasClass('sa-fx-col');

        if ($widget.attr('class')) {
            $widget.find('.jarviswidget').addClass($widget.attr('class'));
            $widget.attr('class', '');
        }

        if (isFiller) {
            $widget.attr('class', 'sa-fx-col');
        }
    }

}
