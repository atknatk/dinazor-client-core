import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  template: `
    <div id="extr-page">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AuthLayoutComponent {
}
