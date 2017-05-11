import { Component } from '@angular/core';
import { AuthService, LocalUser } from './auth.service';
import { FlashService, FlashType } from './flash.service';
import { Router } from '@angular/router';
import { Group } from './group';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app',
  templateUrl: './app.template.html'
})


export class AppComponent {
  user: LocalUser;
  private loggedIn = false;

  constructor(private authService: AuthService, private router: Router, private flashService: FlashService) {
    this.user = authService.user;

    authService.user$.subscribe(user => {
      if (user.isAuth && !this.loggedIn) {

        this.router.navigate(["groups"]);
        this.flashService.push(FlashType.Info, `Welcome back, ${user.username}`);
      }

      this.loggedIn = user.isAuth;
    });
  }


}
