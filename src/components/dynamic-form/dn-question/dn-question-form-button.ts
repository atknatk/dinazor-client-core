/**
 * Created by cabbar on 08.05.2017.
 */
import { FormGroup } from '@angular/forms';
import { noop } from '../../../utils/common';

/**
 * Created by cabbar on 27.03.2017.
 */
export class DnQuestionFormButton {
    id: string;
    icon: string;
    label: string;
    disabled: (_: FormGroup) => boolean;
    submitButtonClass: string;
    submitButtonEvent: (_: any) => void;

    constructor(options: {
        id?: string,
        icon?: string,
        label?: string,
        submitButtonClass?: string,
        submitButtonEvent?: (_: any) => void
        disabled?: (_: FormGroup) => boolean
    } = {}) {
        this.id = options.id;
        this.icon = options.icon || '';
        this.label = options.label || '';
        this.submitButtonClass = options.submitButtonClass || '';
        this.submitButtonEvent = options.submitButtonEvent || noop;
        this.disabled = options.disabled;
    }
}
