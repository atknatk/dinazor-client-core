/**
 * Created by cabbar on 27.03.2017.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DnQuestionWidgetBase } from '../dn-question/dn-question-widget-base';
import { DnQuestionBase } from '../dn-question/dn-question-base';
import { DnQuestionFormBase } from '../dn-question/dn-question-form-base';

@Component({
    selector: 'dn-dynamic-form-widget',
    templateUrl: './dn-dynamic-form-widget.component.html',
})
export class DnDynamicFormWidgetComponent {
    @Input() dnWidget: DnQuestionWidgetBase<DnQuestionFormBase<DnQuestionBase<any>>>;
    @Output() payLoadData: EventEmitter<string> = new EventEmitter();

    onSubmit(payLoadData) {
        this.payLoadData.emit(payLoadData);
    }
}
