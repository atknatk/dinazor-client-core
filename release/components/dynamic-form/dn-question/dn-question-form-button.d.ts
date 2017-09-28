/**
 * Created by cabbar on 08.05.2017.
 */
import { FormGroup } from '@angular/forms';
/**
 * Created by cabbar on 27.03.2017.
 */
export declare class DnQuestionFormButton {
    id: string;
    icon: string;
    label: string;
    disabled: (_: FormGroup) => boolean;
    submitButtonClass: string;
    submitButtonEvent: (_: any) => void;
    constructor(options?: {
        id?: string;
        icon?: string;
        label?: string;
        submitButtonClass?: string;
        submitButtonEvent?: (_: any) => void;
        disabled?: (_: FormGroup) => boolean;
    });
}
