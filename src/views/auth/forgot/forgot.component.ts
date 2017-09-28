import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'dn-forgot',
    templateUrl: './forgot.component.html',
    styles: []
})
export class DnForgotComponent {

    public loginInfo = {};

    constructor(private router: Router) {
    }

    submit(event) {
        event.preventDefault();
        this.router.navigate(['/auth/login']);
    }
}
