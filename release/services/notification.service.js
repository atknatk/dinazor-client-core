import { Injectable } from '@angular/core';
import '@dinazor/plugins/notification';
import { isNullOrUndefined } from '../utils/check';
var DnNotificationService = /** @class */ (function () {
    function DnNotificationService() {
    }
    DnNotificationService.prototype.bigBox = function (data, cb) {
        $.bigBox(data, cb);
    };
    DnNotificationService.prototype.confirm = function (message, title, cb, no) {
        var _this = this;
        this.smartMessageBox({
            title: title,
            content: message,
            buttons: '[Hayır][Evet]'
        }, function (buttonPressed) {
            if (buttonPressed === 'Hayır') {
                if (isNullOrUndefined(no)) {
                    _this.smallBox({
                        title: 'İptal İşlemi',
                        content: '<i>İsteğiniz üzere iptal edilmiştir.</i>',
                        color: '##296191',
                        iconSmall: 'fa fa-check fa-2x fadeInRight animated',
                        timeout: 4000
                    });
                }
                else {
                    no();
                }
            }
            if (buttonPressed === 'Evet') {
                cb();
            }
        });
    };
    DnNotificationService.prototype.removeConfirm = function (cb, afterSuccesDelete, param1, param2, param3, param4) {
        var _this = this;
        this.smartMessageBox({
            title: 'Silme İşlemi!',
            content: 'Seçtiğiniz veriyi silmek istediğinize emin misiniz',
            buttons: '[Hayır][Evet]'
        }, function (buttonPressed) {
            if (buttonPressed === 'Hayır') {
                _this.smallBox({
                    title: 'İptal İşlemi',
                    content: '<i>İsteğiniz üzere iptal edilmiştir.</i>',
                    color: '##296191',
                    iconSmall: 'fa fa-check fa-2x fadeInRight animated',
                    timeout: 4000
                });
            }
            if (buttonPressed === 'Evet') {
                var result = cb();
                result.subscribe(function (res) {
                    if (res.isSuccess) {
                        _this.showSuccess('Silme işlemi başarılı bir şekilde gerçeklemiştir.');
                        afterSuccesDelete(param1, param2, param3, param4);
                    }
                    else {
                        _this.showDinazorResultMessage(res);
                    }
                }, function (err) {
                    _this.showError('Server tarafında işlem sırasında bir hata oluştu.');
                });
            }
        });
    };
    DnNotificationService.prototype.showDinazorResultMessage = function (res) {
        if (res.isSuccess) {
            this.showSuccess('İşleminiz başarılı bir şekilde gerçekleşmiştir.');
        }
        else if (res.status === -1 || res['Status'] === -1) {
            this.showError('İşleminiz sırasında bilinmeyen bir hata oluşmuştur.');
        }
        else if (res.status === 2 || res['Status'] === 2) {
            this.showWarning('Eksik veri gönderdiğinizden dolayı işleminiz gerçekleştirilmemiştir. ' +
                'Lütfen verilerinizi tekrak kontrol ediniz.');
        }
        else if (res.status === 3 || res['Status'] === 3 ||
            res.status === 7 || res['Status'] === 7 ||
            res.status === 8 || res['Status'] === 8 ||
            res.status === 9 || res['Status'] === 9 ||
            res.status === 12 || res['Status'] === 12 ||
            res.status === 13 || res['Status'] === 12 ||
            res.status === 15 || res['Status'] === 15 ||
            res.status === 16 || res['Status'] === 16) {
            this.showError('İşleminiz sırasında beklenilmeyen bir hata oluşmuştur. Hata Kodu = ' + res.status);
        }
        else if (res.status === 4 || res['Status'] === 4) {
            this.showWarning('Yetkisiz bir işlem yapmak istediniz.');
        }
        else if (res.status === 5 || res['Status'] === 5) {
            this.showWarning('İşlem yapmak istediğiniz kayıt bizde kayıtlı değildir.');
        }
        else if (res.status === 6 || res['Status'] === 6) {
            this.showWarning('Zaten mevcut bir kayıt eklemek istediniz. İşleminiz gerçekleştirilmemiştir.');
        }
        else if (res.status === 10 || res['Status'] === 10) {
            this.showWarning('Giriş işlemi başarızdır. Kullanıcı Adı veya Şifre Hatalı!');
        }
        else if (res.status === 11 || res['Status'] === 11) {
            this.showWarning('Hatalı bir token gönderiyorsunuz. Çıkış yapıp tekrar giriş yapınız.');
        }
        else if (res.status === 14 || res['Status'] === 14) {
            this.showWarning('Session düşmüştür. Çıkış yapıp tekrar giriş yapınız.');
        }
        else if (res.status === 17 || res['Status'] === 17) {
            this.showWarning('Bu işlemi yapmak için gerekli lisansınız bulunmamaktadır.');
        }
        else if (res.status === 18 || res['Status'] === 18) {
            this.showWarning('Zaten silimiş bir veriyi silmeye çalışıyorsunuz. Sildiğiniz veriyi halen ' +
                'görmekteyseniz. Sistem yöneticisine iletiniz.');
        }
        else if (res.status === 20 || res['Status'] === 20) {
            this.showWarning(res.message);
        }
        if (!res.isSuccess) {
            console.log(res);
        }
    };
    DnNotificationService.prototype.showError = function (message, title, cb) {
        $.smallBox({
            title: title || 'Hata!',
            content: message,
            color: '#C46A69',
            icon: 'fa fa-bell swing animated',
            timeout: 5000
        }, cb);
    };
    DnNotificationService.prototype.showSuccess = function (message, title, cb) {
        $.smallBox({
            title: title || 'Başarılı!',
            content: message,
            color: '#739E73',
            icon: 'fa fa-bell swing animated',
            timeout: 5000
        }, cb);
    };
    DnNotificationService.prototype.showWarning = function (message, title, cb) {
        $.smallBox({
            title: title || 'Uyarı!',
            content: message,
            color: '#296191',
            icon: 'fa fa-bell swing animated',
            timeout: 5000
        }, cb);
    };
    DnNotificationService.prototype.smallBox = function (data, cb) {
        $.smallBox(data, cb);
    };
    DnNotificationService.prototype.smartMessageBox = function (data, cb) {
        $.SmartMessageBox(data, cb);
    };
    // UnknownError = -1,
    // Success = 0,
    // ForeignKeyConstraint = 1,
    // MissingRequiredParamater = 2,
    // InValidParamater = 3,
    // Unauthorized = 4,
    // NoSuchObject = 5,
    // AlreadyAdded = 6,
    // IndexOutOfBound = 7,
    // NoPrimaryKey = 8,
    // UnsupportedOperation = 9,
    // LoginFailed = 10,
    // SessionNotValid = 11,
    // PropertyNotFound = 12,
    // UnQualifiedPrivilege = 13,
    // SessionTimeout = 14,
    // InMemoryDatabaseError = 15,
    // SerializationError = 16,
    // NoLicence =17
    // AlreadyDeleted =18
    DnNotificationService.prototype.subscribeMessage = function (res) {
        this.showDinazorResultMessage(res);
    };
    DnNotificationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DnNotificationService.ctorParameters = function () { return []; };
    return DnNotificationService;
}());
export { DnNotificationService };
//# sourceMappingURL=notification.service.js.map