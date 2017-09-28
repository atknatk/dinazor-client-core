import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dn-register',
  templateUrl: './register.component.html',
  styles: []
})
export class DnRegisterComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  register(event) {
    event.preventDefault();
    this.router.navigate(['/home']);
  }

}
