import { Compiler, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { config } from '../../../dinazor.config';
import { AuthUser } from '../../../model/auth-user';
import { DnNotificationService } from '../../../services/notification.service';
import { DnStorageService } from '../../../services/storage.service';
import { DnAuthService } from '../auth.service';
import { DnLoginConfigService } from './login-config.service';

@Component({
    selector: 'dn-login',
    template: `
        <header id="header" class="animated fadeInDown">
            <div id="logo-group">
                <span id="logo"> 
                    <img class="dn-logo" src="{{_loginConfigService.loginConfig.logo}}" alt="Dinazor"> 
                </span>
            </div>
        </header>
        <div id="main" role="main" class="animated fadeInDown">

            <div id="content" class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-7 col-lg-8 hidden-xs hidden-sm">
                        <h1 class="txt-color-red login-header-big" [innerHTML]="_loginConfigService.loginConfig.title">
                        </h1>

                        <div class="pull-left login-desc-box-l">
                            <h4 class="paragraph-header" [innerHTML]="_loginConfigService.loginConfig.description"></h4>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-5 col-lg-4">
                        <div class="well no-padding">
                            <dn-loading [show]="loading">
                                <form [formGroup]="loginForm" novalidate
                                      (ngSubmit)="login(loginForm.value, loginForm.valid)"
                                      class="smart-form client-form">
                                    <header>
                                        Giriş
                                    </header>
                                    <fieldset>
                                        <section>
                                            <label class="label">Kullanıcı Mail Adresi</label>
                                            <label class="input"> <i class="icon-append fa fa-user"></i>
                                                <input type="text" name="mail" data-smart-validate-input=""
                                                       data-required=""
                                                       data-message-required="Lütfen kullanıcı adını giriniz"
                                                       formControlName="mail">
                                                <b class="tooltip tooltip-top-right"><i
                                                        class="fa fa-user txt-color-teal"></i>
                                                    Lütfen Kullanıcı Mail Adresi giriniz</b></label>
                                        </section>
                                        <section>
                                            <label class="label">Şifre</label>
                                            <label class="input"> <i class="icon-append fa fa-lock"></i>
                                                <input type="password" name="password" data-smart-validate-input=""
                                                       data-required="" data-minlength="3" data-maxnlength="20"
                                                       data-message="Lütfen şifrenizi giriniz"
                                                       formControlName="password">
                                                <b class="tooltip tooltip-top-right"><i
                                                        class="fa fa-lock txt-color-teal"></i>
                                                    Şifrenizi giriniz</b> </label>
                                            <div class="note">
                                                <a routerLink="/auth/forgot-password">Şifremi unuttum?</a>
                                            </div>
                                        </section>
                                    </fieldset>
                                    <footer>
                                        <button type="submit" class="btn btn-primary">
                                            Giriş
                                        </button>
                                    </footer>
                                </form>
                            </dn-loading>

                        </div>
                    </div>
                </div>
            </div>
        </div>`
})
export class DnLoginComponent implements OnInit {
    public loading = false;
    public loginForm: FormGroup;
    public submitted: boolean;
    _loginConfigService: DnLoginConfigService;

    // @Output() loginSuccesEvent: EventEmitter<any> = new EventEmitter();

    constructor(private router: Router,
                private authService: DnAuthService,
                private _fb: FormBuilder,
                private notificationService: DnNotificationService,
                private loginConfigService: DnLoginConfigService,
                private storageService: DnStorageService,
                private _compiler: Compiler) {
        this._loginConfigService = loginConfigService;
    }

    login(data: AuthUser, isValid: boolean) {
        this.loading = true;

        if (!isValid) return;
        this.submitted = true;
        this.authService.login(data.mail, data.password).subscribe(res => {
            if (res.isSuccess) {
                const user: AuthUser = res.data as AuthUser;
                this._compiler.clearCache();
                this.setLocalStorage(res.data);
                if (this._loginConfigService.loginConfig.afterLoginSuccessEvent)
                    this._loginConfigService.loginConfig.afterLoginSuccessEvent(user);

                if (this.router.routerState.snapshot.root.queryParams && this.router.routerState.snapshot.root
                        .queryParams['returnUrl']) {
                    this.router.navigate([this.router.routerState.snapshot.root.queryParams['returnUrl']]);
                } else {
                    this.router.navigate([this._loginConfigService.loginConfig.afterLoginNavigateRoute]);
                }

                // this.loginSuccesEvent.emit(res.data);
                // this.initializeLoginConfigs(res.data);
            } else {
                this.loading = false;
                this.notificationService.showDinazorResultMessage(res);
            }
        });
    }

    ngOnInit() {
        if (config.debugState) {
            this.loginForm = this._fb.group({
                mail: ['gtb@gtb.gov.tr', [Validators.required as any, Validators.minLength(3) as any]],
                password: ['gtb', [Validators.required as any, Validators.minLength(1)as any]]
            });
        } else {
            this.loginForm = this._fb.group({
                mail: ['', [Validators.required as any, Validators.minLength(3) as any]],
                password: ['', [Validators.required as any, Validators.minLength(1)as any]]
            });
        }
    }

    /*  private initializeLoginConfigs(data: any) {
          this.setLocalStorage(data);
          //  this.initCacheableValues(data.token);
      }*/

    private setLocalStorage(data: any) {
        this.storageService.removeItem(config.DINAZOR_USER_KEY);
        this.storageService.setItem(config.DINAZOR_USER_KEY, data);
        /* this.dnHttpService.setUrl('Gtbuser/' + data.id + '/User');
         this.dnHttpService.get('Gtbuser/' + data.id + '/User').subscribe(res => {
             if (res.isSuccess) {
                 this.storageService.setItem(gtbConst.gtbUserKey, res.data);
             }
         });*/
    }

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

}
