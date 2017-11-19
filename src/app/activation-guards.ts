import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService
  ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUrl = state.url;
    console.log(currentUrl);
    if (this.authService.isUserAuthenticated()) {
      switch (currentUrl) {
        case '/SignIn/email':
        case '/SignIn/password':
          this.router.navigate(['Search']);
          return true;
        default:
          return true;
      }
    } else {
      this.router.navigate(['SignIn']);
      return false;
    }
  }
}

@Injectable()
export class RegistrationGuard implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService) {}

  public canActivate() {
    if (this.authService.isCurrentUserRegistered()) {
      return true;
    } else {
      this.router.navigate(['SignIn/email']);
      return false;
    }
  }
}

