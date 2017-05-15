import { Component } from '@angular/core';
import { FlashService, FlashType } from './flash.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

declare var $: JQueryStatic;

@Component({
  selector: 'app-login',
  templateUrl: './register.template.html'
})
export class RegisterComponent {
  constructor(
    private flashService: FlashService,
    private authService: AuthService,
    private router: Router) {

  }
  doRegister($event: any) {
    $event.preventDefault();

    let body = {
      username: $("#username").val(),
      email: $("#email").val(),
      password: $("#password").val()
    }

    let password2 = $("#password2").val();

    if (body.password != password2)
      return this.flashService.push(FlashType.Error, "Passwords do not match");

    this.authService.doRegister(body.username, body.email, body.password)
      .then(() => {
        this.flashService.push(FlashType.Info, "Register succesful");
        return this.authService.doLogin(body.username, body.password);
      })
      .then(() => {
        this.router.navigate(["profile"]);
      })
      .catch(err => {
        this.flashService.push(FlashType.Error, "There was an error registering your account");
      })
  }
}