var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DnLoadingBase } from '../../../components/loading/dn-loading.base';
import { DnQuestionFormBase } from '../../../components/dynamic-form/dn-question/dn-question-form-base';
import { Guid } from '../../../utils/guid';
import { DnQuestionRowList } from '../../../components/dynamic-form/dn-question/dn-question-row-list';
import { DnQuestionRowBase } from '../../../components/dynamic-form/dn-question/dn-question-row-base';
import { DnTextboxQuestion } from '../../../components/dynamic-form/dn-question/dn-question-textbox';
import { DnQuestionRequiredValidator } from '../../../components/dynamic-form/dn-question-validator/dn-question-required-validator';
import { DnQuestionLengthValidator } from '../../../components/dynamic-form/dn-question-validator/dn-question-lenght-validator';
import { DnQuestionDifferentValidator } from '../../../components/dynamic-form/dn-question-validator/dn-question-different-validator';
import { DnQuestionIdenticalValidator } from '../../../components/dynamic-form/dn-question-validator/dn-question-identical-validator';
import { DnDatatableBase } from '../../../components/datatable/dn-datatable.base';
import { DnDatatableColumnBase } from '../../../components/datatable/dn-datatable-column.base';
import { dinazorRoles } from '../../../dinazor-role-enum';
var DnUserListComponent = /** @class */ (function (_super) {
    __extends(DnUserListComponent, _super);
    function DnUserListComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.actionChangeUserEmitter = new EventEmitter();
        _this.sampleCrudData = {
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
                                    key: 'username',
                                    label: 'Kullanıcı Adı',
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
                                    key: 'mail',
                                    label: 'Mail',
                                    type: 'mail',
                                    validator: [
                                        new DnQuestionRequiredValidator(),
                                        new DnQuestionLengthValidator({
                                            maxLength: 100,
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
                                            minLength: 3
                                        }),
                                        new DnQuestionDifferentValidator({
                                            field: 'username',
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
                    new DnQuestionRowList({
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
                                            field: 'username',
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
                    })
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
                                    key: 'username',
                                    label: 'Kullanıcı Adı'
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
                            }),
                            new DnQuestionRowBase({
                                rowSize: 6,
                                question: new DnTextboxQuestion({
                                    key: 'mail',
                                    label: 'Email',
                                    type: 'email'
                                })
                            })
                        ]
                    })
                ]
            }),
            datatableOptions: new DnDatatableBase({
                columns: [
                    new DnDatatableColumnBase({
                        title: 'Kullanıcı Adı',
                        serverKey: 'username',
                        orderable: false
                    }),
                    new DnDatatableColumnBase({
                        title: 'Ad',
                        serverKey: 'name'
                    }),
                    new DnDatatableColumnBase({
                        title: 'Soyad',
                        serverKey: 'surname'
                    }),
                    new DnDatatableColumnBase({
                        title: 'Mail',
                        serverKey: 'mail'
                    })
                ],
                option: {},
                editButton: true,
                deleteButton: true,
                editRole: dinazorRoles.UserUpdate,
                deleteRole: dinazorRoles.UserDelete
            }),
        };
        return _this;
    }
    DnUserListComponent.prototype.reloadUserFromKullaniciGrup = function () {
        this.actionChangeUserEmitter.emit();
    };
    DnUserListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-user-list',
                    templateUrl: './user-list.component.html',
                },] },
    ];
    /** @nocollapse */
    DnUserListComponent.ctorParameters = function () { return []; };
    DnUserListComponent.propDecorators = {
        'actionChangeUserEmitter': [{ type: Output, args: ['actionChangeUser',] },],
        'sampleCrudData': [{ type: Input },],
    };
    return DnUserListComponent;
}(DnLoadingBase));
export { DnUserListComponent };
//# sourceMappingURL=user-list.component.js.map