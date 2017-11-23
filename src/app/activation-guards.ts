import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService
  ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserAuthenticated()) {
      return true;
    } else {
      console.log('redirect');
      this.router.navigate(['SignIn/email']);
      return false;
    }
  }
}

@Injectable()
export class SignInPasswordRouteGuard implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService) {}

  public canActivate() {
    if (this.authService.isCurrentUserRegistered() && !this.authService.isUserAuthenticated()) {
      return true;
    } else if (this.authService.isUserAuthenticated()){
      this.router.navigate(['']);
      return false;
    } else {
      this.router.navigate(['SignIn/email']);
      return false;
    }
  }
}

@Injectable()
export class SignInEmailRouteGuard implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService
  ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserAuthenticated()) {
      this.router.navigate(['']);
      return false;
    } else {
      return true;
    }
  }
}

