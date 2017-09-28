/**
 * Created by cabbar on 28.03.2017.
 */
import { DnDatatableBase } from '../datatable/dn-datatable.base';
import { DnQuestionFormBase } from '../dynamic-form/dn-question/dn-question-form-base';
import { DnQuestionBase } from '../dynamic-form/dn-question/dn-question-base';
export declare class DnCrudBase {
    restUrl: string;
    searchForm: DnQuestionFormBase<DnQuestionBase<any>>;
    editForm: DnQuestionFormBase<DnQuestionBase<any>>;
    datatableOptions: DnDatatableBase;
    title: string;
    constructor(options?: {
        restUrl?: string;
        searchForm?: DnQuestionFormBase<DnQuestionBase<any>>;
        editForm?: DnQuestionFormBase<DnQuestionBase<any>>;
        datatableOptions?: DnDatatableBase;
        title?: string;
    });
}
