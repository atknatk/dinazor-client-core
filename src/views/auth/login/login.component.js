"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dinazor_config_1 = require("../../../dinazor.config");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, 
        /*  private service: AuthService,
          private authService: DnAuthService,*/
        _fb, 
        /*private notificationService: NotificationService,*/
        /* private cacheHttp: DnHttpCacheService,*/
        dnHttpService, storageService) {
        this.router = router;
        this._fb = _fb;
        this.dnHttpService = dnHttpService;
        this.storageService = storageService;
        this.loading = false;
        this.loginInfo = {};
        this.validationOptions = {
            rules: {
                username: {
                    required: true,
                    minlength: 3,
                },
                password: {
                    required: true
                }
            },
            messages: {
                username: {
                    required: 'Lütfen kullanıcı adını giriniz.',
                    minlength: 'En az 3 karakter olmalıdır.',
                },
                password: {
                    required: 'Lütfen şifreyi giriniz.'
                }
            }
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (dinazor_config_1.config.debugState) {
            this.loginForm = this._fb.group({
                username: ['gtb', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
                password: ['gtb', [forms_1.Validators.required, forms_1.Validators.minLength(1)]]
            });
        }
        else {
            this.loginForm = this._fb.group({
                username: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
                password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(1)]]
            });
        }
    };
    LoginComponent.prototype.login = function (data, isValid) {
        // event.preventDefault();
        this.loading = true;
        if (!isValid)
            return;
        this.submitted = true;
        /*  this.authService.login(data.username, data.password).subscribe(res => {
              if (res.isSuccess) {
                  if (this.router.routerState.snapshot.root.queryParams && this.router.routerState.snapshot.root
                  .queryParams['returnUrl']) {
                      this.router.navigate([this.router.routerState.snapshot.root.queryParams['returnUrl']]);
                  } else {
                      this.router.navigate(['/home']);
                  }
                  this.initializeLoginConfigs(res.data);
              } else {
                  this.loading = false;
                /!*  this.notificationService.smallBox({
                      title: 'Kullanıcı Adı ya da Şifre hatalı.',
                      color: '#C46A69',
                      iconSmall: 'fa fa-times bounce animated',
                      timeout: 1000
                  });*!/
              }
          });*/
    };
    LoginComponent.prototype.initializeLoginConfigs = function (data) {
        this.setLocalStorage(data);
        //  this.initCacheableValues(data.token);
    };
    LoginComponent.prototype.setLocalStorage = function (data) {
        this.storageService.setItem(dinazor_config_1.config.DINAZOR_USER_KEY, data);
        this.dnHttpService.setUrl('Gtbuser/' + data.id + '/User');
        this.dnHttpService.get('Gtbuser/' + data.id + '/User').subscribe(function (res) {
            if (res.isSuccess) {
                // this.storageService.setItem(gtbConst.gtbUserKey, res.data);
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html'
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
