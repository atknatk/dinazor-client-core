import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUser } from '../../../model/auth-user';
import { DnNotificationService } from '../../../services/notification.service';
import { DnStorageService } from '../../../services/storage.service';
import { DnAuthService } from '../auth.service';
import { DnLoginConfigService } from './login-config.service';
export declare class DnLoginComponent implements OnInit {
    private router;
    private authService;
    private _fb;
    private notificationService;
    private loginConfigService;
    private storageService;
    loading: boolean;
    loginForm: FormGroup;
    submitted: boolean;
    _loginConfigService: DnLoginConfigService;
    constructor(router: Router, authService: DnAuthService, _fb: FormBuilder, notificationService: DnNotificationService, loginConfigService: DnLoginConfigService, storageService: DnStorageService);
    login(data: AuthUser, isValid: boolean): void;
    ngOnInit(): void;
    private setLocalStorage(data);
}
