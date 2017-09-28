/**
 * Created by cabbar on 27.03.2017.
 */
export declare class DnQuestionWidgetBase<DnQuestionFormBase> {
    formBase: DnQuestionFormBase;
    title: string;
    column: string;
    id: string;
    constructor(options?: {
        formBase?: DnQuestionFormBase;
        title?: string;
        column?: string;
        id?: string;
    });
}
