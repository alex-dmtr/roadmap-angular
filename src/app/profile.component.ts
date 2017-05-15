import { Component, OnInit } from '@angular/core';
import { AuthService, LocalUser } from './auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.template.html'
})
export class ProfileComponent implements OnInit {

  public user: LocalUser = new LocalUser();

  constructor(
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.user = this.authService.user;
  }

}