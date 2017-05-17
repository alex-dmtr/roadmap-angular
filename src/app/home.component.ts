import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.template.html'
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