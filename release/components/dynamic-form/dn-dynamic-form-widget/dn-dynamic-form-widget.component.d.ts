/**
 * Created by cabbar on 27.03.2017.
 */
import { EventEmitter } from '@angular/core';
import { DnQuestionWidgetBase } from '../dn-question/dn-question-widget-base';
import { DnQuestionBase } from '../dn-question/dn-question-base';
import { DnQuestionFormBase } from '../dn-question/dn-question-form-base';
export declare class DnDynamicFormWidgetComponent {
    dnWidget: DnQuestionWidgetBase<DnQuestionFormBase<DnQuestionBase<any>>>;
    payLoadData: EventEmitter<string>;
    onSubmit(payLoadData: any): void;
}
