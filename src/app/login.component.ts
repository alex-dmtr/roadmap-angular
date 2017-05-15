import { Component } from '@angular/core';
import { Router } from '@angular/router';

// import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { AuthService } from './auth.service';
import { FlashService, FlashType } from './flash.service';

declare var $: JQueryStatic;

@Component({
  selector: 'app-login',
  templateUrl: './login.template.html',
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