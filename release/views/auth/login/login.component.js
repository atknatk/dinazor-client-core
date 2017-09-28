import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { config } from '../../../dinazor.config';
import { DnNotificationService } from '../../../services/notification.service';
import { DnStorageService } from '../../../services/storage.service';
import { DnAuthService } from '../auth.service';
import { DnLoginConfigService } from './login-config.service';
var DnLoginComponent = /** @class */ (function () {
    // @Output() loginSuccesEvent: EventEmitter<any> = new EventEmitter();
    function DnLoginComponent(router, authService, _fb, notificationService, loginConfigService, storageService) {
        this.router = router;
        this.authService = authService;
        this._fb = _fb;
        this.notificationService = notificationService;
        this.loginConfigService = loginConfigService;
        this.storageService = storageService;
        this.loading = false;
        this._loginConfigService = loginConfigService;
    }
    DnLoginComponent.prototype.login = function (data, isValid) {
        var _this = this;
        event.preventDefault();
        this.loading = true;
        if (!isValid)
            return;
        this.submitted = true;
        this.authService.login(data.username, data.password).subscribe(function (res) {
            if (res.isSuccess) {
                var user = res.data;
                _this.setLocalStorage(res.data);
                if (_this._loginConfigService.loginConfig.afterLoginSuccessEvent)
                    _this._loginConfigService.loginConfig.afterLoginSuccessEvent(user);
                if (_this.router.routerState.snapshot.root.queryParams && _this.router.routerState.snapshot.root
                    .queryParams['returnUrl']) {
                    _this.router.navigate([_this.router.routerState.snapshot.root.queryParams['returnUrl']]);
                }
                else {
                    _this.router.navigate([_this._loginConfigService.loginConfig.afterLoginNavigateRoute]);
                }
                // this.loginSuccesEvent.emit(res.data);
                // this.initializeLoginConfigs(res.data);
            }
            else {
                _this.loading = false;
                _this.notificationService.smallBox({
                    title: 'Kullanıcı Adı ya da Şifre hatalı.',
                    color: '#C46A69',
                    iconSmall: 'fa fa-times bounce animated',
                    timeout: 1000
                });
            }
        });
    };
    DnLoginComponent.prototype.ngOnInit = function () {
        if (config.debugState) {
            this.loginForm = this._fb.group({
                username: ['gtb', [Validators.required, Validators.minLength(3)]],
                password: ['gtb', [Validators.required, Validators.minLength(1)]]
            });
        }
        else {
            this.loginForm = this._fb.group({
                username: ['', [Validators.required, Validators.minLength(3)]],
                password: ['', [Validators.required, Validators.minLength(1)]]
            });
        }
    };
    /*  private initializeLoginConfigs(data: any) {
          this.setLocalStorage(data);
          //  this.initCacheableValues(data.token);
      }*/
    DnLoginComponent.prototype.setLocalStorage = function (data) {
        this.storageService.setItem(config.DINAZOR_USER_KEY, data);
        /* this.dnHttpService.setUrl('Gtbuser/' + data.id + '/User');
         this.dnHttpService.get('Gtbuser/' + data.id + '/User').subscribe(res => {
             if (res.isSuccess) {
                 this.storageService.setItem(gtbConst.gtbUserKey, res.data);
             }
         });*/
    };
    /*  private initCacheableValues(token: string) {
          this.cacheHttp.removeAll();
          this.cacheHttp.addCacheUrl('limanKod')
              .addCacheUrl('havalimani/havalimani')
              .addCacheUrl('firma')
              .addCacheUrl('gumrukidaresi')
              .addCacheUrl('ulke')
              .addCacheUrl('rejimkod')
              .addCacheUrl('beyanturu')
              .addCacheUrl('doviz')
              .addCacheUrl('tasimasekli')
              .addCacheUrl('odemesekli')
              .addCacheUrl('tasimaaraci')
              .addCacheUrl('antrepokod')
              .addCacheUrl('alicisaticiiliskisi')
              .addCacheUrl('konteynertip')
              .addCacheUrl('basitlestirilmisusulkod')
              .addCacheUrl('teslimsekli')
              .addCacheUrl('islemniteligi')
              .addCacheUrl('bankakod')
              .addCacheUrl('dil')
              .addCacheUrl('nctsulkekod')
              .loadAllUrls(token);
      }*/
    DnLoginComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-login',
                    template: "\n        <header id=\"header\" class=\"animated fadeInDown\">\n            <div id=\"logo-group\">\n                <span id=\"logo\"> <img src=\"{{_loginConfigService.loginConfig.logo}}\" alt=\"Dinazor\"> </span>\n            </div>\n        </header>\n        <div id=\"main\" role=\"main\" class=\"animated fadeInDown\">\n\n            <div id=\"content\" class=\"container\">\n                <div class=\"row\">\n                    <div class=\"col-xs-12 col-sm-12 col-md-7 col-lg-8 hidden-xs hidden-sm\">\n                        <h1 class=\"txt-color-red login-header-big\">{{_loginConfigService.loginConfig.title}}</h1>\n\n                        <div class=\"pull-left login-desc-box-l\">\n                            <h4 class=\"paragraph-header\">{{_loginConfigService.loginConfig.description}}</h4>\n                        </div>\n                    </div>\n                    <div class=\"col-xs-12 col-sm-12 col-md-5 col-lg-4\">\n                        <div class=\"well no-padding\">\n                            <dn-loading [show]=\"loading\">\n                                <form [formGroup]=\"loginForm\" novalidate\n                                      (ngSubmit)=\"login(loginForm.value, loginForm.valid)\"\n                                      class=\"smart-form client-form\">\n                                    <header>\n                                        Giri\u015F\n                                    </header>\n                                    <fieldset>\n                                        <section>\n                                            <label class=\"label\">Kullan\u0131c\u0131 Ad\u0131</label>\n                                            <label class=\"input\"> <i class=\"icon-append fa fa-user\"></i>\n                                                <input type=\"text\" name=\"username\" data-smart-validate-input=\"\"\n                                                       data-required=\"\"\n                                                       data-message-required=\"L\u00FCtfen kullan\u0131c\u0131 ad\u0131n\u0131 giriniz\"\n                                                       formControlName=\"username\">\n                                                <b class=\"tooltip tooltip-top-right\"><i\n                                                        class=\"fa fa-user txt-color-teal\"></i>\n                                                    L\u00FCtfen kullan\u0131c\u0131 ad\u0131n\u0131 giriniz</b></label>\n                                        </section>\n                                        <section>\n                                            <label class=\"label\">\u015Eifre</label>\n                                            <label class=\"input\"> <i class=\"icon-append fa fa-lock\"></i>\n                                                <input type=\"password\" name=\"password\" data-smart-validate-input=\"\"\n                                                       data-required=\"\" data-minlength=\"3\" data-maxnlength=\"20\"\n                                                       data-message=\"L\u00FCtfen \u015Fifrenizi giriniz\"\n                                                       formControlName=\"password\">\n                                                <b class=\"tooltip tooltip-top-right\"><i\n                                                        class=\"fa fa-lock txt-color-teal\"></i>\n                                                    \u015Eifrenizi giriniz</b> </label>\n                                            <div class=\"note\">\n                                                <a routerLink=\"/auth/forgot-password\">\u015Eifremi unuttum?</a>\n                                            </div>\n                                        </section>\n                                    </fieldset>\n                                    <footer>\n                                        <button type=\"submit\" class=\"btn btn-primary\">\n                                            Giri\u015F\n                                        </button>\n                                    </footer>\n                                </form>\n                            </dn-loading>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>"
                },] },
    ];
    /** @nocollapse */
    DnLoginComponent.ctorParameters = function () { return [
        { type: Router, },
        { type: DnAuthService, },
        { type: FormBuilder, },
        { type: DnNotificationService, },
        { type: DnLoginConfigService, },
        { type: DnStorageService, },
    ]; };
    return DnLoginComponent;
}());
export { DnLoginComponent };
//# sourceMappingURL=login.component.js.map