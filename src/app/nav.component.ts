import { Component } from '@angular/core';
import { AuthService, LocalUser } from './auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.template.html'
})
export class NavComponent {
  user: LocalUser;
  constructor(private authService: AuthService) {
    this.user = authService.user;
  }
}
