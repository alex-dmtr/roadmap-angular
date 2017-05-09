import { Component } from '@angular/core';

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
    <input type="submit" class="btn btn-success" id='login-button' value='Sign in'>
  </form>`
})
export class LoginComponent {

}