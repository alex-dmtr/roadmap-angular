import { Component } from '@angular/core';
import { Router } from '@angular/router';

// import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { AuthService } from './auth.service';
import { FlashService, FlashType } from './flash.service';

declare var $: JQueryStatic;

@Component({
  selector: 'app-login',
  template: ` <form role="form" id="login-form">
      <h2>Sign in</h2>
  <p>Sign in to view and access our groups! :)</p>
  <a href=# id='register-button'>Don't have an account yet?</a>
    <div class="form-group">
      <input type="text" id="username" placeholder="Username" class="form-control" required>
    </div>
    <div class="form-group">
      <input type="password" id="password"placeholder="Password" class="form-control" required>
    </div>
    <div class="text-danger" id="validation-error">

    </div>
    <input type="submit" class="btn btn-success" id='login-button' value='Sign in' (click)="doLogin($event)">
  </form>`,
})
export class LoginComponent {
  // constructor(private formBuilder: FormBuilder) {

  // }

  constructor(private authService: AuthService,
    private flashService: FlashService,
    private router: Router) {

  }
  // public loginForm = this.formBuilder.group({
  //   username: ["", Validators.required],
  //   password: ["", Validators.required]
  // });

  doLogin(event: any) {
    event.preventDefault();

    let user = {
      username: $("#username").val(),
      password: $("#password").val()
    };

    this.authService.doLogin(user.username, user.password)
      .then(user => {
        let redirect = this.authService.redirectUrl || 'groups';

        this.flashService.push(FlashType.Info, `Welcome back, ${user.username}`);
        this.router.navigate([redirect]);
      })
      .catch(err => {
        this.flashService.push(FlashType.Error, "Username and password combination not recognised");
      })


    // console.log(this.loginForm.value);
  }
}