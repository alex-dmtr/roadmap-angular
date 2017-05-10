import { Component } from '@angular/core';
import { AuthService, LocalUser } from './auth.service';

import { Group } from './group';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app',
  templateUrl: './app.template.html'
})
export class AppComponent {
  user: LocalUser;

  constructor(private authService: AuthService) {
    this.user = authService.user;

    authService.user$.subscribe(user => {
      console.log(user);
    });
  }


}
