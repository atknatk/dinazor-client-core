import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'dn-locked',
    templateUrl: './locked.component.html',
    styleUrls: [
        './locked.component.scss'
    ]
})
export class DnLockedComponent {

    constructor(private router: Router) {
    }

    unlock(event) {
        event.preventDefault();
        this.router.navigate(['/home']);
    }

}
