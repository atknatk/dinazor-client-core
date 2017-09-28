import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
export declare class DnRegisterComponent implements OnInit {
    private router;
    constructor(router: Router);
    ngOnInit(): void;
    register(event: any): void;
}
