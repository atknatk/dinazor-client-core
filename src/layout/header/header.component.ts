import { Component, OnInit } from '@angular/core';

declare let $: any;

@Component({
    selector: 'dn-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

    searchMobileActive = false;

    constructor() {
    }

    ngOnInit() {
    }

    onSubmit() {
        // this.router.navigate(['/miscellaneous/search']);

    }

    toggleSearchMobile() {
        this.searchMobileActive = !this.searchMobileActive;

        $('body').toggleClass('search-mobile', this.searchMobileActive);
    }
}
