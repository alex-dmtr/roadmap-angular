/*
  https://blog.thoughtram.io/angular/2016/07/18/guards-in-angular-2.html

  https://angular.io/docs/ts/latest/guide/router.html#!#guards
*/


import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import { FlashService, FlashType } from './flash.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashService: FlashService
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated())
      return true;

    this.flashService.push(FlashType.Info, "You need to be authenticated to access this feature");

    this.authService.redirectUrl = state.url;
    this.router.navigate(["login"]);

    return false;
  }
}