import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-home',
  template: `  <h2>Home</h2>
  <p>Welcome to our groups website! You can meet awesome people here.</p>
  <p>Joining is easy. Just click <a routerLink='/register'>here</a> to go to to the sign up page.</p>`
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    if (this.authService.isAuthenticated())
      this.router.navigate(["groups"]);
  }
}