import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `<form role="form" id="login-form">
    <h2>Create an account</h2>
    <p>Create an account to view and access our groups.</p>
    <p>We're a happy, growing community! :)</p>
      <div class="form-group">
        <input type="text" id="username" placeholder="Username" class="form-control">
      </div>
      <div class="form-group">
        <input type="email" id="email" placeholder="Email address" class="form-control">
      </div>
      <div class="form-group">
        <input type="password" id="password"placeholder="Password" class="form-control">
      </div>
      <div class="form-group">
        <input type="password" id="password2" placeholder="Enter your password again" class="form-control">
      </div>
      <div class="text-danger" id="validation-error">

      </div>
          <input type="submit" class="btn btn-success" id='register-button' value='Create account'>
    </form>`
})
export class RegisterComponent {

}