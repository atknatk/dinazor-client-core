import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DnCrudBase } from '../../../components/crud/dn-crud-base';
import { DnDatatableColumnBase } from '../../../components/datatable/dn-datatable-column.base';
import { DnDatatableBase } from '../../../components/datatable/dn-datatable.base';
import { DnQuestionDifferentValidator } from '../../../components/dynamic-form/dn-question-validator/dn-question-different-validator';
import { DnQuestionIdenticalValidator } from '../../../components/dynamic-form/dn-question-validator/dn-question-identical-validator';
import { DnQuestionLengthValidator } from '../../../components/dynamic-form/dn-question-validator/dn-question-lenght-validator';
import { DnQuestionRequiredValidator } from '../../../components/dynamic-form/dn-question-validator/dn-question-required-validator';
import { DnQuestionFormBase } from '../../../components/dynamic-form/dn-question/dn-question-form-base';
import { DnQuestionRowBase } from '../../../components/dynamic-form/dn-question/dn-question-row-base';
import { DnQuestionRowList } from '../../../components/dynamic-form/dn-question/dn-question-row-list';
import { DnTextboxQuestion } from '../../../components/dynamic-form/dn-question/dn-question-textbox';
import { DnLoadingBase } from '../../../components/loading/dn-loading.base';
import { dinazorRoles } from '../../../dinazor-role-enum';
import { Guid } from '../../../utils/guid';

/**
 * Created by cabbar on 03.05.2017.
 */
declare let $: any;

@Component({
    selector: 'dn-user-list',
    templateUrl: './user-list.component.html',

})
export class DnUserListComponent extends DnLoadingBase {
    @Output('actionChangeUser') actionChangeUserEmitter = new EventEmitter();

    @Input() sampleCrudData: DnCrudBase = {
        restUrl: 'user',
        title: 'Kullancı',
        editForm: new DnQuestionFormBase({
            id: Guid.newGuid(),
            submitButtonLabel: 'Kaydet',
            questionRows: [
                new DnQuestionRowList({
                    row: [
                        new DnQuestionRowBase({
                            rowSize: 11,
                            question: new DnTextboxQuestion({
                                key: 'mail',
                                label: 'Kullanıcı Mail Adresi',
                                type: 'text',
                                validator: [
                                    new DnQuestionRequiredValidator(),
                                    new DnQuestionLengthValidator({
                                        maxLength: 50,
                                        minLength: 3
                                    })
                                ]
                            })
                        })
                    ]
                }),
                new DnQuestionRowList({
                    row: [
                        new DnQuestionRowBase({
                            rowSize: 11,
                            question: new DnTextboxQuestion({
                                key: 'name',
                                label: 'Ad',
                                type: 'text',
                                validator: [
                                    new DnQuestionRequiredValidator(),
                                    new DnQuestionLengthValidator({
                                        maxLength: 50,
                                        minLength: 3
                                    })
                                ]
                            })
                        })
                    ]
                }),
                new DnQuestionRowList({
                    row: [
                        new DnQuestionRowBase({
                            rowSize: 11,
                            question: new DnTextboxQuestion({
                                key: 'surname',
                                label: 'Soyadı',
                                type: 'text',
                                validator: [
                                    new DnQuestionRequiredValidator(),
                                    new DnQuestionLengthValidator({
                                        maxLength: 50,
                                        minLength: 3
                                    })
                                ]
                            })
                        })
                    ]
                }),
                new DnQuestionRowList({
                    row: [
                        new DnQuestionRowBase({
                            rowSize: 11,
                            question: new DnTextboxQuestion({
                                key: 'password',
                                label: 'Şifre',
                                type: 'password',
                                validator: [
                                    new DnQuestionRequiredValidator(),
                                    new DnQuestionLengthValidator({
                                        maxLength: 50,
                                        minLength: 6
                                    }),
                                    new DnQuestionDifferentValidator({
                                        field: 'mail',
                                        message: 'Şifre kullanıcı adı ile aynı olamaz'
                                    }),
                                    new DnQuestionIdenticalValidator({
                                        field: 'password',
                                        message: 'Şifre uyuşmuyor'
                                    })
                                ]
                            })
                        })
                    ]
                }),
                /*  new DnQuestionRowList({
                      row: [
                          new DnQuestionRowBase({
                              rowSize: 11,
                              question: new DnTextboxQuestion({
                                  key: 'confirmPassword',
                                  label: 'Şifre Tekrar',
                                  type: 'password',
                                  validator: [
                                      new DnQuestionRequiredValidator(),
                                      new DnQuestionLengthValidator({
                                          maxLength: 50,
                                          minLength: 3
                                      }),
                                      new DnQuestionDifferentValidator({
                                          field: 'mail',
                                          message: 'Şifre kullanıcı maili ile aynı olamaz'
                                      }),
                                      new DnQuestionIdenticalValidator({
                                          field: 'password',
                                          message: 'Şifre uyuşmuyor'
                                      })
                                  ]
                              })
                          })
                      ]
                  })*/
            ]
        }),
        searchForm: new DnQuestionFormBase({
            id: Guid.newGuid(),
            submitButtonEvent: 'onSubmit',
            submitButtonLabel: 'Ara',
            isSetupValidate: false,
            submitContainerStyle: [
                {
                    key: 'backgroundColor',
                    value: 'white'
                },
                {
                    key: 'margin-left',
                    value: '-10px'
                },
                {
                    key: 'margin-right',
                    value: '-10px'
                }
            ],
            questionRows: [
                new DnQuestionRowList({
                    row: [
                        new DnQuestionRowBase({
                            rowSize: 6,
                            question: new DnTextboxQuestion({
                                key: 'mail',
                                label: 'Kullanıcı Mail Adresi'
                            })
                        }),
                        new DnQuestionRowBase({
                            rowSize: 6,
                            question: new DnTextboxQuestion({
                                key: 'name',
                                label: 'Ad'
                            })
                        })
                    ]
                }),
                new DnQuestionRowList({
                    row: [
                        new DnQuestionRowBase({
                            rowSize: 6,
                            question: new DnTextboxQuestion({
                                key: 'surname',
                                label: 'Soyadı'
                            })
                        })
                    ]
                })
            ]
        }),
        datatableOptions: new DnDatatableBase({
            columns: [
                new DnDatatableColumnBase({
                    title: 'Kullanıcı Mail Adresi',
                    serverKey: 'mail',
                    orderable: false
                }),
                new DnDatatableColumnBase({
                    title: 'Ad',
                    serverKey: 'name'
                }),
                new DnDatatableColumnBase({
                    title: 'Soyad',
                    serverKey: 'surname'
                })
            ],
            option: {},
            editButton: true,
            deleteButton: true,
            editRole: dinazorRoles.UserUpdate,
            deleteRole: dinazorRoles.UserDelete
        }),
    };

    private reloadUserFromKullaniciGrup() {
        this.actionChangeUserEmitter.emit();
    }
}
